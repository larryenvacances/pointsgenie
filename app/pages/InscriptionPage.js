
import React, { Component } from "react";
import {Button} from "react-bootstrap";
import connectToStore from "flummox/connect";

import Inscription from "../components/Inscription";

class InscriptionPage extends Component {
  static displayName = "InscriptionPage";

  render() {
    const user = this.props.user || {};
    const promInscription = user.promInscription || {};
    return (
      <div className="inscription">
        <h3>Inscription</h3>
        <Inscription promInscription={promInscription} />
      </div>
    );
  }
};

const ConnectedInscription = connectToStore(InscriptionPage, {
  auth: store => ({
    user: store.getAuthenticatedUser(),
  })
});

export default ConnectedInscription;
