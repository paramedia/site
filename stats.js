document.addEventListener("DOMContentLoaded", function () {
    const memberstack2 = window.$memberstackDom;

    if (memberstack2) {
        memberstack2.getCurrentMember().then(({ data: member2 }) => {
            if (member2) {
                let memberId2 = member2.id;
                console.log("Logged-in Member ID: ", memberId2);

                const customFields2 = member2.customFields;

                if (customFields2) {
                    // Show loading elements
                    showElements();

                    // Get the user's split percentage
                    const splitPercentage = customFields2.split ? parseFloat(customFields2.split) / 100 : 0;

                    // Fetch and process data
                    calculateTotalStatsForAllChannels2(customFields2, splitPercentage);
                } else {
                    console.warn("No custom fields available for this member.");
                }
            } else {
                console.warn("No member data available.");
            }
        }).catch((error2) => {
            console.error("Error fetching member data: ", error2);
        });
    } else {
        console.error("Memberstack DOM is not available. Ensure it is loaded properly.");
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
                console.log(`Channel ${i}: ID=${channelID}, Name=${channelName}`);
            }
        }

        // Fetch data from AWS Lambda
        fetch("https://athi9jm2t5.execute-api.us-east-1.amazonaws.com/default/dailystats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ channelIDs: channels.map(c => c.id) }), // Send only channel IDs
        })
            .then(response => response.json())
            .then(dataFromLambda => {
                console.log("Raw Data from AWS Lambda:", dataFromLambda);

                // Cache AWS data globally for toggles and updates
                window.awsDataCache = dataFromLambda;

                // Initial calculations and render
                calculateAndUpdateTotals(dataFromLambda, channels.map(c => c.id), splitPercentage);
                populateToggles(channels);
                renderChart(dataFromLambda, channels.map(c => c.id), splitPercentage);

                hideElements(); // Hide loading elements
            })
            .catch(error => {
                console.error("Error fetching data from AWS:", error);
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

      // Debug logs
      console.log("Aggregated Data:", aggregatedData);
      console.log("Most Recent 7 Days Data:", mostRecent7Days);
      console.log("Calculated Totals - 7d Revenue:", totalRevenue7d, "7d Views:", totalViews7d, "7d RPM:", rpm7d);
      console.log("Calculated Totals - 28d Revenue:", totalRevenue28d, "28d Views:", totalViews28d, "28d RPM:", rpm28d);

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
            console.error(`Container with ID "${containerId}" not found.`);
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
            console.error("Failed to create the canvas element. Graph rendering aborted.");
            return; // Exit if canvas creation fails
        }

        const ctx = canvas.getContext("2d"); // Safely access getContext
        if (!ctx) {
            console.error("Failed to get the canvas context. Graph rendering aborted.");
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
