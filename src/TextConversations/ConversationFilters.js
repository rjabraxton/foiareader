import React from "react";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ConversationSummary = (props) => {
  console.log(props);

  return (
    <Paper elevation={5} className="topBox">
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Sender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.sender}
          onChange={(e) => {
            props.setSender(e.target.value);
          }}
          label="Sender"
        >
          {props.people.map((person) => {
            if (!person) {
              return null;
            }
            return <MenuItem value={person.number}>{person.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ConversationSummary;
