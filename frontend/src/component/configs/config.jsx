import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import BotAvatar from "../BotAvatar/BotAvatar";
import Options from "../Options/Options";
import OptionsMeeting from "../Options/OptionsMeeting";
import OptionsMeetingTure from "../Options/OptionsMeetingTure";
import OptionsQuestion from "../Options/OptionsQuestion";
import UserAvatar from "../UserAvatar/UserAvatar";
import MyLinks from "../Link/MyLinks.jsx"
import OptionsQuestionVideo from "../Options/OptionsQuestionVideo";
import OptionsQuestionGuide from "../Options/OptionsQuestionGuide";
import PostForm from "../PostForm"
import { padding } from "@mui/system";

const config = {
  botName: "Wellbing Bot",
  initialMessages: [
    createChatBotMessage(`Hi. I'm here to help you, please ask any you want to know`)
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5F6769"
    },
    chatButton: {
      backgroundColor: "white"
    }
  },

  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: "black",
          padding: "10px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          display: "flex",
          fontSize: "0.85rem",
          paddingLeft: "12.5px",
          fontWeight: "700",

          alignItems: "center",
          fontSize: '20px',
          color: "white"
        }}
      >
        Wellbing BOT
      </div>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
  },

  state: {
    linux: [],
    sql: [],
    docker: []
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />
    },
    {
      widgetName: "linux",
      widgetFunc: (props) => <div {...props} > linux</div>,
      props: {
        course: "Linux"
      }
    },
    {
      widgetName: "optionsquestion",
      widgetFunc: (props) => <OptionsQuestion {...props} />,

    },
    {
      widgetName: "optionsquestionvideo",
      widgetFunc: (props) => <OptionsQuestionVideo {...props} />,
    },
    {
      widgetName: "optionsquestionguide",
      widgetFunc: (props) => <OptionsQuestionGuide {...props} />,
    },
    {
      widgetName: "optionsmeeting",
      widgetFunc: (props) => <OptionsMeeting {...props} />,

    },
    {
      widgetName: "optionsmeetingfield",
      widgetFunc: (props) => <OptionsMeetingTure  {...props} />,
    },
    {
      widgetName: "meetingmentalhealth",
      widgetFunc: (props) => <MyLinks {...props} />,
      props: {
        url: './find_expert'
      }
    }, {
      widgetName: "postform",
      widgetFunc: (props) => <PostForm {...props} />,
    }
  ]
};

export default config;