import React, { Component } from "react";
import UserDashboard from "../user/UserDashboard";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    const { auth, profile } = this.props;
    if (this.props.auth) {
      return <UserDashboard auth={auth} profile={profile} />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect((state, props) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
}))(Dashboard);
