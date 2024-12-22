// Function to fetch global summary
const fetchGlobalSummary = async () => {
    // Summarize counts for archivers, controllers, cameras, and servers
    const summarize = (data) => {
        const total = data.length;
        const online = data.filter((row) => row.status === "Online").length;
        const offline = total - online;
        return { total, online, offline };
    };

    // Ping devices before summarizing their status
    const allDevices = [...allData.archivers, ...allData.controllers, ...allData.cameras, ...allData.servers];
    await pingDevices(allDevices);

    return {
        archivers: summarize(allData.archivers),
        controllers: summarize(allData.controllers),
        cameras: summarize(allData.cameras),
        servers: summarize(allData.servers),
    };
};

module.exports = { fetchRegionData, fetchGlobalSummary };
