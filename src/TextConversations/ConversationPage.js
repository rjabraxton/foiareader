import React from "react";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import ConversationSummary from "./ConversationSummary";
import ConversationFilters from "./ConversationFilters";
import contactsJson from "../conversations/contacts.json";
import Grid from "@material-ui/core/Grid";

import "./ConversationPage.css";
const requests = require("../conversations/requests.json");

const getAllTexters = (textLogs) => {
  let people = [],
    usedNumbers = [];
  const keys = Object.keys(textLogs);

  for (let i = 0; i < keys.length; i++) {
    const allNumbers = keys[i].split(","); //every number in each convo

    for (let j = 0; j < allNumbers.length; j++) {
      //For every of those numbers
      if (!usedNumbers.includes(allNumbers[j])) {
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

    const requests2 = require("../conversations/requests.json");
    const texts = require(`../conversations/${
      requests[this.props.match.params.id].fileName
    }`);

    const initialFilters =
      getAllTexters(texts).filter(
        (a) =>
          this.props.match.params.filters &&
          this.props.match.params.filters
            .split(",")
            .includes(a.number.toString())
      ) || [];

    this.state = {
      onlyShowFrom: initialFilters,
      sender:
        (this.props.match.params.currentSender &&
          Number.parseInt(this.props.match.params.currentSender)) ||
        requests2[this.props.match.params.id].defaultSender,
    };
  }

  setUrl = () => {
    this.props.history.replace(
      `/record/${this.props.match.params.id}/${this.state.sender}${
        this.state.onlyShowFrom &&
        "/" + this.state.onlyShowFrom.map((a) => a.number).join()
      }`
    );
  };

  render() {
    const { id } = this.props.match.params;
    const texts = require(`../conversations/${requests[id].fileName}`);
    const info = requests[id];
    const initialSender = requests[this.props.match.params.id].defaultSender;

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
              sender={this.state.sender || initialSender}
              onlyShowFrom={this.state.onlyShowFrom}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className="conversationGrid">
          <Grid item xs={12} sm={10} md={7}>
            <Conversation
              texts={texts}
              info={info}
              sender={this.state.sender}
              onlyShowFrom={this.state.onlyShowFrom}
            />
          </Grid>
          <Grid item xs={false} sm={2} md={3} className="conversationContacts">
            <Contacts people={getAllTexters(texts)} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ConversationPage;
