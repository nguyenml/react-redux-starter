import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "../user/UserProfile";
import PropTypes from "prop-types";

class Profile extends Component {
  render() {
    const { auth, profile } = this.props;
    if (this.props.auth) {
      return <UserProfile auth={auth} profile={profile} />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
}))(Profile);
