import React from "react";
import Paper from "@material-ui/core/Paper";

import "./Contacts.css";

const Contacts = (props) => {
  return props.people.map((person) => {
    if (!person) {
      return null;
    }

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
