// 目标网页
let extensions = "https://blog.csdn.net/";
// 初始化状态
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ "extension-state": "OFF" });
});

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 获取当前标签页的存储状态(异步状态，所有要嵌套起来)
  chrome.storage.local.get("extension-state", (result) => {
    let state = result["extension-state"];
    // 当页面加载完成且是CSDN网址时
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith(extensions) && state === "ON") {
      // 设置图标的文字为ON
      chrome.action.setBadgeText({
        tabId: tabId,
        text: "ON"
      });
      // 注入CSS
      chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tabId }
      });
    } else {
      // 设置图标的文字为OFF
      chrome.action.setBadgeText({
        tabId: tabId,
        text: "OFF"
      });
    }
  });
});

// 监听点击事件
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions)) {
    // 获取当前状态
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // 设置状态
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    // 注入CSS
    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        files: ["focus-mode.css"],
        target: { tabId: tab.id },
      });
    }
    // 更新状态
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    // 保存状态
    chrome.storage.local.set({ "extension-state": nextState });
  }
});
