import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";

import "./HomePage.css";

import requests from "../conversations/requests.json";

const sortRequests = (reqs) => {
  for (let i = 0; i < Object.values(reqs).length; i++) {
    const current = Object.values(reqs)[i];
  }
};

const HomePage = (props) => {
  return (
    <Container>
      <h2>Texts from/about Mayor Wheeler</h2>
      <hr />
      <Grid container spacing={3}>
        {requests
          .filter((item) => item.category === "Wheeler")
          .map((req, i) => {
            const currentRequest = req;
            return (
              <Grid item xs={6} s={4}>
                <Card variant="outlined" className="foiaRequestCard">
                  {currentRequest.description}
                  <br />
                  <Link to={`record/${i}`}>View this request</Link>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <h2>Texts relating to the Portland Police Bureau</h2>
      <hr />
      <Grid container spacing={3}>
        {requests
          .filter((item) => item.category === "PPB")
          .map((req, i) => {
            const currentRequest = req;
            return (
              <Grid item xs={6} s={4}>
                <Card variant="outlined" className="foiaRequestCard">
                  {currentRequest.description}
                  <br />
                  <Link to={`record/${i}`}>View this request</Link>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default HomePage;
