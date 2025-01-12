
// Add event listeners for region buttons
document.querySelectorAll(".region-button").forEach((button) => {
    button.addEventListener("click", () => {
        const region = button.getAttribute("data-region"); // Get the region from the button's data attribute
        fetchSummary(region); // Fetch the summary for the selected region
        fetchDetails(region); // Fetch the details for the selected region
    });
});

// Default: Fetch global summary and details on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchSummary("global");
    fetchDetails("global");
});




function fetchSummary(region) {
    fetch(`http://localhost:3000/api/regions/summary/${region}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.summary) {
                updateSummary(data.summary); // Update the summary UI
            } else {
                console.error("Invalid summary data:", data);
            }
        })
        .catch((error) => console.error("Error fetching summary:", error));
}

function updateSummary(summary) {
    document.getElementById("total-devices").textContent = summary.totalDevices || 0;
    document.getElementById("total-online-devices").textContent = summary.totalOnlineDevices || 0;
    document.getElementById("total-offline-devices").textContent = summary.totalOfflineDevices || 0;

    // Update individual device categories
    document.getElementById("cameras-total").textContent = summary.cameras.total || 0;
    document.getElementById("cameras-online").textContent = summary.cameras.online || 0;
    document.getElementById("cameras-offline").textContent = summary.cameras.offline || 0;

    document.getElementById("archivers-total").textContent = summary.archivers.total || 0;
    document.getElementById("archivers-online").textContent = summary.archivers.online || 0;
    document.getElementById("archivers-offline").textContent = summary.archivers.offline || 0;

    document.getElementById("controllers-total").textContent = summary.controllers.total || 0;
    document.getElementById("controllers-online").textContent = summary.controllers.online || 0;
    document.getElementById("controllers-offline").textContent = summary.controllers.offline || 0;

    document.getElementById("servers-total").textContent = summary.servers.total || 0;
    document.getElementById("servers-online").textContent = summary.servers.online || 0;
    document.getElementById("servers-offline").textContent = summary.servers.offline || 0;
}




function fetchDetails(region) {
    fetch(`http://localhost:3000/api/regions/details/${region}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.details) {
                updateDetails(data.details); // Update the details UI
            } else {
                console.error("Invalid details data:", data);
            }
        })
        .catch((error) => console.error("Error fetching details:", error));
}



.







////
function fetchDetails() {
    fetch("http://localhost:3000/api/regions/details/global")
        .then((response) => response.json())
        .then((data) => {
            console.log("Details Data:", data.details);
            if (!data.details || Object.keys(data.details).length === 0) {
                console.error("Invalid or empty details data");
                return;
            }
            updateDetails(data.details);
        })
        .catch((error) => {
            console.error("Error fetching details:", error);
        });
}





function updateDetails(details) {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = ""; // Clear previous details

    // Iterate over device types
    ["cameras", "archivers", "controllers", "servers"].forEach((type) => {
        if (details[type] && Array.isArray(details[type])) {
            details[type].forEach((device) => {
                const card = document.createElement("div");
                card.className = "device-card";
                card.innerHTML = `
                    <h3>${device.cameraname || device.archivername || device.controllername || device.servername || "Unknown Device"}</h3>
                    <p>IP: ${device.ip_address || "N/A"}</p>
                    <p>Status: ${device.status || "Unknown"}</p>
                    <button class="details-button" onclick="showModal('${device.cameraname || device.archivername || device.controllername || device.servername}', '${device.ip_address}', '${device.status}')">Details</button>
                `;
                detailsContainer.appendChild(card);
            });
        } else {
            console.warn(`No data available for ${type}`);
        }
    });
}




if (!details[type] || details[type].length === 0) {
    const message = document.createElement("p");
    message.textContent = `No ${type} available.`;
    detailsContainer.appendChild(message);
}






Updated.

const baseUrl = "http://localhost:3000/api/regions";

document.addEventListener("DOMContentLoaded", () => {
    // Fetch summary and details for the default region (global)
    fetchSummary("global");
    fetchDetails("global");

    // Add event listeners to region buttons
    const regionButtons = document.querySelectorAll(".region-button");
    regionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const region = button.getAttribute("data-region");
            document.getElementById("region-title").textContent = `${region.toUpperCase()} Summary`;
            fetchSummary(region);
            fetchDetails(region);
        });
    });

    // Close modal on button click
    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    });
});

function fetchSummary(regionName) {
    const summaryUrl = `${baseUrl}/summary/${regionName}`;

    fetch(summaryUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching summary data from API.");
            }
            return response.json();
        })
        .then((summary) => {
            console.log("Summary Data:", summary);
            updateSummary(summary);
        })
        .catch((error) => {
            console.error("Error fetching summary:", error);
            alert("Failed to load summary data. Please check the console for details.");
        });
}

function fetchDetails(regionName) {
    const detailsUrl = `${baseUrl}/details/${regionName}`;

    fetch(detailsUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error fetching details data from API.");
            }
            return response.json();
        })
        .then((details) => {
            console.log("Details Data:", details);
            updateDetails(details);
        })
        .catch((error) => {
            console.error("Error fetching details:", error);
            alert("Failed to load details data. Please check the console for details.");
        });
}

function updateSummary(data) {
    document.getElementById("total-devices").textContent = data.summary?.totalDevices || "N/A";
    document.getElementById("online-devices").textContent = data.summary?.totalOnlineDevices || "N/A";
    document.getElementById("offline-devices").textContent = data.summary?.totalOfflineDevices || "N/A";
}

function updateDetails(data) {
    const detailsContainer = document.getElementById("device-details");
    detailsContainer.innerHTML = "";

    // Validate that 'data.details' exists and is an array
    if (!data || !Array.isArray(data.details)) {
        console.error("Invalid or empty details data:", data.details);
        detailsContainer.innerHTML = "<p>No details available.</p>";
        return;
    }

    // Sort devices: Offline devices first
    const sortedDevices = data.details.sort((a, b) => {
        if (a.status === "Offline" && b.status !== "Offline") return -1;
        if (a.status !== "Offline" && b.status === "Offline") return 1;
        return 0;
    });

    // Render devices
    sortedDevices.forEach((device) => {
        const card = document.createElement("div");
        card.className = "device-card";

        card.innerHTML = `
            <h3>${device.name || "Unknown Device"}</h3>
            <p>IP: ${device.ip || "N/A"}</p>
            <p>Status: ${device.status || "Unknown"}</p>
            <button class="details-button" onclick="showModal('${device.name}', '${device.ip}', '${device.status}')">Details</button>
        `;

        detailsContainer.appendChild(card);
    });
}

function showModal(name, ip, status) {
    document.getElementById("modal-title").textContent = `Details for ${name}`;
    document.getElementById("modal-body").innerHTML = `
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>IP:</strong> ${ip}</li>
        <li><strong>Status:</strong> ${status}</li>
    `;
    document.getElementById("modal").style.display = "block";
}







    

    
const baseUrl = "http://localhost:3000/api/regions";

document.addEventListener("DOMContentLoaded", () => {
    // Fetch summary for the default region (global)
    fetchSummary("global");

    // Add event listeners to region buttons
    const regionButtons = document.querySelectorAll(".region-button");
    regionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const region = button.getAttribute("data-region");
            document.getElementById("region-title").textContent = `${region.toUpperCase()} Summary`;
            fetchSummary(region);
        });
    });

    // Close modal on button click
    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    });
});

function fetchSummary(region) {
    const summaryUrl = `${baseUrl}/summary/${region}`;
    const detailsUrl = `${baseUrl}/details/${region}`;

    Promise.all([fetch(summaryUrl), fetch(detailsUrl)])
        .then((responses) => {
            if (!responses[0].ok || !responses[1].ok) {
                throw new Error("Error fetching data from API.");
            }
            return Promise.all(responses.map((res) => res.json()));
        })
        .then(([summary, details]) => {
            console.log("Summary Data:", summary);
            console.log("Details Data:", details);
            updateSummary(summary);
            updateDetails(details);
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to load data. Please check the console for details.");
        });
}

function updateSummary(data) {
    document.getElementById("total-devices").textContent = data.summary?.totalDevices || "N/A";
    document.getElementById("online-devices").textContent = data.summary?.totalOnlineDevices || "N/A";
    document.getElementById("offline-devices").textContent = data.summary?.totalOfflineDevices || "N/A";
}

function updateDetails(data) {
    const detailsContainer = document.getElementById("device-details");
    detailsContainer.innerHTML = "";

    // Validate that 'data.details' exists and is an array
    if (!data || !Array.isArray(data.details)) {
        console.error("Invalid or empty details data:", data.details);
        detailsContainer.innerHTML = "<p>No details available.</p>";
        return;
    }

    // Sort devices: Offline devices first
    const sortedDevices = data.details.sort((a, b) => {
        if (a.status === "Offline" && b.status !== "Offline") return -1;
        if (a.status !== "Offline" && b.status === "Offline") return 1;
        return 0;
    });

    // Render devices
    sortedDevices.forEach((device) => {
        const card = document.createElement("div");
        card.className = "device-card";

        card.innerHTML = `
            <h3>${device.name || "Unknown Device"}</h3>
            <p>IP: ${device.ip || "N/A"}</p>
            <p>Status: ${device.status || "Unknown"}</p>
            <button class="details-button" onclick="showModal('${device.name}', '${device.ip}', '${device.status}')">Details</button>
        `;

        detailsContainer.appendChild(card);
    });
}

function showModal(name, ip, status) {
    document.getElementById("modal-title").textContent = `Details for ${name}`;
    document.getElementById("modal-body").innerHTML = `
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>IP:</strong> ${ip}</li>
        <li><strong>Status:</strong> ${status}</li>
    `;
    document.getElementById("modal").style.display = "block";
}
