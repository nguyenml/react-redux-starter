import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import defaultImage from "./img_avatar3.png";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "./styles";
import TextField from "@material-ui/core/TextField";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.paperTextInput = React.createRef();
    this.descTextInput = React.createRef();
  }

  state = {
    username: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Update username
  userNameSubmit = e => {
    e.preventDefault();

    const { firestore, auth } = this.props;
    const { username } = this.state;

    const userUpdate = {
      username: username
    };

    // Update in firestore
    firestore.update({ collection: "users", doc: auth.uid }, userUpdate);
  };

  //update paperText
  paperOnClick = () => {
    const { firestore, auth } = this.props;

    const userUpdate = {
      paperText: this.paperTextInput.current.value
    };

    // Update in firestore
    firestore.update({ collection: "users", doc: auth.uid }, userUpdate);
  };

  descOnClick = () => {
    const { firestore, auth } = this.props;

    const newDesc = {
      text: this.descTextInput.current.value,
      uid: auth.id
    };

    firestore.add({ collection: "description" }, newDesc);
  };

  render() {
    const { classes, description, profile } = this.props;
    if (description && profile.paperText) {
      return (
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <img className="card-img-top" src={defaultImage} alt="" />
              <div className="card-body">
                <h5 className="card-title">{profile.username}</h5>
                <form onSubmit={this.userNameSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Change Username"
                      onChange={this.onChange}
                    />
                    <div className="input-group-append">
                      <input
                        type="submit"
                        value="Update"
                        className="btn btn-outline-dark"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {" "}
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="container col-sm-9">
            <div className={classes.layout}>
              <Paper className={classes.root} elevation={1}>
                <TextField
                  label="description"
                  variant="display1"
                  multiline
                  className={classes.textField}
                  defaultValue={description.text}
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput
                    },
                    inputRef: this.descTextInput
                  }}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.descOnClick}
                >
                  Primary
                </Button>
              </Paper>
            </div>
            <main className={classes.layout}>
              <Paper className={classes.root} elevation={1}>
                <TextField
                  label="paperText"
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
                  onClick={this.paperOnClick}
                >
                  Primary
                </Button>
              </Paper>
            </main>
          </div>
        </div>
      );
    } else {
      return <h1> Loading... </h1>;
    }
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.object
};

export default compose(
  withStyles(styles),
  firestoreConnect(({ auth }) => [
    {
      collection: "description",
      where: [["uid", "==", `${auth.uid}`]],
      storeAs: "description"
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    description: ordered.description && ordered.description[0]
  }))
)(UserProfile);
