import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const ConversationFilters = (props) => {
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
            {props.people.map((person, i) => {
              if (!person) {
                return null;
              }
              return (
                <MenuItem key={`person${i}`} value={person.number}>
                  {person.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className="conversationFilter">
          <Autocomplete
            multiple
            limitTags={2}
            id="onlyShow"
            options={props.people}
            getOptionLabel={(option) => (option ? option.name : "")}
            defaultValue={props.onlyShowFrom}
            onChange={(e, newVal) => {
              props.setOnlyShowFrom(newVal);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Filter Conversations"
                name="Filter Conversations"
              />
            )}
          />
        </FormControl>
      </Box>
    </Paper>
  );
};

export default ConversationFilters;
