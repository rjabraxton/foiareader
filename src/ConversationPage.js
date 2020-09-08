import React from "react";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import Paper from "@material-ui/core/Paper";
import testFile from "./conversations/student-2.json";
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

const ConversationPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {/* <Paper elevation={12}> */}
        <Conversation texts={testFile} />
        {/* </Paper> */}
      </Grid>
      <Grid item xs={3}>
        <Contacts people={getAllTexters(testFile)} />
      </Grid>
    </Grid>
  );
};

export default ConversationPage;
