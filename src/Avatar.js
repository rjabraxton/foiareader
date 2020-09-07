import React from "react";
// import "./Conversation.css";
import { contacts } from "./conversations/contacts.json";

export const getName = (num) => {
  if (contacts[num]) {
    return contacts[num].abbr;
  } else {
    return num;
  }
};

export const getFullName = (num) => {
  if (contacts[num]) {
    return contacts[num].name === "Unknown"
      ? contacts[num].abbr
      : contacts[num].name;
  } else {
    return num;
  }
};

export const Avatar = (props) => {
  return <div className="avatar">{getName(props.number)}</div>;
};
