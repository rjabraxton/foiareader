import React from "react";
import { getFullName } from "./utility.js";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";

import "./Contacts.css";
import contactsJson from "./conversations/contacts.json";

const Contacts = (props) => {
  return props.people.map((person) => {
    const currentContact = contactsJson.contacts[person];
    if (!currentContact) return;

    return (
      <Paper className="personCard" elevation={3}>
        <div>
          {person} - {getFullName(person)}
        </div>
        <hr />
        <div>Role: {currentContact.role}</div>
      </Paper>
    );
  });
};

export default Contacts;
