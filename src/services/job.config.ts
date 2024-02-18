export const jobApplyDomManipulationActions = {
  "wellfound": [

    {
      selector: ".styles_jobLink__US40J",
      action: 'click'
    },

    {
      selector: "[data-test='Button']",
      textIdentifiers: ['Apply'],
      action: 'click'
    },
    {
      selector: "#form-input--userNote",
      action: 'setValue',
      value: `Dear Recruiter,
    I hope this message finds you well.
    Upon coming across this job profile, I am excited to express my interest as I believe my skill set aligns well with the requirements of the role. With almost 2 years of experience in this field, I am confident in my ability to contribute effectively to your team.
    I eagerly anticipate your response and the opportunity to further discuss how my background and expertise make me a strong candidate for this position.
    
    Thank you for considering my application.
    
    Best regards,
    Sanjit Sarkar`,
    },
    {
      selector: "[data-test='JobApplicationModal--SubmitButton']",
      fallBackSelector: "c",
      fallBacktextIdentifiers: ["Sent"],
      action: 'click',

    },
    {
      selector: "[data-test='closeButton']",
      action: 'click',

    }
  ],
  "instahyre": [
    {
      selector: "#interested-btn",
      textIdentifiers: ['View »'],
      action: 'click'
    },
    {
      selector: ".btn.btn-lg.btn-primary.new-btn",
      textIdentifiers: ['Apply'],
      action: 'click',
      repeat: true

    },
  ],
  "naukri": [
    {
      selector: "button#apply-button",
      action: 'click',
    },
    {
      selector: "article.jobTuple",
      action: 'click',

    },
  ],
  "linkedin": [
    {
      selector: ".artdeco-button__text",
      textIdentifiers: ['Easy Apply'],
      action: 'click'
    },
    {
      selector: ".artdeco-button__text",
      textIdentifiers: ['Next'],
      action: 'click',

    },
    {
      selector: ".artdeco-button__text",
      textIdentifiers: ['Next'],
      action: 'click',

    },
    // {
    //   selector: "label",
    //   controlNodeType: ["number", "text"],
    //   value: 2,
    //   action: 'setValue',

    // },
    {
      selector: "label",
      textIdentifiers: ["Expected"],
      value: 12,
      action: 'setValue',

    },
    {
      selector: "label",
      textIdentifiers: ["Current"],
      value: 20,
      action: 'setValue',

    },
  ]
}