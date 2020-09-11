import React from "react";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import requests from "./conversations/requests.json";
import Grid from "@material-ui/core/Grid";

const getAllTexters = (textLogs) => {
  let people = [];
  const keys = Object.keys(textLogs);
  for (let i = 0; i < keys.length; i++) {
    const allNumbers = keys[i].split(",");
    for (let j = 0; j < allNumbers.length; j++) {
      if (!people.includes(allNumbers[j])) people.push(allNumbers[j]);
    }
  }
  return people;
};

const ConversationPage = (props) => {
  const { id } = props.match.params;
  const texts = require(`./conversations/${requests[id]}`);

  return (
    <Grid container spacing={3}>
      <Grid item xs={9} s={6}>
        {/* <Paper elevation={12}> */}
        <Conversation texts={texts} />
        {/* </Paper> */}
      </Grid>
      <Grid item xs={3}>
        <Contacts people={getAllTexters(texts)} />
      </Grid>
    </Grid>
  );
};

export default ConversationPage;
