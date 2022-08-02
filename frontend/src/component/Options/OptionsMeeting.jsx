import React from "react";
import './Options.css';
function OptionsMeeting(props) {
  const data = [
    {
      text: "Yes, sure",
      handler: props.actionProvider.handleMeetingTure,
      id: 1
    },
    {
      text: "No I want to find some solutions",
      handler: props.actionProvider.handleCancle,
      id: 2
    }
  ];
  const optionsList = data.map((option) => (
    <button class='optionButton' key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));
  return (
    <div style={{ marginLeft: '30px' }}>
      <p>{optionsList}</p>
    </div>
  );
}
export default OptionsMeeting;
