import { apiCall } from '../../Main';

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
    apiCall('/chatbot', 'POST', { state: 1, input_text: text })
    const message = this.createChatBotMessage(
      "Sure! Which type of information you would like to get?",
      {
        widget: "optionsquestion"
      }
    );
    this.setChatbotMessage(message);
  };
  handleVideos = async () => {
    const send = await apiCall('/chatbot', 'POST', { state: 2, input_text: 'video' })
    console.log(send);
    const message = this.createChatBotMessage(
      `Ok, heres are some video link you can have a look relate to your question
             `,
    );
    this.setChatbotMessage(message);
    send.map((s) => {
      const message2 = this.createChatBotMessage(s)
      this.setChatbotMessage(message2);
    })

    const message7 = this.createChatBotMessage(
      "Do you satisfied with this result or do want want to see some related questions?",
      {
        widget: "optionsquestionvideo"
      }
    );
    this.setChatbotMessage(message7);
  };
  handleGuides = async () => {
    const send = await apiCall('/chatbot', 'POST', { state: 2, input_text: 'guide' })
    console.log(send);
    send.map((s) => {
      const message2 = this.createChatBotMessage(s)
      this.setChatbotMessage(message2);
    })
    const message3 = this.createChatBotMessage(
      "Do you still have some questions relate to this topic? You can post an question on our website or see some related questions.",
      {
        widget: "optionsquestionguide"
      }
    );
    this.setChatbotMessage(message3);
  };
  handleRelate = async () => {
    const send = await apiCall('/chatbot', 'POST', { state: 3, input_text: 'relate' })
    console.log(send);
    const message = this.createChatBotMessage(
      "Here are several related questions, you can ask me by sending me message",
    );
    this.setChatbotMessage(message);
    send.map((s) => {
      const message2 = this.createChatBotMessage(s)
      this.setChatbotMessage(message2);
    })


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
