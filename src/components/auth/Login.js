import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import style from "./style";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorOpen: false,
    errorMessage: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => {
        console.log(err);
        this.handleOpen(err);
      });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOpen = err => {
    this.setState({ errorOpen: true });
    this.setState({ errorMessage: err.message });
  };

  handleClose = () => {
    this.setState({ errorOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { errorOpen, errorMessage } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="raised" color="primary">
                Sign in
              </Button>
            </form>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={errorOpen}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">{errorMessage}</span>}
            />
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  classes: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

export default compose(
  withStyles(style),
  firebaseConnect(),
  connect()
)(Login);
