import { URL_TO_PLATFORM } from "../constants/URLToPlatformMapping"
import { jobApplyDomManipulationActions } from "../services/job.config"

export const contains = (selector: any, textIdentifiers: string[]) => {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element: { textContent: string; }) {
    return textIdentifiers.some(identifier => {
      const regex = new RegExp(`\\b${identifier}\\b`, 'i'); // Match whole word
      return regex.test(element.textContent);
    });
  });
}

// Usage example
const findElement = ({ resolve, reject, }: { resolve: any, reject: any }, { controlNodeType = "", selector = '', textIdentifiers = '', nodeIndex = 0, fallBackSelector = '', fallBacktextIdentifiers = "", delay }: any) => {
  let element: any
  if (textIdentifiers) {
    element = contains(selector, textIdentifiers,)[nodeIndex]
  }
  // else if (controlNodeType?.length) {
  //   elements = document.querySelectorAll(selector) as unknown as any[];
  //   console.log({ elements, controlNodeType });

  //   elements = elements?.filter((element) => {
  //     if ([controlNodeType].includes(element?.control?.type))
  //       return true;
  //   });
  //   console.log({ yy: elements });

  // }
  else {
    element = document.querySelector(selector);

  }


  if (element) {
    setTimeout(() => {
      resolve(element);
    }, delay);
  }


}
function waitForElement({ controlNodeType = "", selector = '', textIdentifiers = '', fallBackSelector = '', fallBacktextIdentifiers = '', nodeIndex = 0, delay = 0 }, { minDelay = 5000, maxDelay = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    const delay = (Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay);


    findElement({ resolve, reject }, { controlNodeType, selector, textIdentifiers, nodeIndex, fallBackSelector, fallBacktextIdentifiers, delay })
    const observer = new MutationObserver((mutations) => {
      findElement({ resolve, reject }, { controlNodeType, selector, textIdentifiers, nodeIndex, fallBackSelector, fallBacktextIdentifiers, delay })

    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}
const doAction = ({ action, element, value }: {
  action: any,
  element: any,
  value: any,
  focus: any
}): void => {
  switch (action) {
    case 'click': {
      console.log({ action, element });

      element.click()
      break
    }
    case 'setValue': {
      console.log({ tag: element?.tagName });

      if (element?.tagName === "LABEL") {
        console.log({ control: element?.control, textContent: element?.textContent });

        element.control.focus();
        element.control.value = value

      }
      {
        element.focus()
        element.value = value
      }

      break
    }

  }

}
export const manipulateDOM = async (domAction: any, index: number) => {
  const { controlNodeType = [], selector, textIdentifiers, nodeIndex, action, value, focus, fallBacktextIdentifiers, fallBackSelector, delay, repeat = false } = domAction
  const element = await waitForElement({ controlNodeType, selector, nodeIndex, textIdentifiers, fallBacktextIdentifiers, fallBackSelector, delay }, { minDelay: (index + 1) * 500, maxDelay: (index + 1) * 1000 })
  if (repeat) {
    manipulateDOM(domAction, index);
  }
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



