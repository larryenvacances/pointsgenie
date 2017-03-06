import React from "react";

import Promocard from "../components/Promocard";
import Jonc from "../components/Jonc";
import GeneralInfo from "../components/GeneralInfo";
import PasswordChange from "../components/PasswordChange";
import connectToStore from "flummox/connect";

const ProfilePage = React.createClass({
  displayName: "ProfilePage",

  render() {
    const user = this.props.user || {};
    return (
      <div className="user-info">
        <h3>Profil</h3>
        <GeneralInfo infos={user} />
        <Promocard promocard={user.promocard} />
        <Jonc ringSize={user.ringSize} />
      </div>
    );
  },
});

const ConnectedProfile = connectToStore(ProfilePage, {
  auth: store => ({
    user: store.getAuthenticatedUser(),
  })
});

export default ConnectedProfile;
