import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import classnames from "classnames";
import defaultImage from "./img_avatar3.png";

class UserProfile extends Component {
  state = {
    username: ""
  };
  constructor(props) {
    super(props);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // Update balance
  balanceSubmit = e => {
    e.preventDefault();

    const { user, firestore } = this.props;
    const { username } = this.state;

    const userUpdate = {
      username: username
    };

    // Update in firestore
    firestore.update({ collection: "users", doc: user.id }, userUpdate);
  };

  render() {
    const { user } = this.props;
    const { username } = this.state;

    if (user) {
      return (
        <div className="row">
          <div className="col-sm-3">
            <div className="card">
              <img
                className="card-img-top"
                src={defaultImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <form onSubmit={this.balanceSubmit}>
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
        </div>
      );
    } else {
      return <h1> Loading... </h1>;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "users", storeAs: "user", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    user: ordered.user && ordered.user[0]
  }))
)(UserProfile);
