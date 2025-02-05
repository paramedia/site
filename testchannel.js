// Wait for the document to load
document.addEventListener("DOMContentLoaded", async function () {
  console.log("Script is running");

  // Access Memberstack instance via window.$memberstackDom
  const memberstack = window.$memberstackDom;

  // Helper: Return the last 5 digits of a Memberstack user ID.
  function getLastFiveDigits(memberId) {
    return memberId.slice(-5);
  }

  // Update card displays based on custom fields.
  function updateCards(member) {
    const customFields = member.customFields;
    let firstEmptyIndex = null;

    for (let i = 1; i <= 20; i++) {
      const channelIdField = `channel${i}id`;
      const channelNameField = `channel${i}`;
      const channelIdValue = customFields[channelIdField];
      const textElement = document.getElementById(`text${i}`);
      const cardElement = document.getElementById(`card${i}`);
      const inputElement = document.getElementById(`input${i}`);
      const submitElement = document.getElementById(`submit${i}`);
      const toolElement = document.getElementById(`tool${i}`);

      if (channelIdValue && channelIdValue.trim() !== "") {
        const channelNameValue = customFields[channelNameField];
        if (textElement) textElement.textContent = channelNameValue;
        if (inputElement) inputElement.style.display = "none";
        if (submitElement) submitElement.style.display = "none";
        if (toolElement) toolElement.style.display = "none";
        if (textElement) textElement.style.display = "block";
      } else {
        if (firstEmptyIndex === null) {
          firstEmptyIndex = i;
          if (inputElement) inputElement.style.display = "block";
          if (submitElement) submitElement.style.display = "block";
          if (toolElement) toolElement.style.display = "block";
          if (textElement) textElement.style.display = "none";
          if (cardElement) cardElement.style.display = "block";
          console.log(`First empty card found: card${i}`);
        } else {
          if (cardElement) cardElement.style.display = "none";
          if (inputElement) inputElement.style.display = "none";
          if (submitElement) submitElement.style.display = "none";
          if (toolElement) toolElement.style.display = "none";
          if (textElement) textElement.style.display = "none";
        }
      }
    }
  }

  // Step 1: Validate the YouTube channel using the YouTube Data API.
  async function validateYouTubeChannelAsync(channelId, memberId) {
    const lastFive = memberId.slice(-5);
    const apiKey = 'AIzaSyAsxW-IKPfaolgoSBnH8l4ttqkKRHf2w7o'; // Your API Key
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;

    console.log(`Fetching YouTube Channel data for validation: ${url}`);
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channelInfo = data.items[0].snippet;
      const channelName = channelInfo.title;
      const description = channelInfo.description;
      console.log("Channel name:", channelName);
      console.log("Channel description:", description);

      if (description.includes(lastFive)) {
        console.log(`Validation successful! Found last 5 digits: ${lastFive}`);
        return channelName;
      } else {
        throw new Error("Validation failed: The channel's description does not contain your ID.");
      }
    } else {
      throw new Error("Invalid channel ID.");
    }
  }

  // Step 2: Check uniqueness by calling the Lambda endpoint.
  async function checkUniqueness(channelId) {
    const endpoint = "https://athi9jm2t5.execute-api.us-east-1.amazonaws.com/default/repeat";
    const payload = JSON.stringify({ body: JSON.stringify({ channelId: channelId }) });
    
    console.log("Calling uniqueness endpoint with payload:", payload);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    
    const lambdaResponse = await response.json();
    console.log("Raw Lambda response:", lambdaResponse);

    // Parse the nested JSON in the 'body' property.
    let parsed;
    try {
      parsed = JSON.parse(lambdaResponse.body);
      console.log("Parsed uniqueness response:", parsed);
    } catch (e) {
      throw new Error("Channel ID is already linked to an account. If you think this is a mistake please contact an Admin.");
    }
    return parsed;
  }

  // Step 3: Handle the full flow for linking a YouTube channel.
  async function handleSubmitLinkClick(channelIndex, member) {
    const inputElement = document.getElementById(`input${channelIndex}`);
    const channelId = inputElement.value.trim();

    console.log(`Channel ID entered: ${channelId}`);

    if (!channelId) {
      alert("Please enter a valid YouTube channel ID.");
      return;
    }

    try {
      // Validate the channel.
      const channelName = await validateYouTubeChannelAsync(channelId, member.id);
      console.log("Channel validated. Channel name:", channelName);

      // Check uniqueness.
      const uniqueness = await checkUniqueness(channelId);
      if (!(uniqueness.isUnique === true || uniqueness.isUnique === "true")) {
        console.warn("Uniqueness check failed. Channel is not unique:", uniqueness);
        alert("Channel ID is already linked to an account. If you think this is a mistake please contact an Admin");
        return;
      }

      // Update Memberstack if all checks pass.
      console.log("Channel is unique. Proceeding with linking.");
      const channelNameField = `channel${channelIndex}`;
      const channelIdField = `channel${channelIndex}id`;

      await memberstack.updateMember({
        customFields: {
          [channelIdField]: channelId,
          [channelNameField]: channelName,
        },
      });

      alert("YouTube channel successfully linked!");
      location.reload();
    } catch (error) {
      console.error("Error during channel linking:", error);
      alert(error.message);
    }
  }

  // Set up click listeners for each submit button.
  function setupSubmitLinks(member) {
    for (let i = 1; i <= 20; i++) {
      const submitElement = document.getElementById(`submit${i}`);
      if (submitElement) {
        console.log(`Setting up click listener for submit button ${i}`);
        submitElement.addEventListener("click", function (event) {
          event.preventDefault();
          handleSubmitLinkClick(i, member);
        });
      } else {
        console.error(`Submit button not found for card${i}`);
      }
    }
  }

  // Initialize: get the current member, update the UI, and set up listeners.
  if (memberstack) {
    try {
      const { data: member } = await memberstack.getCurrentMember();
      if (member) {
        console.log("Memberstack user data:", member);
        const memberId = member.id;
        const lastFiveElement = document.getElementById("lastFive");
        if (lastFiveElement) lastFiveElement.textContent = getLastFiveDigits(memberId);
        updateCards(member);
        setupSubmitLinks(member);
      } else {
        console.error("No member is logged in.");
      }
    } catch (error) {
      console.error("Error getting current member:", error);
    }
  } else {
    console.error("Memberstack is not available.");
  }
});
