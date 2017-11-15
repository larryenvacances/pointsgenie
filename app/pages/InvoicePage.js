
import React, { Component } from "react";
import connectToStore from "flummox/connect";

import Invoice from "../components/Invoice";

class InvoicePage extends Component {
  static displayName = "InvoicePage";

  render() {
    const user = this.props.user || {};

    return (
      <div className="inscription">
        <h3>Facture</h3>
        <Invoice user={user} />
      </div>
    );
  }
};

const ConnectedInvoice = connectToStore(InvoicePage, {
  auth: store => ({
    user: store.getAuthenticatedUser(),
  })
});

export default ConnectedInvoice;
