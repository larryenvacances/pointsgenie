import React, { PropTypes } from "react";
import { Input } from "react-bootstrap";

import request from "../middlewares/request";

const Inscription = React.createClass({
  displayName: "Inscription",

  propTypes: {
    promInscription: PropTypes.object
  },

  getInitialState() {
    return {
      promInscription: this.props.promInscription,
    };
  },

  handleChange(event) {
    const inscription = this.state.promInscription;
    inscription[event.target.name] = event.target.value;
    this.setState({promInscription: inscription});
  },

  handleSubmit(event) {
    event.preventDefault();

    const body = {promInscription: this.state.promInscription};

    request.post("/users/me/promInscription", body, (err, res) => {
      let state = {};

      // TODO: Add user feedback on processing/error/success
      if (err) {
        state.alert = {style: "danger", message: "Erreur non-controlée: " + err.message};
      } else if (res.status === 200) {
        state.alert = {style: "success", message: "Changement effectué!"};
      } else {
        state.alert = {style: "danger", message: res.body.error};
      }
      this.setState(state);
    });
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Prénom:
          <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
        </label>
        <label>
          Nom:
          <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Sauvegarder" />
      </form>
    );
  },
});

export default Inscription;
