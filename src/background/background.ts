
import { URL_TO_PLATFORM } from "../constants/URLToPlatformMapping"

export const handleExecuteScript = (tab: chrome.tabs.Tab, changeInfo: chrome.tabs.TabChangeInfo,) => {
    Object.entries(URL_TO_PLATFORM).forEach(([key, value], index) => {
        if (tab && tab?.url.includes(key) && changeInfo.status === "complete") {

            chrome.scripting.executeScript(
                {

                    target: { tabId: tab?.id, },
                    files: ["contentScript.js"],
                }
            )
        }
    })

}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    handleExecuteScript(tab, changeInfo)
})

