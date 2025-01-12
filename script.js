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
