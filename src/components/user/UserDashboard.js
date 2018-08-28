import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "./styles/styleDashboard";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.paperTextInput = React.createRef();
  }

  onClick = () => {
    const { firestore, auth } = this.props;

    const userUpdate = {
      paperText: this.paperTextInput.current.value
    };

    // Update in firestore
    firestore.update({ collection: "users", doc: auth.uid }, userUpdate);
  };

  render() {
    const { classes, profile, description } = this.props;
    if (profile.paperText && description) {
      console.log(description);
      return (
        <main className={classes.layout}>
          <Paper className={classes.root} elevation={1}>
            <TextField
              variant="display1"
              multiline
              className={classes.textField}
              defaultValue={profile.paperText}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput
                },
                inputRef: this.paperTextInput
              }}
            />
            <Button
              color="primary"
              className={classes.button}
              onClick={this.onClick}
            >
              Primary
            </Button>
          </Paper>
        </main>
      );
    } else {
      return <h1> Loading... </h1>;
    }
  }
}

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  firestoreConnect(({ auth }) => [
    {
      collection: "description",
      path: "/description",
      queryParams: [
        "orderByChild=uid",
        `equalTo=${auth.uid}`,
        `limitToFirst=1`
      ],
      storeAs: "description"
    }
    // 'todos#orderByChild=createdBy&equalTo=ASD123', // string notation
  ]),
  connect(({ firestore: { ordered } }) => ({
    description: ordered.description && ordered.description[0]
  }))
)(UserDashboard);
