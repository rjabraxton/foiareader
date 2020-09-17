import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import HomeIcon from "@material-ui/icons/Home";

import ConversationPage from "./TextConversations/ConversationPage";
import HomePage from "./HomePage/HomePage";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       {/* <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "} */}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

export default function App() {
  return (
    <Router>
      <div>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6">
              <Link to="/">News</Link>
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <main>
          <div />
          <Container>
            <Switch>
              <Route path="/record/:id" component={ConversationPage} />
              <Route exact path="/" component={HomePage} />
            </Switch>
            <Box pt={4}>{/* <Copyright /> */}</Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}
