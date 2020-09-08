import React from "react";
import { getAbbrName } from "./utility";
// import "./Conversation.css";

export const Avatar = (props) => {
  return <div className="avatar">{getAbbrName(props.number)}</div>;
};
