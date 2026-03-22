const API_URL = "http://localhost:3003/api";

// Format seconds into human readable time
const formatTime = (seconds) => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${(seconds / 3600).toFixed(1)}h`;
};

// Load today's stats
const loadStats = async () => {
  try {
    const res = await fetch(`${API_URL}/report`);
    const data = await res.json();

    document.getElementById("score").textContent = `${data.productivityScore}%`;
    document.getElementById("productive").textContent = formatTime(data.summary.productive);
    document.getElementById("unproductive").textContent = formatTime(data.summary.unproductive);
    document.getElementById("neutral").textContent = formatTime(data.summary.neutral);
  } catch (err) {
    document.getElementById("score").textContent = "N/A";
    console.error(err);
  }
};

// Open dashboard in new tab
document.getElementById("dashboardBtn").addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:5173" });
});

loadStats();