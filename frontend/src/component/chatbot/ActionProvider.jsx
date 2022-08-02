class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleMeeting = () => {
    const message = this.createChatBotMessage(
      "Do you want to book a meeting?",
      {
        widget: "optionsmeeting"
      }
    );
    this.setChatbotMessage(message);
  };
  handleMeetingTure = () => {
    const message = this.createChatBotMessage(
      "Which field to you wank to have meeting?",
      {
        widget: "optionsmeetingfield"
      }
    );
    this.setChatbotMessage(message);
  }

  handleQuestion = (text) => {
    const send = { state: 1, text: text };
    const message = this.createChatBotMessage(
      "Sure! Which type of information you would like to get?",
      {
        widget: "optionsquestion"
      }
    );
    this.setChatbotMessage(message);
  };
  handleVideos = () => {
    const send = { state: 2, text: 'video' };
    const message = this.createChatBotMessage(
      `Ok, heres are some video link you can have a look relate to your question
             `,
    );
    this.setChatbotMessage(message);

    const message2 = this.createChatBotMessage(
      "If You Get COVID 19: Optimize Immune System (Vitamin D, Monoclonal Antibodies, NAC, Quercetin etc.): https://www.youtube.com/watch?v=vN30emwcNS4"
    )
    const message3 = this.createChatBotMessage(
      "What To Do If I Have Covid 19? Treatment and Recovery at Home: https://www.youtube.com/watch?v=WpfOC2oWPAA"
    )
    const message4 = this.createChatBotMessage(
      "5 things NOT TO DO after getting the COVID-19 vaccine: https://www.youtube.com/watch?v=o2HLkFi4Qtw"
    )
    const message5 = this.createChatBotMessage(
      "What to do if I have COVID? Treatment & Recovery at Home ~ 2022 UPDATE: https://www.youtube.com/watch?v=n9kzHM_0jxk"
    )
    const message6 = this.createChatBotMessage(
      "COVID-19: From Exposure to Feeling Better: https://www.youtube.com/watch?v=9Zfqfv2uDsI"
    )
    const message7 = this.createChatBotMessage(
      "Do you satisfied with this result or do want want to see some related questions?",
      {
        widget: "optionsquestionvideo"
      }
    );
    this.setChatbotMessage(message2);
    this.setChatbotMessage(message3);
    this.setChatbotMessage(message4);
    this.setChatbotMessage(message5);
    this.setChatbotMessage(message6);
    this.setChatbotMessage(message7);
  };
  handleGuides = () => {
    const send = { state: 2, text: 'guide' };
    const message = this.createChatBotMessage(
      "Ok, heres are some guide link you can have a look relate to your question",
    );
    this.setChatbotMessage(message);
    const message3 = this.createChatBotMessage(
      "If you have COVID-19: https://www.health.gov.au/health-alerts/covid-19/testing-positive?"
    )
    const message4 = this.createChatBotMessage(
      "10 ways to take care of yourself during coronavirus: https://au.reachout.com/articles/10-ways-to-take-care-of-yourself-during-coronavirus"
    )
    const message5 = this.createChatBotMessage(
      "Coronavirus disease (COVID-19) pandemic https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
    )
    const message6 = this.createChatBotMessage(
      "Do I need a covid-19 vaccine booster : http://localhost:3000/QACategory/"
    )
    this.setChatbotMessage(message3);
    this.setChatbotMessage(message4);
    this.setChatbotMessage(message5);
    this.setChatbotMessage(message6);
    const message2 = this.createChatBotMessage(
      "Do you still have some questions relate to this topic? You can post an question on our website or see some related questions.",
      {
        widget: "optionsquestionguide"
      }
    );
    this.setChatbotMessage(message2);
  };
  handleRelate = () => {
    const send = { state: 3, text: 'relate' };
    const message = this.createChatBotMessage(
      "Here are several related questions, you can ask me by sending me message",
    );
    const message2 = this.createChatBotMessage(
      "How long do people test positive for COVID-19?"
    )
    const message3 = this.createChatBotMessage(
      "What do you do if you test positive for COVID-19?"
    )
    const message4 = this.createChatBotMessage(
      "Can you get COVID-19 more than once?"
    )
    const message5 = this.createChatBotMessage(
      "What are some of the long term effects of COVID-19?"
    )
    this.setChatbotMessage(message);
    this.setChatbotMessage(message2);
    this.setChatbotMessage(message3);
    this.setChatbotMessage(message4);
    this.setChatbotMessage(message5);
  };
  handlePost = () => {
    const message = this.createChatBotMessage(
      "Okay, please fill in the form",
      { widget: "postform" }
    );
    this.setChatbotMessage(message);
  };
  handleSqlQuiz = () => {
    const message = this.createChatBotMessage("Sure! Here's your SQL QUIZ !", {
      widget: "sql"
    });
    this.setChatbotMessage(message);
  };
  handleContinue = () => {
    const message = this.createChatBotMessage(
      "Which quiz you want to try again?",
      {
        widget: "options"
      }
    );
    this.setChatbotMessage(message);
  };
  handleUnknown = () => {
    const message = this.createChatBotMessage(
      "Please type continue to try again"
    );
    this.setChatbotMessage(message);
  };


  handleMeetingMentalHealth = () => {
    const message = this.createChatBotMessage(
      "You can find some doctors to meet with by click the following link",
      {
        widget: "meetingmentalhealth"
      }
    );
    this.setChatbotMessage(message);
  };
  handleMeetingCovid19 = () => {
    const message = this.createChatBotMessage(
      {
        widget: "meetingmentalhealth"
      }
    );
    this.setChatbotMessage(message);
  };
  handleMeetingStayingAtHome = () => {
    const message = this.createChatBotMessage(
      "You can find some doctors to meet with by click the following link at home",
      {
        widget: "meetingmentalhealth"
      }
    );
    this.setChatbotMessage(message);
  };
  handleMeetingCareerAdvice = () => {
    const message = this.createChatBotMessage(
      "You can find some doctors to meet with by click the following link advice",
      {
        widget: "meetingmentalhealth"
      }
    );
    this.setChatbotMessage(message);
  };
  handleMeetingVaccation = () => {
    const message = this.createChatBotMessage(
      "You can find some doctors to meet with by click the following link vaccation",
      {
        widget: "meetingmentalhealth"
      }
    );
    this.setChatbotMessage(message);
  };

  handleGreeting = () => {
    const message = this.createChatBotMessage(
      "Thanks for trying Wellbeing Bot! We hope you had a great experience"
    );
    this.setChatbotMessage(message);
  };
  messageHandler = () => {
    const message = this.createChatBotMessage(
      "Hello, ask me anything",
      {
        widget: "options"
      }
    );
    this.setChatbotMessage(message);
  };
  handleCancle = () => {
    const message = this.createChatBotMessage(
      "Thanks for trying! Feel free to ask anything!"
    );
    this.setChatbotMessage(message);
  };
  handleSorry = () => {
    const message = this.createChatBotMessage(
      "I am sorry that I do not find those infromations you want :( . You can ask a new questions or ask your previous questions more detailed."
    );
    this.setChatbotMessage(message);
  };
  setChatbotMessage = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages]
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages]
      }));
    }
  };
}
export default ActionProvider;
