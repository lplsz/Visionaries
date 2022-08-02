import React, { useState } from 'react';
import Chatbot from "react-chatbot-kit";
import './WellBeingBot.css'
import config from "./configs/config.jsx";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

const WellBeingBot = () => {
  const [search, setSearch] = useState('');
  return (
    <div >
      <div style={{ width: '400px' }}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div >

  );
}
export default WellBeingBot;