// Function to fetch region data and update the UI
function fetchRegionData(regionName) {
    // Show loading message
    document.getElementById("controllers-list").innerHTML = "<p>Loading controllers...</p>";
    document.getElementById("archivers-list").innerHTML = "<p>Loading archivers...</p>";

    // Fetch data from the backend
    fetch(`http://localhost:3000/api/regions/${regionName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch region data");
            }
            return response.json();
        })
        .then(data => {
            // Preprocess data to normalize keys
            const normalizedData = {
                controllers: data.controllers.map(normalizeKeys),
                archivers: data.archivers.map(normalizeKeys),
            };
            updateDetails(normalizedData);
        })
        .catch(error => {
            document.getElementById("controllers-list").innerHTML = `<p>Error: ${error.message}</p>`;
            document.getElementById("archivers-list").innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to normalize keys in an object
function normalizeKeys(obj) {
    const normalizedObj = {};
    for (const key in obj) {
        const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '_'); // Convert to lowercase and replace spaces with underscores
        normalizedObj[normalizedKey] = obj[key];
    }
    return normalizedObj;
}

// Function to update the controllers and archivers details
function updateDetails(data) {
    // Update controllers
    let controllersHTML = "<ul>";
    data.controllers.forEach(controller => {
        controllersHTML += `
            <li>
                <strong>Controller Name:</strong> ${controller.controllername || "N/A"}<br>
                <strong>IP Address:</strong> ${controller.ip_address_of_controller || "N/A"}<br>
                <strong>Status:</strong> ${controller.status || "N/A"}
            </li>`;
    });
    controllersHTML += "</ul>";
    document.getElementById("controllers-list").innerHTML = controllersHTML;

    // Update archivers
    let archiversHTML = "<ul>";
    data.archivers.forEach(archiver => {
        archiversHTML += `
            <li>
                <strong>Archiver Name:</strong> ${archiver.archiver_name || "N/A"}<br>
                <strong>IP Address:</strong> ${archiver.ip_address_of_archiver || "N/A"}<br>
                <strong>Status:</strong> ${archiver.status || "N/A"}
            </li>`;
    });
    archiversHTML += "</ul>";
    document.getElementById("archivers-list").innerHTML = archiversHTML;
}

// Attach event listeners to region buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("APAC").addEventListener("click", () => fetchRegionData("APAC"));
    document.getElementById("EMEA").addEventListener("click", () => fetchRegionData("EMEA"));
    document.getElementById("LACA").addEventListener("click", () => fetchRegionData("LACA"));
    document.getElementById("NAMER").addEventListener("click", () => fetchRegionData("NAMER"));
});




new 





    // Function to fetch and display global summary
function fetchGlobalSummary() {
    document.getElementById("global-summary-text").innerHTML = "Fetching global data...";
    fetch("http://localhost:3000/api/global-summary")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch global summary data");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("global-summary-text").innerHTML = `
                <p>Total Controllers: ${data.totalControllers}</p>
                <p>Total Archivers: ${data.totalArchivers}</p>
            `;
        })
        .catch(error => {
            document.getElementById("global-summary-text").innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch and display region-specific summary
function fetchRegionSummary(regionName) {
    const summaryButton = document.getElementById(`${regionName}-summary`);
    summaryButton.innerHTML = "Loading...";
    fetch(`http://localhost:3000/api/regions/${regionName}/summary`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch summary for ${regionName}`);
            }
            return response.json();
        })
        .then(data => {
            summaryButton.innerHTML = `
                Controllers Online: ${data.controllersOnline}<br>
                Archivers Online: ${data.archiversOnline}
            `;
        })
        .catch(error => {
            summaryButton.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to fetch and display region-specific details
function fetchRegionData(regionName) {
    // Show loading message
    document.getElementById("controllers-list").innerHTML = "<p>Loading controllers...</p>";
    document.getElementById("archivers-list").innerHTML = "<p>Loading archivers...</p>";

    fetch(`http://localhost:3000/api/regions/${regionName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${regionName}`);
            }
            return response.json();
        })
        .then(data => {
            // Normalize and display data
            const normalizedData = {
                controllers: data.controllers.map(normalizeKeys),
                archivers: data.archivers.map(normalizeKeys),
            };
            updateDetails(normalizedData);
        })
        .catch(error => {
            document.getElementById("controllers-list").innerHTML = `<p>Error: ${error.message}</p>`;
            document.getElementById("archivers-list").innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Utility function to normalize object keys
function normalizeKeys(obj) {
    const normalizedObj = {};
    for (const key in obj) {
        const normalizedKey = key.trim().toLowerCase().replace(/\s+/g, '_');
        normalizedObj[normalizedKey] = obj[key];
    }
    return normalizedObj;
}

// Function to update controllers and archivers details
function updateDetails(data) {
    // Update controllers
    let controllersHTML = "<ul>";
    data.controllers.forEach(controller => {
        controllersHTML += `
            <li>
                <strong>Controller Name:</strong> ${controller.controllername || "N/A"}<br>
                <strong>IP Address:</strong> ${controller.ip_address_of_controller || "N/A"}<br>
                <strong>Status:</strong> <span class="status ${controller.status === 'Offline' ? 'offline' : ''}">${controller.status || "N/A"}</span>
            </li>`;
    });
    controllersHTML += "</ul>";
    document.getElementById("controllers-list").innerHTML = controllersHTML;

    // Update archivers
    let archiversHTML = "<ul>";
    data.archivers.forEach(archiver => {
        archiversHTML += `
            <li>
                <strong>Archiver Name:</strong> ${archiver.archiver_name || "N/A"}<br>
                <strong>IP Address:</strong> ${archiver.ip_address_of_archiver || "N/A"}<br>
                <strong>Status:</strong> <span class="status ${archiver.status === 'Offline' ? 'offline' : ''}">${archiver.status || "N/A"}</span>
            </li>`;
    });
    archiversHTML += "</ul>";
    document.getElementById("archivers-list").innerHTML = archiversHTML;
}

// Event listeners for region buttons
document.addEventListener("DOMContentLoaded", () => {
    // Fetch global summary on page load
    fetchGlobalSummary();

    // Region-specific details
    document.getElementById("APAC").addEventListener("click", () => fetchRegionData("APAC"));
    document.getElementById("EMEA").addEventListener("click", () => fetchRegionData("EMEA"));
    document.getElementById("LACA").addEventListener("click", () => fetchRegionData("LACA"));
    document.getElementById("NAMER").addEventListener("click", () => fetchRegionData("NAMER"));

    // Region-specific summaries
    document.getElementById("APAC-summary").addEventListener("click", () => fetchRegionSummary("APAC"));
    document.getElementById("EMEA-summary").addEventListener("click", () => fetchRegionSummary("EMEA"));
    document.getElementById("LACA-summary").addEventListener("click", () => fetchRegionSummary("LACA"));
    document.getElementById("NAMER-summary").addEventListener("click", () => fetchRegionSummary("NAMER"));
});
