import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ConversationSummary = (props) => {
  return (
    <Paper elevation={5} className="topBox">
      <Box
        display="flex"
        flexDirection="column"
        className="conversationFilters"
      >
        <FormControl variant="outlined" className="conversationFilter">
          <InputLabel id="sender">Sender</InputLabel>
          <Select
            labelId="sender"
            id="sender"
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

        <FormControl variant="outlined" className="conversationFilter">
          <InputLabel id="onlyShow">Only Show </InputLabel>
          <Select
            labelId="onlyShow"
            id="onlyShow"
            value={props.onlyShowFrom}
            onChange={(e) => {
              console.log(e.target.value);
              props.setOnlyShowFrom(e.target.value);
            }}
            label="Only Show"
            multiple
          >
            {props.people.map((person) => {
              if (!person) {
                return null;
              }
              return <MenuItem value={person.number}>{person.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default ConversationSummary;
