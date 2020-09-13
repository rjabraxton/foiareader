import React from "react";
import { getFullName } from "../utility.js";
import Paper from "@material-ui/core/Paper";

import "./Contacts.css";
import contactsJson from "../conversations/contacts.json";

const Contacts = (props) => {
  console.warn(props);
  return props.people.map((person) => {
    if (!person) return;

    return (
      <Paper className="personCard" elevation={3}>
        <div>
          {" "}
          {person.name} ({person.number}){" "}
        </div>
        <hr />
        <div>Role: {person.role}</div>
        {person.info && <a href={person.info}>Additional Info</a>}
      </Paper>
    );
  });
};

export default Contacts;
