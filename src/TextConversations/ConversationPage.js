import React from "react";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import ConversationSummary from "./ConversationSummary";
import ConversationFilters from "./ConversationFilters";
import contactsJson from "../conversations/contacts.json";
import Grid from "@material-ui/core/Grid";

import "./ConversationPage.css";
const requests = require("../conversations/requests.json");
let texts = undefined;

const getAllTexters = (textLogs) => {
  let people = [],
    usedNumbers = [];
  const keys = Object.keys(textLogs);
  for (let i = 0; i < keys.length; i++) {
    const allNumbers = keys[i].split(","); //every number in each convo

    for (let j = 0; j < allNumbers.length; j++) {
      //For every of those numbers
      if (
        !usedNumbers.includes(allNumbers[j]) &&
        contactsJson.contacts[allNumbers[j]]
      ) {
        //If the number hasn't been seen before
        people.push(contactsJson.contacts[allNumbers[j]]);
        usedNumbers.push(allNumbers[j]);
      }
    }
  }

  return people;
};

class ConversationPage extends React.Component {
  constructor(props) {
    super(props);
    const { id, currentSender, filters } = this.props.match.params;
    texts = require(`../conversations/${requests[id].fileName}/messages.json`);
    console.log(getAllTexters(texts));
    const initialFilters =
      getAllTexters(texts).filter(
        (a) => filters && filters.split(",").includes(a.number.toString())
      ) || [];

    this.state = {
      onlyShowFrom: initialFilters,
      sender:
        (currentSender && Number.parseInt(currentSender)) ||
        requests[id].defaultSender,
    };
  }

  setUrl = () => {
    const { id } = this.props.match.params,
      { sender, onlyShowFrom } = this.state;

    this.props.history.replace(
      `/record/${id}/${sender}${
        onlyShowFrom && "/" + onlyShowFrom.map((a) => a.number).join()
      }`
    );
  };

  render() {
    const { id } = this.props.match.params;
    const { sender, onlyShowFrom } = this.state;
    const info = requests[id];
    const initialSender = requests[id].defaultSender;

    const setSender = (val) => {
      this.setState({ sender: val }, this.setUrl);
    };
    const setOnlyShowFrom = (val) => {
      this.setState({ onlyShowFrom: val }, this.setUrl);
    };

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <ConversationSummary info={info} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <ConversationFilters
              people={getAllTexters(texts)}
              setSender={setSender}
              setOnlyShowFrom={setOnlyShowFrom}
              sender={sender || initialSender}
              onlyShowFrom={onlyShowFrom}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="conversationGrid">
          <Grid item xs={12} sm={9}>
            <Conversation
              texts={texts}
              info={info}
              sender={sender}
              onlyShowFrom={onlyShowFrom}
              imagePrefix={`/${requests[id].fileName}/`}
            />
          </Grid>
          <Grid item xs={false} sm={3} className="conversationContacts">
            <Contacts people={getAllTexters(texts)} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ConversationPage;
