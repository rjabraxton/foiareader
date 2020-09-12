import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./HomePage.css";

import requests from "../conversations/requests.json";

const HomePage = (props) => {
  return (
    <Grid container spacing={3}>
      {Object.keys(requests).map((key) => {
        const currentRequest = requests[key];
        return (
          <Grid item xs={4}>
            <Card variant="outlined" className="foiaRequestCard">
              {currentRequest.description}
              <br />
              <Link to={`record/${key}`}>View this request</Link>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HomePage;
