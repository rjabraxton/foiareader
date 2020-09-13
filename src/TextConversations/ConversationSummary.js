import React from "react";
import Paper from "@material-ui/core/Paper";

const ConversationSummary = (props) => {
  return (
    <Paper elevation={5} className="topBox">
      <div>{props.info.description}</div>
      <hr />
      <div>Requested by: {props.info.requestedBy}</div>
    </Paper>
  );
};

export default ConversationSummary;
