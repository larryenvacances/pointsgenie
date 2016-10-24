import React, { PropTypes } from "react";
import { Input, Button } from "react-bootstrap";

import request from "../middlewares/request";
import UserStore from "../stores/user";

const AdminAddUser = React.createClass({
  displayName: "AdminAddUser", 

  contextTypes : {
  	router: PropTypes.func
  },

  getInitialState() {
    return {};
  },

  onSubmit(e) {
  	e.preventDefault();
  	UserStore.addUser(this.state, (err, res) => {
  		if(!err) {
  			 this.setState({
  				messageEmail: `${this.state.cip} a été ajouté avec succès!`,
  				cip : null,
          name : null,
          email : null
  			});
  			return this.context.router.transitionTo("/adduser");
      } else { //TODO : Add Error Handling on /adduser
        const message = err ? err.message : err.response ? err.response.body : "Erreur dans l'envoi du formulaire";
        this.setState({
          isValid: false,
          message: message,
        });
      }
    });
  },

  onChange() {
  	let state = {
  		isValidCip: true,
      isValidName: true,
      isValidEmail: true,
      isValid: true,
  		messageCip: null,
      messageEmail: null,
      messageName: null
  	};
  	state.cip   = this.refs.cip.getValue();
    state.name  = this.refs.name.getValue();
    state.email = this.refs.email.getValue();

  	if (state.cip.match(/^$/)) {
      state.isValidCip = false;
    } else if  (!state.cip.match(/^[a-zA-Z]{4}[0-9]{4}$/)) {
  		state.isValidCip = false;
  		state.messageCip = state.isValid;
  	}

    if (state.name.match(/^$/)) {
      state.isValidName = false;
    } else if (!state.name.match(/^([A-Za-z]{2}[ éàëA-Za-z]*)$/)) {
      state.isValidName = false;
      state.messageName = "Le nom est invalide. Change de nom!"
    }

    if (state.email.match(/^$/)) {
      state.isValidEmail = true;
    } else if(!state.email.match(/^[a-z0-9_\.\-]+@usherbrooke.ca$/i)) {
      state.isValidEmail = false;
      state.messageEmail = "L'adresse courriel est invalide. Utilisez une adresse @usherbrooke.ca";
    }

    state.isValid = state.isValidCip && state.isValidName && state.isValidEmail;

  	this.setState(state);
  },

  renderSubmitButton() {
  	return (
  		<Button type="submit" disabled={!this.state.isValid || this.props.isSubmitting} bsStyle="success">
  			{ this.props.isSubmitting ? "En cours...": "Créer l'usager" }
  		</Button>
  	);
  },

	render() {
		const isValidCip = this.state.isValidCip;
    const isValidName = this.state.isValidName;
    const isValidEmail = this.state.isValidEmail;
		return(
			<div>
				<h3>Ajouter un usager</h3>
				<form className="form-horizontal" onSubmit={this.onSubmit}>
         	<Input type="text" label="Cip" ref="cip" onChange={this.onChange} value={this.state.cip}
           	labelClassName="col-md-3"  wrapperClassName="col-md-4" help={this.state.messageCip}
           	bsStyle={(isValidCip || !this.state.cip) ? null : "error" } />
          <Input type="text" label="Nom" ref="name" onChange={this.onChange} value={this.state.name}
            labelClassName="col-md-3"  wrapperClassName="col-md-4" help={this.state.messageName}
            bsStyle={(isValidName || !this.state.name) ? null : "error" } />
          <Input type="text" label="Email" ref="email" onChange={this.onChange} value={this.state.email}
            labelClassName="col-md-3" wrapperClassName="col-md-4" help={this.state.messageEmail}
            bsStyle={(isValidEmail || !this.state.email) ? null : "error" } />
         	{this.renderSubmitButton()}
        </form>
  		</div>
		);
	}
});

export default AdminAddUser;