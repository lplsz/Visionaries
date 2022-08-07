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

const HerfWidget = ({ src }) => {
  console.log('memem');
  console.log(src)
  return (
    <div style={{ marginLeft: '10px', marginRight: '10px', padding: '10px', padding: '10px', border: '1px black solid', borderRadius: '10px' }}>
      {src.link.map((s) => {
        return (<div style={{ display: 'flex', fontSize: '4pt', marginBottom: '10px' }}>
          <div style={{ color: 'black', flex: 1 }}>{s.text}</div>
          <div style={{ flex: 1 }}><a href={s.herf}>{s.herf}</a></div>
        </div>
        )
      })}
    </div>
  )
}

const HerfGuideWidget = ({ src }) => {
  console.log('memem');
  console.log(src)
  return (
    <div style={{ color: 'black', fontSize: '4pt' }}>
      {
        src.QAs.length !== 0 ?
          <div>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
              There are some answers from our site
            </div>
            <div style={{ marginLeft: '10px', marginRight: '10px', padding: '10px', padding: '10px', border: '1px black solid', borderRadius: '10px' }}>
              {src.QAs.map((s) => {
                return (<div style={{ display: 'flex', fontSize: '4pt', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>s</div>
                </div>
                )
              })}
            </div>
          </div>
          :
          <></>
      }
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        There are some answers we find form authority sites
      </div>
      <div style={{ marginLeft: '10px', marginRight: '10px', padding: '10px', padding: '10px', border: '1px black solid', borderRadius: '10px' }}>
        {src.link.map((s) => {
          return (<div style={{ display: 'flex', fontSize: '4pt', marginBottom: '10px' }}>
            <div style={{ color: 'black', flex: 1 }}>{s.text}</div>
            <div style={{ flex: 1 }}><a href={s.herf}>{s.herf}</a></div>
          </div>
          )
        })}
      </div>

    </div>

  )
}

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
    src: {},
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
    },
    {
      widgetName: "postform",
      widgetFunc: (props) => <PostForm {...props} />,
    },
    {
      widgetName: "herfWidget",
      widgetFunc: (props) => <HerfWidget {...props} />,
      mapStateToProps: ["src"]
    },
    {
      widgetName: "herfGuideWidget",
      widgetFunc: (props) => <HerfGuideWidget {...props} />,
      mapStateToProps: ["src"]
    }

  ]
};

export default config;