import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import classnames from "classnames";
import defaultImage from "./img_avatar3.png";

class UserProfile extends Component {
  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <img
                className="card-img-top"
                src={defaultImage}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
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
