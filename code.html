<script>
    // Wait for the document to load
    document.addEventListener("DOMContentLoaded", function() {
      // Access Memberstack instance via window.$memberstackDom
      const memberstack = window.$memberstackDom;
    
      // Track modal state to prevent duplicate displays
      let modalShowing = false;
      let lastModalTime = 0;
      const MODAL_COOLDOWN = 1000; // 1 second cooldown between modal displays
    
      // Get the last 5 digits of the logged-in Memberstack user ID
      function getLastFiveDigits(memberId) {
        return memberId.slice(-5);
      }
    
      // Function to show the error modal with loading animation
      function showLoadingModal() {
        const modal = document.getElementById("errorModal");
        const messageElement = document.getElementById("errorModalMessage");
        const loadingElement = document.getElementById("modalLoading");
        const titleElement = document.getElementById("modalTitle");
        const closeButton = document.getElementById("modalCloseBtn");
        
        // Set modal showing flag
        modalShowing = true;
        lastModalTime = Date.now();
        
        // Hide message and show loading
        messageElement.style.display = "none";
        loadingElement.style.display = "block";
        closeButton.style.display = "none";
        
        // Set neutral title during loading
        titleElement.textContent = "Verifying account";
        titleElement.style.color = "#2196F3";
        
        modal.style.display = "flex";
      }
      
      // Function to show the error modal with a specific message
      function showErrorModal(message, isError = true) {
        // Check if the modal was just shown or hidden to prevent duplicate displays
        const currentTime = Date.now();
        if (modalShowing && (currentTime - lastModalTime < MODAL_COOLDOWN)) {
          return;
        }
        
        modalShowing = true;
        lastModalTime = currentTime;
        
        const modal = document.getElementById("errorModal");
        const messageElement = document.getElementById("errorModalMessage");
        const loadingElement = document.getElementById("modalLoading");
        const titleElement = document.getElementById("modalTitle");
        const closeButton = document.getElementById("modalCloseBtn");
        
        // Hide loading and show message
        loadingElement.style.display = "none";
        messageElement.style.display = "block";
        closeButton.style.display = "block";
        
        // Set appropriate title and color
        if (isError) {
          titleElement.textContent = "Channel Link Error";
          titleElement.style.color = "#d32f2f";
        } else {
          titleElement.textContent = "Success!";
          titleElement.style.color = "#4CAF50";
        }
        
        messageElement.textContent = message;
        modal.style.display = "flex";
      }
      
      // Function to hide the error modal
      function hideErrorModal() {
        const modal = document.getElementById("errorModal");
        modal.style.display = "none";
        modalShowing = false;
        lastModalTime = Date.now(); // Track when the modal was hidden
      }
      
      // Set up modal close button
      const closeBtn = document.getElementById("modalCloseBtn");
      if (closeBtn) {
        closeBtn.addEventListener("click", hideErrorModal);
      }
      
      // Close the modal when clicking outside the modal content
      const modal = document.getElementById("errorModal");
      if (modal) {
        modal.addEventListener("click", function(event) {
          // Only close if clicking the overlay (not the modal content)
          if (event.target === modal) {
            hideErrorModal();
          }
        });
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
        const inputElement = document.getElementById(`input${channelIndex}`);
        const channelId = inputElement.value.trim();
    
        if (channelId) {
          // Show loading modal
          showLoadingModal();
          
          // Call Lambda function endpoint instead of doing validation on client
          fetch("https://athi9jm2t5.execute-api.us-east-1.amazonaws.com/default/channels", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              channelId: channelId,
              memberId: member.id
            })
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              // Show success message
              showErrorModal(data.message || "YouTube channel successfully linked!", false);
              
              // Refresh just the cards instead of reloading the entire page
              setTimeout(() => {
                refreshChannelCards();
              }, 1500);
            } else {
              // Handle different error codes
              let errorMessage = data.message || data.error || "An unknown error occurred";
              
              // Custom messages based on error codes
              if (data.errorCode === 1001) {
                errorMessage = "This YouTube channel has already been linked to another account. If you think this is a mistake, please contact an admin.";
              } else if (data.errorCode === 1002) {
                errorMessage = "The channel's description does not contain your unique ID. Please add your ID to the channel description and try again.";
              } else if (data.errorCode === 1003) {
                errorMessage = "Invalid channel ID. Please check that you've entered a valid YouTube channel ID.";
              } else if (data.errorCode === 1004) {
                errorMessage = "You've reached the maximum number of linked channels. Please contact an admin for assistance.";
              }
              
              showErrorModal(errorMessage);
            }
          })
          .catch(error => {
            showErrorModal("Error: " + error.message);
          });
        } else {
          showErrorModal("Please enter a valid YouTube channel ID.");
        }
      }
    
      // Function to refresh just the channel cards
      function refreshChannelCards() {
        if (!memberstack) return;
        
        // Show a subtle loading indicator if needed
        const cardsContainer = document.querySelector(".channel-cards-container");
        if (cardsContainer) {
          cardsContainer.style.opacity = "0.6";
        }
        
        // Fetch the latest member data
        memberstack.getCurrentMember().then(({ data: updatedMember }) => {
          if (updatedMember) {
            // Update the cards with new data
            updateCards(updatedMember);
            
            // Set up event listeners again for the updated cards
            setupSubmitLinks(updatedMember);
            
            // Restore opacity
            if (cardsContainer) {
              cardsContainer.style.opacity = "1";
            }
          }
        }).catch(error => {
          if (cardsContainer) {
            cardsContainer.style.opacity = "1";
          }
        });
      }
    
      // Function to set up link click listeners
      function setupSubmitLinks(member) {
        for (let i = 1; i <= 20; i++) { // Updated loop to 20
          const submitElement = document.getElementById(`submit${i}`);
          if (submitElement) {
            submitElement.addEventListener("click", function(event) {
              event.preventDefault();
              handleSubmitLinkClick(i, member);
            });
          }
        }
      }
    
      // Check if Memberstack is available
      if (memberstack) {
        memberstack.getCurrentMember().then(({ data: member }) => {
          if (member) {
            const memberId = member.id;
    
            // Set the text element to show the last 5 digits of the Memberstack ID
            const lastFiveElement = document.getElementById("lastFive");
            if (lastFiveElement) lastFiveElement.textContent = getLastFiveDigits(memberId);
    
            // Update the visibility of cards based on custom fields
            updateCards(member);
    
            // Set up link click listeners
            setupSubmitLinks(member);
          }
        });
      }
    });
    </script>
    
    <!-- Load Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Your Script -->
    <script>
    document.addEventListener("DOMContentLoaded", function () {
        const memberstack2 = window.$memberstackDom;
    
        if (memberstack2) {
            memberstack2.getCurrentMember().then(({ data: member2 }) => {
                if (member2) {
                    let memberId2 = member2.id;
                    const customFields2 = member2.customFields;
    
                    if (customFields2) {
                        // Show loading elements
                        showElements();
    
                        // Get the user's split percentage
                        const splitPercentage = customFields2.split ? parseFloat(customFields2.split) / 100 : 0;
    
                        // Fetch and process data
                        calculateTotalStatsForAllChannels2(customFields2, splitPercentage);
                    }
                }
            });
        }
    
        function showElements() {
            const loadingElement = document.getElementById("loading");
            if (loadingElement) loadingElement.style.display = "block"; // Show loading animation
        }
    
        function hideElements() {
            const loadingElement = document.getElementById("loading");
            if (loadingElement) loadingElement.style.display = "none"; // Hide loading animation
        }
    
        function calculateTotalStatsForAllChannels2(customFields2, splitPercentage) {
            const channels = [];
            for (let i = 1; i <= 20; i++) {
                const channelID = customFields2[`channel${i}id`];
                const channelName = customFields2[`channel${i}`];
    
                if (channelID && channelName) {
                    channels.push({ id: channelID, name: channelName });
                }
            }
    
            // Fetch data from AWS Lambda
            fetch("https://athi9jm2t5.execute-api.us-east-1.amazonaws.com/default/dailystats", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ channelIDs: channels.map(c => c.id) }), // Send only channel IDs
            })
                .then(response => {
                    // Check if response status is 500
                    if (response.status === 500) {
                        // Refresh the page after a small delay
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                        throw new Error('Server error 500');
                    }
                    return response.json();
                })
                .then(dataFromLambda => {
                    // Cache AWS data globally for toggles and updates
                    window.awsDataCache = dataFromLambda;
    
                    // Initial calculations and render
                    calculateAndUpdateTotals(dataFromLambda, channels.map(c => c.id), splitPercentage);
                    populateToggles(channels);
                    renderChart(dataFromLambda, channels.map(c => c.id), splitPercentage);
    
                    hideElements(); // Hide loading elements
                })
                .catch(() => {
                    hideElements(); // Hide loading elements even if there's an error
                });
        }
    
        function calculateAndUpdateTotals(data, selectedChannels, splitPercentage) {
          // Filter data for selected channels
          const selectedData = data.filter(entry => selectedChannels.includes(entry.channelID));
    
          // Aggregate data by date across all selected channels
          const aggregatedData = selectedData.reduce((acc, entry) => {
              if (!acc[entry.date]) {
                  acc[entry.date] = { revenue: 0, views: 0 };
              }
              acc[entry.date].revenue += entry.revenue * splitPercentage;
              acc[entry.date].views += entry.views;
              return acc;
          }, {});
    
          // Convert aggregated data to sorted array
          const sortedAggregatedData = Object.entries(aggregatedData)
              .map(([date, values]) => ({ date: parseInt(date, 10), ...values }))
              .sort((a, b) => b.date - a.date);
    
          // Take the last 7 days
          const mostRecent7Days = sortedAggregatedData.slice(0, 7);
          const mostRecent28Days = sortedAggregatedData.slice(0, 28);
    
          // Calculate totals for 7d
          const totalRevenue7d = mostRecent7Days.reduce((sum, entry) => sum + entry.revenue, 0);
          const totalViews7d = mostRecent7Days.reduce((sum, entry) => sum + entry.views, 0);
          const rpm7d = totalViews7d > 0 ? (totalRevenue7d / totalViews7d) * 1000 : 0;
    
          // Calculate totals for 28d
          const totalRevenue28d = mostRecent28Days.reduce((sum, entry) => sum + entry.revenue, 0);
          const totalViews28d = mostRecent28Days.reduce((sum, entry) => sum + entry.views, 0);
          const rpm28d = totalViews28d > 0 ? (totalRevenue28d / totalViews28d) * 1000 : 0;
    
          // Update text elements for 7d
          document.getElementById("totalrev").textContent = totalRevenue7d.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          });
          document.getElementById("totalviews").textContent = totalViews7d.toLocaleString("en-US");
          document.getElementById("totalrpm").textContent = (rpm7d * 100).toFixed(2);
    
          // Update text elements for 28d
          document.getElementById("28rev").textContent = totalRevenue28d.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          });
          document.getElementById("28views").textContent = totalViews28d.toLocaleString("en-US");
          document.getElementById("28rpm").textContent = (rpm28d * 100).toFixed(2);
        }
      
        function populateToggles(channels) {
            const toggleContainer = document.getElementById("channelToggleContainer");
            toggleContainer.innerHTML = ""; // Clear any existing toggles
    
            channels.forEach(({ id, name }) => {
                const toggle = document.createElement("div");
                toggle.classList.add("toggleClass"); // Add the class to make it clickable
                toggle.innerHTML = `
                    <input type="checkbox" id="${id}" checked>
                    <label for="${id}">${name}</label>
                `;
    
                // Add click event to the entire container
                toggle.addEventListener("click", function () {
                    const checkbox = toggle.querySelector("input[type='checkbox']");
                    checkbox.checked = !checkbox.checked; // Toggle the checkbox
                    updateChart(); // Trigger chart update
                });
    
                toggleContainer.appendChild(toggle);
            });
        }
    
        function createCanvas(containerId) {
            const container = document.getElementById(containerId);
    
            if (!container) {
                return null; // Exit if the container is missing
            }
    
            // Remove any existing canvas to avoid duplicates
            const existingCanvas = container.querySelector("canvas");
            if (existingCanvas) {
                existingCanvas.remove();
            }
    
            // Create a new canvas element
            const canvas = document.createElement("canvas");
            canvas.id = "dynamicLineChart"; // Set a consistent ID for the canvas
            canvas.style.width = "100%"; // Ensure chart width is 100%
            container.style.marginBottom = "10vh"; // Add 10vh space below the container
            container.appendChild(canvas);
    
            return canvas; // Return the created canvas element
        }
    
        function renderChart(data, allChannels, splitPercentage) {
            const canvas = createCanvas("chartContainer");
            if (!canvas) {
                return; // Exit if canvas creation fails
            }
    
            const ctx = canvas.getContext("2d"); // Safely access getContext
            if (!ctx) {
                return; // Exit if getContext fails
            }
    
            const initialData = prepareChartData(data, allChannels, splitPercentage);
    
            const chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: initialData.labels,
                    datasets: initialData.datasets,
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "top" },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                            callbacks: {
                                title: function (tooltipItems) {
                                    return tooltipItems[0].label; // Show date
                                },
                                label: function (context) {
                                    const value = context.raw;
                                    const label = context.dataset.label;
                                    if (label === "Revenue") {
                                        return `Revenue: $${value.toLocaleString()}`;
                                    } else if (label === "Views") {
                                        return `Views: ${value >= 1e6 ? (value / 1e6).toFixed(1) + "M" : value >= 1e3 ? (value / 1e3).toFixed(1) + "K" : value}`;
                                    }
                                    return `${label}: ${value}`;
                                },
                            },
                        },
                    },
                    layout: {
                        padding: {
                            right: 20,
                        },
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { font: { family: "system-ui", size: 14 } },
                        },
                        yViews: {
                            type: "linear",
                            position: "right",
                            title: { display: true, text: "Views" },
                            grid: { display: false },
                            ticks: {
                                font: { family: "system-ui", size: 14 },
                                padding: 10,
                                callback: value => `${value >= 1e6 ? (value / 1e6).toFixed(1) + "M" : value >= 1e3 ? (value / 1e3).toFixed(1) + "K" : value}`,
                            },
                            min: 0,
                        },
                        yRevenue: {
                            type: "linear",
                            position: "left",
                            title: { display: true, text: "Revenue (USD)" },
                            grid: { display: false },
                            ticks: {
                                font: { family: "system-ui", size: 14 },
                                padding: 10,
                                callback: value => `$${value.toLocaleString()}`,
                            },
                            min: 0,
                        },
                    },
                    elements: {
                        line: { tension: 0.4, borderWidth: 3 },
                        point: {
                            radius: 6,
                            hoverRadius: 8,
                            backgroundColor: ctx => ctx.dataset.borderColor,
                        },
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                    },
                },
            });
    
            window.updateChart = function () {
                const selectedChannels = Array.from(
                    document.querySelectorAll("#channelToggleContainer input:checked")
                ).map(input => input.id);
    
                const filteredData = window.awsDataCache.filter(entry => selectedChannels.includes(entry.channelID));
    
                // Recalculate totals
                calculateAndUpdateTotals(filteredData, selectedChannels, splitPercentage);
    
                const updatedData = prepareChartData(filteredData, selectedChannels, splitPercentage);
                chart.data.labels = updatedData.labels;
                chart.data.datasets = updatedData.datasets;
                chart.update();
            };
        }
    
        function prepareChartData(data, selectedChannels, splitPercentage) {
            const selectedData = data.filter(d => selectedChannels.includes(d.channelID));
    
            const aggregatedData = selectedData.reduce((acc, entry) => {
                if (!acc[entry.date]) {
                    acc[entry.date] = { revenue: 0, views: 0 };
                }
                acc[entry.date].revenue += entry.revenue * splitPercentage;
                acc[entry.date].views += entry.views;
                return acc;
            }, {});
    
            const sortedAggregatedData = Object.entries(aggregatedData)
                .map(([date, values]) => ({ date: parseInt(date, 10), ...values }))
                .sort((a, b) => a.date - b.date);
    
            const baseDate = new Date(2024, 10, 1);
            const labels = sortedAggregatedData.map(item => {
                const currentDate = new Date(baseDate);
                currentDate.setDate(baseDate.getDate() + (item.date - 1));
                return currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            });
    
            const datasets = [
                {
                    label: "Views",
                    data: sortedAggregatedData.map(item => Math.round(item.views)),
                    borderColor: "darkblue",
                    backgroundColor: "rgba(0, 0, 139, 0.2)",
                    yAxisID: "yViews",
                    fill: true,
                },
                {
                    label: "Revenue",
                    data: sortedAggregatedData.map(item => Math.round(item.revenue)),
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    yAxisID: "yRevenue",
                    fill: true,
                },
            ];
    
            return { labels, datasets };
        }
    });
    </script>
    
    <!-- Add debugging to check if script loads -->
    <script>
    function handleReferralScriptLoad() {
      console.log("Referral handlers script loaded successfully");
      window.referralHandlersLoaded = true;
    }
    
    function handleReferralScriptError() {
      console.error("Failed to load referral handlers script from jsDelivr, trying unpkg...");
      
      // Try multiple CDNs to maximize reliability
      const fallbackScript = document.createElement('script');
      fallbackScript.src = "https://unpkg.com/@paramedia/site/referral-handlers.js";
      fallbackScript.crossOrigin = "anonymous";
      fallbackScript.onload = function() {
        console.log("Fallback script loaded successfully from unpkg");
        window.referralHandlersLoaded = true;
      };
      
      fallbackScript.onerror = function() {
        console.error("All external script sources failed - using GitHub raw as final attempt");
        
        const rawGitScript = document.createElement('script');
        rawGitScript.src = "https://raw.githubusercontent.com/paramedia/site/main/referral-handlers.js";
        rawGitScript.type = "application/javascript"; // Important: specify the type
        rawGitScript.crossOrigin = "anonymous";
        
        rawGitScript.onload = function() {
          console.log("Raw GitHub script loaded successfully");
          window.referralHandlersLoaded = true;
        };
        
        rawGitScript.onerror = function() {
          console.error("All script sources failed to load - embedding inline version");
          // Inline fallback as last resort
          window.referralHandlersLoaded = false;
          
          // Implement core functionality inline as last resort
          document.addEventListener('DOMContentLoaded', function() {
            console.log("Using inline fallback for critical functions");
            // Basic initialization of split system
            if (window.$memberstackDom) {
              window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
                if (member && member.customFields && member.customFields.split) {
                  const splitElement = document.getElementById('currentSplit');
                  if (splitElement) {
                    const splitValue = parseFloat(member.customFields.split);
                    splitElement.textContent = splitValue.toFixed(0) + '%';
                  }
                }
              });
            }
            
            // Setup global error handler for 500 errors
            window.addEventListener('unhandledrejection', function(event) {
              if (event.reason && 
                  (event.reason.status === 500 || 
                  (event.reason.message && event.reason.message.includes('500')))) {
                console.error('Server error 500 detected:', event.reason);
                setTimeout(() => { window.location.reload(); }, 1000);
              }
            });
          });
        };
        document.head.appendChild(rawGitScript);
      };
      document.head.appendChild(fallbackScript);
    }
    </script>
    
    <!-- Try loading from jsDelivr first - updated URL format with version specification -->
    <script src="https://cdn.jsdelivr.net/gh/paramedia/site@latest/referral-handlers.js" 
            crossorigin="anonymous"
            onload="handleReferralScriptLoad()"
            onerror="handleReferralScriptError()"></script>
    
    <!-- Add this HTML for the popup modal at the end of your file, right before the closing body tag -->
    <div id="errorModal" class="modal-overlay">
      <div class="modal-container">
        <div id="modalTitle" class="modal-title">Channel Link Error</div>
        <div id="modalLoading" style="display: none;">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Processing your request...</p>
        </div>
        <div id="errorModalMessage" class="modal-message">Error message will appear here.</div>
        <button id="modalCloseBtn" class="modal-button">Close</button>
      </div>
    </div> 
    
    <!-- Audio Player HTML -->
    <div id="audio-player-container" style="display: none; position: fixed; bottom: 0; left: 0; right: 0; background-color: #222; color: white; padding: 15px; z-index: 1000; box-shadow: 0 -2px 10px rgba(0,0,0,0.3); transition: transform 0.3s ease; transform: translateY(100%);">
      <div style="display: flex; flex-direction: column; max-width: 1200px; margin: 0 auto; width: 100%;">
        <!-- Top row: track info and volume -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; width: 100%;">
          <div style="display: flex; align-items: center; flex: 1; overflow: hidden;">
            <button id="play-pause-button" style="background: transparent; border: none; cursor: pointer; margin-right: 15px; min-width: 30px;">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <path id="play-icon" d="M8 5v14l11-7z" style="display: block;"></path>
                <path id="pause-icon" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" style="display: none;"></path>
              </svg>
            </button>
            <div style="flex-grow: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
              <div id="track-title" style="font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">No track playing</div>
              <div id="track-genre" style="font-size: 0.85em; color: #aaa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"></div>
            </div>
          </div>
          
          <!-- Volume controls on right side -->
          <div style="display: flex; align-items: center; margin-left: 15px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style="margin-right: 5px; min-width: 20px;">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>
            </svg>
            <input id="volume-slider" type="range" min="0" max="100" value="80" style="width: 80px; -webkit-appearance: none; height: 4px; border-radius: 2px; background: #555;">
            <button id="close-player" style="background: transparent; border: none; margin-left: 15px; cursor: pointer; min-width: 18px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Bottom row: seek slider and time -->
        <div style="display: flex; align-items: center; width: 100%;">
          <span id="current-time" style="min-width: 35px; margin-right: 5px; font-size: 0.9em;">0:00</span>
          <div style="flex: 1; position: relative;">
            <input id="seek-slider" type="range" min="0" max="100" value="0" step="1" style="width: 100%; cursor: pointer; -webkit-appearance: none; height: 5px; border-radius: 2px; background: #555;">
          </div>
          <span id="duration" style="min-width: 35px; margin-left: 5px; font-size: 0.9em;">0:00</span>
        </div>
      </div>
      
      <style>
        #seek-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2196F3;
          cursor: pointer;
        }
        #seek-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #2196F3;
          cursor: pointer;
        }
        #volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2196F3;
          cursor: pointer;
        }
        #volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2196F3;
          cursor: pointer;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          #audio-player-container {
            padding: 12px 10px;
          }
          #seek-slider, #volume-slider {
            height: 6px; /* Slightly larger touch target */
          }
          #seek-slider::-webkit-slider-thumb {
            width: 16px;
            height: 16px;
          }
          #seek-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
          }
        }
      </style>
    </div>
    
    <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Audio player elements
      const playerContainer = document.getElementById('audio-player-container');
      const playPauseButton = document.getElementById('play-pause-button');
      const playIcon = document.getElementById('play-icon');
      const pauseIcon = document.getElementById('pause-icon');
      const trackTitle = document.getElementById('track-title');
      const trackGenre = document.getElementById('track-genre');
      const currentTimeEl = document.getElementById('current-time');
      const durationEl = document.getElementById('duration');
      const seekSlider = document.getElementById('seek-slider');
      const volumeSlider = document.getElementById('volume-slider');
      const closeButton = document.getElementById('close-player');
      
      // Create audio element
      const audio = new Audio();
      let isPlaying = false;
      let currentTrack = '';
      
      // Initialize player
      audio.volume = volumeSlider.value / 100;
      
      // Function to initialize audio track links
      function initTrackLinks() {
        console.log("Initializing audio track links");
        // Find all links to audio files that haven't been initialized yet
        const audioLinks = document.querySelectorAll('a[href*=".wav"], a[href*=".mp3"], a[href*=".m4a"], a[href*=".ogg"]:not([data-audio-player-initialized="true"])');
        
        console.log(`Found ${audioLinks.length} audio links to initialize`);
        
        audioLinks.forEach(link => {
          const url = link.getAttribute('href');
          console.log(`Processing audio link: ${url}`);
          const trackElement = link.closest('.track-item') || link.parentElement;
          
          // Get track information from parent elements or data attributes
          const title = link.getAttribute('data-track-title') || 
                       link.textContent || 
                       (trackElement ? trackElement.querySelector('.track-title')?.textContent : null) || 
                       'Unknown Track';
                       
          const genre = link.getAttribute('data-track-genre') || 
                       (trackElement ? trackElement.querySelector('.track-genre')?.textContent : null) || 
                       '';
          
          // Mark as initialized to prevent duplicate event listeners
          link.setAttribute('data-audio-player-initialized', 'true');
          if (trackElement) {
            trackElement.setAttribute('data-audio-player-initialized', 'true');
          }
          
          // Add click event listener
          link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Audio link clicked: ${url}`);
            loadTrack(url, title, genre);
          });
        });
      }
      
      // Load and play a track
      function loadTrack(url, title, genre = '') {
        console.log(`Loading track: ${url}`);
        
        // Simple URL cache - no processing needed for R2 URLs
        if (!window.urlCache) {
          window.urlCache = {};
        }
        
        // Use direct URL without any conversion
        const directUrl = url;
        window.urlCache[url] = directUrl;
        
        console.log(`Using direct URL: ${directUrl}`);
        
        if (currentTrack === directUrl && isPlaying) {
          // If clicking the same track that's playing, just pause it
          console.log('Same track clicked while playing - pausing');
          pauseTrack();
          return;
        }
        
        if (currentTrack === directUrl && !isPlaying) {
          // If clicking the same track that's paused, resume it
          console.log('Same track clicked while paused - resuming');
          playTrack();
          return;
        }
        
        // Stop any currently playing audio immediately
        if (isPlaying) {
          audio.pause();
        }
        
        // Store the track info permanently
        window.currentTrackInfo = {
          title: title,
          genre: genre
        };
        
        // Load new track
        currentTrack = directUrl;
        
        // Set crossOrigin attribute for CORS support
        audio.crossOrigin = "anonymous";
        
        // Update track info display immediately
        trackTitle.textContent = title;
        trackGenre.textContent = genre;
        
        // Make sure elements are visible
        trackTitle.style.display = 'block';
        trackGenre.style.display = 'block';
        
        // Show player if hidden
        showPlayer();
        
        // Add loading indicator to title
        trackTitle.innerHTML = `${title} <small style="color:#aaa;font-size:0.8em;">(loading...)</small>`;
        
        // Load the track directly
        console.log(`Continuing to load track: ${directUrl}`);
        continueLoadingTrack(directUrl);
      }
      
      function continueLoadingTrack(directUrl) {
        console.log(`Setting audio source to: ${directUrl}`);
        
        // Set preload to auto for faster loading
        audio.preload = 'auto';
        
        // Set the audio source
        audio.src = directUrl;
        
        // Add canplay event listener for this specific load
        const canPlayHandler = function() {
          console.log('Audio canplay event fired - ready to play');
          // Remove the small loading text from title
          if (window.currentTrackInfo && window.currentTrackInfo.title) {
            trackTitle.textContent = window.currentTrackInfo.title;
          }
          
          // Play the track
          playTrack();
          
          // Remove this specific event handler
          audio.removeEventListener('canplay', canPlayHandler);
        };
        
        // Add error handler
        const errorHandler = function(e) {
          console.error(`Audio loading error: ${e.message || 'Unknown error'}`, e);
          trackTitle.innerHTML = `${window.currentTrackInfo ? window.currentTrackInfo.title : 'Unknown Track'} <small style="color:red;">(Error loading audio)</small>`;
          
          // Remove this specific error handler after first error
          audio.removeEventListener('error', errorHandler);
        };
        
        // Listen for when enough data is loaded to start playback
        audio.addEventListener('canplay', canPlayHandler);
        
        // Listen for errors
        audio.addEventListener('error', errorHandler);
        
        // Start loading the audio
        audio.load();
        
        // Also try to play immediately - browser will queue this until ready
        // This can speed up playback in some browsers
        playTrack();
      }
      
      // Play current track
      function playTrack() {
        // Only show loading state if track isn't ready yet
        if (audio.readyState < 3) { // HAVE_FUTURE_DATA
          const originalTitle = window.currentTrackInfo ? window.currentTrackInfo.title : trackTitle.textContent;
          // Add loading indicator to title without completely replacing it
          if (!trackTitle.textContent.includes('loading')) {
            trackTitle.innerHTML = `${originalTitle} <small style="color:#aaa;font-size:0.8em;">(loading...)</small>`;
          }
        }
        
        // Try to play - will queue until ready
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            
            // Restore original track info from our permanent storage only when successfully playing
            if (window.currentTrackInfo) {
              trackTitle.textContent = window.currentTrackInfo.title;
              trackGenre.textContent = window.currentTrackInfo.genre;
            }
            
            // Explicitly set display to ensure visibility
            trackTitle.style.display = 'block';
            trackGenre.style.display = 'block';
          }).catch(error => {
            trackTitle.textContent = window.currentTrackInfo ? window.currentTrackInfo.title : 'Unknown Track';
            trackTitle.innerHTML += ' <small style="color:#f44336;font-size:0.8em;">(error playing)</small>';
          });
        }
      }
      
      // Pause current track
      function pauseTrack() {
        audio.pause();
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
      
      // Player display functions
      function showPlayer() {
        playerContainer.style.display = 'block';
        setTimeout(() => playerContainer.style.transform = 'translateY(0)', 10);
      }
      
      function hidePlayer() {
        playerContainer.style.transform = 'translateY(100%)';
        setTimeout(() => {
          if (!isPlaying) playerContainer.style.display = 'none';
        }, 300);
      }
      
      // Format time in MM:SS
      function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
      }
      
      // Event Listeners
      playPauseButton.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
      
      seekSlider.addEventListener('input', () => {
        currentTimeEl.textContent = formatTime((seekSlider.value / 100) * audio.duration);
      });
      
      seekSlider.addEventListener('change', () => {
        audio.currentTime = (seekSlider.value / 100) * audio.duration;
      });
      
      volumeSlider.addEventListener('input', () => audio.volume = volumeSlider.value / 100);
      closeButton.addEventListener('click', () => { pauseTrack(); hidePlayer(); });
      
      // Audio events
      audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        seekSlider.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
      });
      
      audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
        seekSlider.value = 0;
      });
      
      audio.addEventListener('ended', () => {
        pauseTrack();
        seekSlider.value = 0;
        currentTimeEl.textContent = '0:00';
      });
      
      // Preload visible tracks to speed up initial playback
      function preloadVisibleTracks() {
        console.log("Checking for visible tracks to preload");
        
        if (!window.urlCache) {
          window.urlCache = {};
        }
        
        // Find all visible track links in the viewport
        const trackItems = document.querySelectorAll('[data-audio-player-initialized="true"]');
        const visibleItems = Array.from(trackItems).filter(el => {
          const rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        });
        
        console.log(`Found ${visibleItems.length} visible audio items in viewport`);
        
        // Preload the first few visible items (limit to 3 to avoid too many connections)
        visibleItems.slice(0, 3).forEach(item => {
          const audioLink = item.querySelector('a[href*=".wav"], a[href*=".mp3"], a[href*=".m4a"], a[href*=".ogg"]');
          if (!audioLink) return;
          
          const url = audioLink.getAttribute('href');
          if (!url) return;
          
          console.log(`Preloading audio file: ${url}`);
          
          // Cache the direct URL - no processing needed
          window.urlCache[url] = url;
          
          // Create a link prefetch tag
          const existingPrefetch = document.querySelector(`link[rel="prefetch"][href="${url}"]`);
          if (existingPrefetch) {
            console.log(`Prefetch for ${url} already exists, skipping`);
            return;
          }
          
          const linkPrefetch = document.createElement('link');
          linkPrefetch.rel = 'prefetch';
          linkPrefetch.href = url;
          linkPrefetch.as = 'audio';
          linkPrefetch.crossOrigin = 'anonymous'; // Add CORS support for cross-origin audio
          document.head.appendChild(linkPrefetch);
          console.log(`Added prefetch for: ${url}`);
        });
      }
      
      // Initialize the player when the DOM is loaded
      initTrackLinks();
      
      // Start preloading visible tracks after a short delay
      setTimeout(preloadVisibleTracks, 1000);
      
      // Handle new content more carefully to prevent duplicate initialization
      let observerTimeout;
      const observer = new MutationObserver(function(mutations) {
        // Use a debounce to avoid multiple rapid calls
        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
          // Only look for mutations that added nodes to the document
          const hasAddedNodes = mutations.some(mutation => 
            mutation.addedNodes && 
            mutation.addedNodes.length > 0 && 
            !mutation.target.closest('#audio-player-container') // Ignore mutations inside our player
          );
          
          if (hasAddedNodes) {
            initTrackLinks();
            preloadVisibleTracks(); // Preload tracks after content changes
          }
        }, 300); // Wait 300ms after mutations stop before reinitializing
      });
      
      // Observe only the main content area, not the entire document
      const mainContent = document.querySelector('.main-content') || 
                        document.querySelector('.w-container') || 
                        document.querySelector('main') || 
                        document.body;
                        
      observer.observe(mainContent, { 
        childList: true, 
        subtree: true 
      });
    });
    </script>

    <!-- Create the audio player elements if they don't exist -->
    <script>
    if (!document.getElementById('audio-player')) {
      console.log("Creating audio player UI");
      // Create the audio element
      const audio = document.createElement('audio');
      audio.id = 'audio';
      audio.crossOrigin = 'anonymous'; // Enable CORS for R2
      
      // Create player container
      const playerContainer = document.createElement('div');
      playerContainer.id = 'audio-player';
      playerContainer.className = 'audio-player';
      playerContainer.style.display = 'none';
      
      // Add all the player UI elements (controls, progress, etc.)
      // ... existing code ...
    }

    // Event listeners for the audio element
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      pauseTrack();
      progressBar.style.width = '0%';
    });

    // Add specific error handling for CORS issues
    audio.addEventListener('error', (e) => {
      console.error('Audio element error:', e);
      const errorCode = audio.error ? audio.error.code : 'unknown';
      const errorMessage = audio.error ? audio.error.message : 'Unknown error';
      
      console.error(`Audio error code: ${errorCode}, message: ${errorMessage}`);
      
      // Check if this is a CORS error
      if (errorMessage && (errorMessage.includes('CORS') || errorCode === 4)) {
        console.error('Possible CORS error detected. Please check your R2 CORS configuration.');
        trackTitle.innerHTML = `${window.currentTrackInfo ? window.currentTrackInfo.title : 'Unknown Track'} <small style="color:red;">(CORS error - check R2 settings)</small>`;
      }
    });

    // ... existing code ...
    </script>

    <!-- Replace with inline script -->
    <script>
    // Initialize the split system - show current split percentage
    document.addEventListener('DOMContentLoaded', function() {
      // Check if Memberstack is available
      if (window.$memberstackDom) {
        window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
          if (member && member.customFields && member.customFields.split) {
            const splitElement = document.getElementById('currentSplit');
            if (splitElement) {
              const splitValue = parseFloat(member.customFields.split);
              splitElement.textContent = splitValue.toFixed(0) + '%';
            }
          }
        });
      }
      
      // Set up copy button listener
      const copyBtn = document.getElementById('copyReferralLink');
      if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const linkInput = document.getElementById('referralLinkInput');
          if (linkInput) {
            linkInput.select();
            document.execCommand('copy');
            
            // Show copied confirmation
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#4caf50';
            
            // Reset button after 2 seconds
            setTimeout(() => {
              copyBtn.textContent = originalText;
              copyBtn.style.backgroundColor = '';
            }, 2000);
          }
        });
      }
      
      // Get referral link and populate input field
      if (window.$memberstackDom) {
        window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
          if (member && member.id) {
            const memberId = member.id;
            const linkInput = document.getElementById('referralLinkInput');
            if (linkInput) {
              linkInput.value = `https://app.paramedia.io/?ref=${memberId}`;
            }
          }
        });
      }
      
      // Check Memberstack plan for specific content
      function checkMemberstackPlan() {
        if (window.$memberstackDom) {
          window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
            if (member && member.planConnections) {
              const plans = member.planConnections;
              const premiumContent = document.querySelectorAll('.premium-only');
              const proContent = document.querySelectorAll('.pro-only');
              
              let hasPremium = false;
              let hasPro = false;
              
              // Check if user has Premium or Pro plan
              plans.forEach(plan => {
                const planId = plan.planId;
                if (planId === 'pln_premium-plan-0bb9z6yl' || 
                    planId === 'pln_premium-yearly-9rjp4r67') {
                  hasPremium = true;
                }
                if (planId === 'pln_pro-plan-0fgj0hbe' || 
                    planId === 'pln_pro-yearly-0w2p9c7k') {
                  hasPro = true;
                }
              });
              
              // Show/hide premium content
              premiumContent.forEach(el => {
                el.style.display = hasPremium || hasPro ? 'block' : 'none';
              });
              
              // Show/hide pro content
              proContent.forEach(el => {
                el.style.display = hasPro ? 'block' : 'none';
              });
            }
          });
        }
      }
      
      // Run plan check on load
      checkMemberstackPlan();
    });

    // Setup global error handler for 500 errors - auto refresh the page
    window.addEventListener('unhandledrejection', function(event) {
      if (event.reason && 
          (event.reason.status === 500 || 
          (event.reason.message && event.reason.message.includes('500')))) {
        console.error('Server error 500 detected:', event.reason);
        setTimeout(() => { window.location.reload(); }, 1000);
      }
    });
    </script>
