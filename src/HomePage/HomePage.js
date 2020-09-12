import React from "react";
import Grid from "@material-ui/core/Grid";

import "./HomePage.css";

import requests from "../conversations/requests.json";

const HomePage = (props) => {
  return (
    <Grid container spacing={3}>
      {Object.values(requests).map((request) => (
        <Grid item xs={4}>
          {request.fileName}
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
