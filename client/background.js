chrome.action.onClicked.addListener((tab) => {
  // showReadme();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["script.js"],
  });
});
