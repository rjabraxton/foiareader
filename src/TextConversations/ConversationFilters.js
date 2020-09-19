import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";

const ConversationSummary = (props) => {
  const getNames = (phoneNums) => {
    let names = [];
    for (let i = 0; i < phoneNums.length; i++) {
      const current = phoneNums[i];
      const a = props.people.find(
        (person) => person && person.number === current
      );
      names.push(a.name);
    }
    return names.join(", ");
  };

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
          <InputLabel id="onlyShow">Filter Conversations </InputLabel>
          <Select
            labelId="onlyShow"
            id="onlyShow"
            value={props.onlyShowFrom}
            onChange={(e) => {
              props.setOnlyShowFrom(e.target.value);
            }}
            label="Filter Conversations"
            multiple
            renderValue={(selected) => getNames(selected)}
          >
            {props.people.map((person) => {
              if (!person) {
                return null;
              }
              // return <MenuItem value={person.number}>{person.name}</MenuItem>;
              return (
                <MenuItem key={person.name} value={person.number}>
                  {/* <Checkbox
                    checked={props.onlyShowFrom.indexOf(person.name) > -1}
                  /> */}
                  {person.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {props.onlyShowFrom.length > 0 && (
          <Button
            color="primary"
            onClick={() => {
              props.setOnlyShowFrom([]);
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ConversationSummary;
