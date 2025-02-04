<script>
document.addEventListener("DOMContentLoaded", function() {
  // Add a 3-second delay to give time for other scripts to load
  setTimeout(async function() {
    async function initializeSplitSystem() {
      try {
        console.log("Attempting to check if Memberstack is loaded...");

        // Check if Memberstack DOM is available
        if (typeof window.$memberstackDom === "undefined") {
          throw new Error("Memberstack is not yet available.");
        }

        console.log("Attempting to get Memberstack current member...");

        // Get current logged-in Memberstack member
        const member = await window.$memberstackDom.getCurrentMember();
        console.log("Memberstack member data obtained:", member);

        if (member && member.data) {
          // Access customFields from member data
          const customFields = member.data.customFields;

          if (customFields) {
            // Fetch 'split' value from custom fields and parse it as a number
            const splitValue = parseFloat(customFields.split) || 500;

            // Get the input, submit button, and link elements
            const splitInput = document.getElementById("splittype");
            const splitSubmit = document.getElementById("splitsubmit");
            const linkrefer = document.getElementById("linkrefer");

            // Verify that all elements exist
            if (!splitInput) {
              console.error("Split input element not found.");
              return;
            }
            if (!splitSubmit) {
              console.error("Split submit button element not found.");
              return;
            }
            if (!linkrefer) {
              console.error("Link refer element not found.");
              return;
            }

            console.log("All elements found, initializing split input system...");

            // Function to validate and update the link based on user input
            const validateAndUpdateLink = () => {
              const userSplit = parseFloat(splitInput.value);

              // Check if the input is within the allowed range (50 to splitValue)
              if (isNaN(userSplit)) {
                alert("Please enter a valid number.");
                return;
              }

              if (userSplit < 50 || userSplit > splitValue) {
                alert(`Please enter a value between 50 and ${splitValue}.`);
                return;
              }

              // Round the value to the nearest integer
              const roundedSplit = Math.round(userSplit);

              // Update the referral link with the rounded split value
              linkrefer.innerHTML = `https://www.paramediaglobal.com/signup?r=${member.data.id}&s=${roundedSplit}`;
              console.log(`Link updated to: ${linkrefer.innerHTML}`);
            };

            // Attach event listener to the submit button
            splitSubmit.addEventListener("click", function() {
              validateAndUpdateLink();
            });
          } else {
            console.error("Custom fields are unavailable in member data.");
          }
        } else {
          console.error("Member data is unavailable.");
        }
      } catch (error) {
        console.error("Failed to initialize Memberstack split system: ", error);
      }
    }

    // Initialize the split system
    initializeSplitSystem();
  }, 3000); // 3-second delay before initializing
});
</script>

document.addEventListener("DOMContentLoaded", function() {
  // Add a delay to ensure that all elements and other scripts are loaded properly
  setTimeout(function() {
    // Copy linkrefer value to clipboard
    const copyButton = document.getElementById("copylinkrefer");
    if (copyButton) {
      const linkrefer = document.getElementById("linkrefer");
      copyButton.addEventListener("click", function() {
        if (linkrefer && linkrefer.innerText) {
          navigator.clipboard.writeText(linkrefer.innerText)
            .then(() => {
              console.log("Link copied to clipboard");
              alert("Link copied to clipboard!");
            })
            .catch(err => {
              console.error("Failed to copy link: ", err);
              // Fallback for browsers that do not support Clipboard API
              const textArea = document.createElement("textarea");
              textArea.value = linkrefer.innerText;
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              try {
                const successful = document.execCommand('copy');
                if (successful) {
                  console.log("Fallback: Link copied to clipboard");
                  alert("Link copied to clipboard!");
                } else {
                  console.error("Fallback: Copying failed");
                  alert("Unable to copy the link automatically.");
                }
              } catch (err) {
                console.error("Fallback: Error copying link", err);
                alert("Unable to copy the link automatically.");
              }
              document.body.removeChild(textArea);
            });
        }
      });
    } else {
      console.error("Copy button or linkrefer element not found.");
    }
  }, 1000); // 1-second delay to ensure other scripts have loaded
});