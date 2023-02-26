export const jobApplyDomManipulationActions = {
  "angelist": [{
    selector: "[data-test='Button']",
    textIdentifier: 'Apply',
    action: 'click'
  },
  {
    selector: "#form-input--userNote",
    action: 'setValue',
    value: `Hello,
  I hope you are doing well.
  I have come across this job post on angel.co and I have the skills mentioned in this job description. I believe I may be a perfect fit for this job role.
  I'm looking forward to hearing back from you`,
  },
  {
    selector: "[data-test='JobApplicationModal--SubmitButton']",
    fallBackSelector: "c",
    fallBackTextIdentifier: "Sent",
    action: 'click',

  }
  ]
}