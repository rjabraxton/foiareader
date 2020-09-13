import React from "react";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import ConversationSummary from "./ConversationSummary";
import ConversationFilters from "./ConversationFilters";
import requests from "../conversations/requests.json";
import contactsJson from "../conversations/contacts.json";
import Grid from "@material-ui/core/Grid";

import "./ConversationPage.css";

const getAllTexters = (textLogs) => {
  let people = [],
    usedNumbers = [];
  const keys = Object.keys(textLogs);

  for (let i = 0; i < keys.length; i++) {
    const allNumbers = keys[i].split(","); //every number in each convo

    for (let j = 0; j < allNumbers.length; j++) {
      //For every of those numbers
      if (!usedNumbers.includes(allNumbers[j])) {
        //If the number is present in the array
        people.push(contactsJson.contacts[allNumbers[j]]);
        usedNumbers.push(allNumbers[j]);
      }
    }
  }

  return people;
};

const ConversationPage = (props) => {
  const { id } = props.match.params;
  const texts = require(`../conversations/${requests[id].fileName}`);
  const info = requests[id];

  const [sender, setSender] = React.useState(info.defaultSender);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ConversationSummary info={info} />
        </Grid>
        <Grid item xs={3}>
          <ConversationFilters
            people={getAllTexters(texts)}
            setSender={setSender}
            sender={sender}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={9} s={6}>
          <Conversation texts={texts} info={info} sender={sender} />
        </Grid>
        <Grid item xs={3}>
          <Contacts people={getAllTexters(texts)} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ConversationPage;
