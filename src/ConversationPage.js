import React from "react";
import Conversation from "./Conversation";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const ConversationPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper>
          <Conversation />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>Who are these people</Paper>
      </Grid>
    </Grid>
  );
};

export default ConversationPage;
