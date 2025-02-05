// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {
  console.log("Script is running");

  // Access Memberstack instance via window.$memberstackDom
  const memberstack = window.$memberstackDom;

  // Get the last 5 digits of the logged-in Memberstack user ID
  function getLastFiveDigits(memberId) {
    return memberId.slice(-5);
  }

  // Function to show/hide cards based on channelXid values
  function updateCards(member) {
    const customFields = member.customFields;
    let firstEmptyIndex = null;

    for (let i = 1; i <= 20; i++) { // Updated loop to 20
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

  // Function to handle link click for linking YouTube channel
  function handleSubmitLinkClick(channelIndex, member) {
    console.log(`Submit button clicked for channel ${channelIndex}`);

    const inputElement = document.getElementById(`input${channelIndex}`);
    const channelId = inputElement.value.trim();

    console.log(`Channel ID entered: ${channelId}`);

    if (channelId) {
      console.log(`Validating YouTube channel: ${channelId}`);
      validateYouTubeChannel(channelId, member.id, function(channelName) {
        // After the YouTube validation passes, check if the channel ID is unique
        console.log("Channel validated with YouTube API. Now checking uniqueness...");
        fetch("https://athi9jm2t5.execute-api.us-east-1.amazonaws.com/default/repeat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          // The endpoint expects a JSON body in this format:
          // { "body": "{\"channelId\": \"YOUR_CHANNEL_ID\"}" }
          body: JSON.stringify({ body: JSON.stringify({ channelId: channelId }) })
        })
        .then(response => response.json())
        .then(data => {
          console.log("Uniqueness check response:", data);
          let uniqueResponse;
          try {
            uniqueResponse = JSON.parse(data.body);
          } catch (e) {
            console.error("Failed to parse response body:", e);
            alert("Error processing channel uniqueness response.");
            return;
          }
          // Explicitly check for the unique flag.
          // Make sure that only if uniqueResponse.isUnique is true (or "true") do we continue.
          if (uniqueResponse.isUnique === true || uniqueResponse.isUnique === "true") {
            console.log("Channel ID is unique. Proceeding with linking.");
            const channelNameField = `channel${channelIndex}`;
            const channelIdField = `channel${channelIndex}id`;

            memberstack.updateMember({
              customFields: {
                [channelIdField]: channelId,
                [channelNameField]: channelName // Save the correct channel name
              }
            })
            .then(() => {
              alert("YouTube channel successfully linked!");
              location.reload(); // Refresh the page to update the cards
            })
            .catch(error => {
              console.error("Failed to update Memberstack fields:", error.message);
              alert("Failed to update Memberstack fields: " + error.message);
            });
          } else {
            // If the endpoint returns false (or "false"), do not continue.
            console.warn("Channel ID is not unique. Aborting the linking process.");
            alert("Channel ID is already linked to an account. If you think this is a mistake please contact an Admin");
            return;
          }
        })
        .catch(error => {
          console.error("Error checking channel uniqueness:", error);
          alert("Error checking channel uniqueness. Please try again later.");
        });
      }, function(errorMessage) {
        console.error("Channel validation failed:", errorMessage);
        alert(errorMessage);
      });
    } else {
      alert("Please enter a valid YouTube channel ID.");
    }
  }

  // Function to validate YouTube Channel using YouTube Data API
  function validateYouTubeChannel(channelId, memberId, successCallback, errorCallback) {
    const lastFive = memberId.slice(-5);
    const apiKey = 'AIzaSyAsxW-IKPfaolgoSBnH8l4ttqkKRHf2w7o'; // Your YouTube API Key
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;

    console.log(`Fetching YouTube Channel data for validation: ${url}`);

    // Perform a fetch request to get the channel's description and name via YouTube Data API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          const channelInfo = data.items[0].snippet;
          const channelName = channelInfo.title; // Fetch the correct channel name
          const description = channelInfo.description;

          console.log("Channel name:", channelName);
          console.log("Channel description:", description);

          // Check if the description contains the last 5 digits of the Memberstack ID
          if (description.includes(lastFive)) {
            console.log(`Validation successful! Found last 5 digits: ${lastFive}`);
            successCallback(channelName); // Pass the channel name to the success callback
          } else {
            console.error("Validation failed: last 5 digits not found in channel description.");
            errorCallback("Validation failed: The channel's description does not contain your ID.");
          }
        } else {
          errorCallback("Invalid channel ID.");
        }
      })
      .catch(error => {
        console.error("Error fetching YouTube channel data:", error);
        errorCallback("Error fetching the YouTube channel: " + error.message);
      });
  }

  // Function to set up link click listeners
  function setupSubmitLinks(member) {
    for (let i = 1; i <= 20; i++) { // Updated loop to 20
      const submitElement = document.getElementById(`submit${i}`);
      if (submitElement) {
        console.log(`Setting up click listener for submit button ${i}`);
        submitElement.addEventListener("click", function(event) {
          event.preventDefault();
          handleSubmitLinkClick(i, member);
        });
      } else {
        console.error(`Submit button not found for card${i} during setup`);
      }
    }
  }

  // Check if Memberstack is available
  if (memberstack) {
    console.log("Memberstack is available");
    memberstack.getCurrentMember().then(({ data: member }) => {
      if (member) {
        console.log("Memberstack user data:", member);
        const memberId = member.id;

        // Set the text element to show the last 5 digits of the Memberstack ID
        const lastFiveElement = document.getElementById("lastFive");
        if (lastFiveElement) lastFiveElement.textContent = getLastFiveDigits(memberId);

        // Update the visibility of cards based on custom fields
        updateCards(member);

        // Set up link click listeners
        setupSubmitLinks(member);
      } else {
        console.error("No member is logged in.");
      }
    }).catch(error => {
      console.error("Error getting current member:", error);
    });
  } else {
    console.error("Memberstack is not available.");
  }
});
