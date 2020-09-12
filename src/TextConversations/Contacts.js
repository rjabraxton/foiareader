import React from "react";
import { getFullName } from "../utility.js";
import Paper from "@material-ui/core/Paper";

import "./Contacts.css";
import contactsJson from "../conversations/contacts.json";

const Contacts = (props) => {
  return props.people.map((person) => {
    const currentContact = contactsJson.contacts[person];
    if (!currentContact) return;

    return (
      <Paper className="personCard" elevation={3}>
        <div>
          {getFullName(person)} ({person})
        </div>
        <hr />
        <div>Role: {currentContact.role}</div>
        {currentContact.info && (
          <a href={currentContact.info}>Additional Info</a>
        )}
      </Paper>
    );
  });
};

export default Contacts;
