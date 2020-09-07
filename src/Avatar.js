import React from "react";
// import "./Conversation.css";
import contacts from "./conversations/contacts.json";

const getName = (num) => {
  if (contacts[num]) {
    return contacts[num].abbr;
  } else {
    return num;
  }
};

let Avatar = (props) => {
  return <div className="avatar">{getName(props.number)}</div>;
};

export default Avatar;
