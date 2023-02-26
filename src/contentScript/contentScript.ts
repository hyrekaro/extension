import { URL_TO_PLATFORM } from "../constants/URLToPlatformMapping"
import { jobApplyDomManipulationActions } from "../services/job.config"

export const contains = (selector: any, textIdentifier: any,) => {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element: { textContent: string; }) {
    return RegExp(textIdentifier).test(element.textContent);
  });
}


// Usage example
const findElement = ({ resolve, reject, }: { resolve: any, reject: any }, { selector = '', textIdentifier = '', nodeIndex = 0, fallBackSelector = '', fallBackTextIdentifier = "", delay }: any) => {
  let element: Element

  if (textIdentifier) {
    element = contains(selector, textIdentifier,)[nodeIndex]
  }
  else {
    element = document.querySelector(selector);

  }


  if (element) {
    setTimeout(() => {
      resolve(element);
    }, delay);
  }


}
function waitForElement({ selector = '', textIdentifier = '', fallBackSelector = '', fallBackTextIdentifier = '', nodeIndex = 0, delay = 0 }, { minDelay = 3000, maxDelay = 5000 } = {}) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    findElement({ resolve, reject }, { selector, textIdentifier, nodeIndex, fallBackSelector, fallBackTextIdentifier, delay })
    const observer = new MutationObserver((mutations) => {
      findElement({ resolve, reject }, { selector, textIdentifier, nodeIndex, fallBackSelector, fallBackTextIdentifier, delay })

    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}
const doAction = ({ action, element, value, focus = false }: {
  action: any,
  element: any,
  value: any,
  focus: any
}): void => {
  switch (action) {
    case 'click': {
      element.click()
      break
    }
    case 'setValue': {

      element.focus()
      element.value = value

      break
    }

  }

}
export const manipulateDOM = async (domAction: any, index: number) => {
  const { selector, textIdentifier, nodeIndex, action, value, focus, fallBackTextIdentifier, fallBackSelector, delay } = domAction
  const element = await waitForElement({ selector, nodeIndex, textIdentifier, fallBackTextIdentifier, fallBackSelector, delay }, { minDelay: (index + 1) * 500, maxDelay: (index + 1) * 1000 })

  doAction({ element, action, value, focus })




}
const applyJob = async () => {
  const url = window.location.href
  let platform = ""
  Object.entries(URL_TO_PLATFORM).forEach(([key, val]) => {
    if (url.includes(key)) platform = val
  })
  if (platform) {
    const actions = jobApplyDomManipulationActions as Record<string, any>
    await actions[platform].forEach(async (each: any, index: number) => {
      try {
        await manipulateDOM(each, index)
      }
      catch (err) {
      }
    })




  }
}

applyJob()



