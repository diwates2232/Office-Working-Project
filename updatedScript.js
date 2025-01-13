const baseUrl = "http://localhost:80/api/regions";

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
offline_devices = []
online_devices = []

function updateDetails(data) {
    const detailsContainer = document.getElementById("device-details");
    detailsContainer.innerHTML = "";

    // Validate that 'data.details' exists and is an array--commented for testimg
    for (const [key, value] of Object.entries(data.details)) {



    if (!data || !Array.isArray(value)) {
        console.error("Invalid or empty details data:", data.details);
        detailsContainer.innerHTML = "<p>No details available.</p>";
        return;
    }




      device_type = key.substring(0, key.length-1).toUpperCase()

    // Render devices
    //sortedDevices
    value.forEach((device) => {
        const card = document.createElement("div");
        card.className = "device-card";

        card.innerHTML = `
            <h3>${device.cameraname || device.controllername || device.archivername || device.servers ||  "Unknown Device"}</h3>
            <p>DEVICE TYPE: ${device_type}</p>
            <p>IP: ${device.ip_address || "N/A"}</p>
            <p>LOCATION: ${device.location || "N/A"}</p>
            <p>Status: ${device.status || "Unknown"}</p>
            <button class="details-button" onclick="showModal('${device.cameraname}', '${device.ip_address}', '${device.location}', '${device.status}')">Details</button>
        `;

        if(`${device.status || "Unknown"}` === "Online" ) {
            online_devices.push(card)
        } else{
            offline_devices.push(card)
        }




        //;
    });


    for(let item of offline_devices){
        detailsContainer.appendChild(item);
    }
    for(let item of online_devices){
        detailsContainer.appendChild(item);
    }

}
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

