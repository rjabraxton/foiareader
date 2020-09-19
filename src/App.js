import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import ConversationPage from "./TextConversations/ConversationPage";
import HomePage from "./HomePage/HomePage";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: "10px",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    paddingRight: "20px",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Router>
        <CssBaseline />
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <RouterLink color="textPrimary" to="/" className={classes.link}>
                Portland Records Reader
              </RouterLink>
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Switch>
            <Route path="/record/:id" component={ConversationPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
          <Box pt={4}>{/* <Copyright /> */}</Box>
        </Container>
      </Router>
    </React.Fragment>
  );
}
