// Background service worker - tracks time spent on each tab

const API_URL = "http://localhost:3003/api/track";

let activeTab = null;
let startTime = null;

// Get today's date in YYYY-MM-DD format
const getToday = () => new Date().toISOString().split("T")[0];

// Extract hostname from URL
const getHostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
};

// Send time data to backend
const sendTimeData = async (domain, timeSpent) => {
  if (!domain || timeSpent < 1) return;
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain,
        timeSpent: Math.round(timeSpent),
        date: getToday(),
      }),
    });
  } catch (err) {
    console.error("Failed to send time data:", err);
  }
};

// Save time for current active tab
const saveCurrentTabTime = () => {
  if (activeTab && startTime) {
    const timeSpent = (Date.now() - startTime) / 1000;
    sendTimeData(activeTab, timeSpent);
  }
};

// Handle tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  saveCurrentTabTime();
  const tab = await chrome.tabs.get(activeInfo.tabId);
  activeTab = getHostname(tab.url);
  startTime = Date.now();
});

// Handle tab URL updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    saveCurrentTabTime();
    activeTab = getHostname(tab.url);
    startTime = Date.now();
  }
});

// Handle window focus change
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    saveCurrentTabTime();
    activeTab = null;
    startTime = null;
  } else {
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs[0]) {
        activeTab = getHostname(tabs[0].url);
        startTime = Date.now();
      }
    });
  }
});

// Send data every 30 seconds as a heartbeat
chrome.alarms.create("heartbeat", { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "heartbeat") {
    saveCurrentTabTime();
    if (activeTab) startTime = Date.now();
  }
});