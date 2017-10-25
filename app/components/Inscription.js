import React, { PropTypes } from "react";
import { Input, Button, Alert } from "react-bootstrap";
import _ from "lodash";

import request from "../middlewares/request";

const Inscription = React.createClass({
  displayName: "Inscription",

  propTypes: {
    promInscription: PropTypes.object,
  },

  getInitialState() {
    return {
      promInscription: this.props.promInscription
    };
  },

  handleChange(event) {
    const inscription = this.state.promInscription;
    _.set(inscription, event.target.name, event.target.type === "checkbox" ? event.target.checked : event.target.value);
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

  renderInscriptionFields: function() {
    let options = ["", "Mécanique", "Chimique", "Biotech", "Électrique", "Informatique", "Civil"],
    makeOption = function(option) {
      return <option key={options.indexOf(option)}>{option}</option>;
    };
    return(
      <div>
        <Input ref="phoneNumberInput" type="text" label="Numéro de téléphone" labelClassName="col-sm-3" 
        wrapperClassName="col-sm-6" onChange={this.handleChange} name="phoneNumber" value={this.state.promInscription.phoneNumber} />
        <Input ref="concentrationSelect" type="select" label="Concentration" labelClassName="col-sm-3" 
        wrapperClassName="col-sm-6" onChange={this.handleChange} name="concentration" value={this.state.promInscription.concentration}>
            {options.map(makeOption)}
        </Input>
        <Input ref="allergiesInput" type="text" label="Allergies" labelClassName="col-sm-3" 
          wrapperClassName="col-sm-6" onChange={this.handleChange} name="allergy" value={this.state.promInscription.allergy} />
      </div>  
    );
  },

  renderContactUrgence: function() {
    return(
      <div className="col-sm-12 form-inline">
        <Input ref="allergiesInput" type="text" label="Nom" labelClassName="col-sm-2" 
          wrapperClassName="col-sm-1" name="emergencyContact.name" onChange={this.handleChange} value={this.state.promInscription.emergencyContact.name} />
        <Input ref="allergiesInput" type="text" label="Tel" labelClassName="col-sm-2" 
          wrapperClassName="col-sm-1" name="emergencyContact.phoneNumber" onChange={this.handleChange} value={this.state.promInscription.emergencyContact.phoneNumber} />
        <Input ref="allergiesInput" type="text" label="Courriel" labelClassName="col-sm-3" 
          wrapperClassName="col-sm-3" name="emergencyContact.email" onChange={this.handleChange} value={this.state.promInscription.emergencyContact.email} />
      </div>
    );
  },

  renderActivityFields: function() {
    let options = ["", "Double", "Triple", "Quadruple"],
    makeOption = function(option) {
      return <option key={options.indexOf(option)}>{option}</option>;
    };
    return(
      <div>
        <h4>20 décembre</h4>
        <Input type="checkbox" label="Je participe" ref="part20"
          labelClassName="col-md-6" name="firstDay.participation" onChange={this.handleChange} wrapperClassName="col-md-12" checked={this.state.promInscription.firstDay.participation}/>
        <Input ref="occupation20Select" type="select" label="Occupation" labelClassName="col-sm-3" 
          wrapperClassName="col-sm-6" name="firstDay.occupation" onChange={this.handleChange} value={this.state.promInscription.firstDay.occupation}>
            {options.map(makeOption)}
        </Input>
        <Input type="checkbox" label="Accompagné" ref="acc20" checked={this.state.promInscription.firstDay.accompanied}
          onChange={this.handleChange} name="firstDay.accompanied" labelClassName="col-md-6" wrapperClassName="col-md-12"/>
        <Input ref="nomAccompagnateur20" type="text" label="Nom de l'accompagnateur" labelClassName="col-sm-3" 
        wrapperClassName="col-sm-6" name="firstDay.accompanyingPersonName" onChange={this.handleChange} value={this.state.promInscription.firstDay.accompanyingPersonName} />
        <h4>21 décembre</h4>
        <Input type="checkbox" label="Je participe" ref="part21"
          onChange={this.handleChange} name="secondDay.participation" checked={this.state.promInscription.secondDay.participation} labelClassName="col-md-6" wrapperClassName="col-md-12"/>
        <Input ref="occupation20Select" type="select" label="Occupation" labelClassName="col-sm-3" 
          wrapperClassName="col-sm-6" onChange={this.handleChange} name="secondDay.occupation" value={this.state.promInscription.secondDay.occupation}>
            {options.map(makeOption)}
        </Input>
        <Input type="checkbox" label="Accompagné" ref="acc20" checked={this.state.promInscription.secondDay.accompanied} name="secondDay.accompanied"
          labelClassName="col-md-6" wrapperClassName="col-md-12" onChange={this.handleChange} />
        <Input ref="nomAccompagnateur20" type="text" label="Nom de l'accompagnateur" labelClassName="col-sm-3" 
        wrapperClassName="col-sm-6" onChange={this.handleChange} name="secondDay.accompanyingPersonName" value={this.state.promInscription.secondDay.accompanyingPersonName} />
      </div>
    );
  },
  
  renderMessage() {
    if (this.state.alert) {
      return (
        <Alert bsStyle={this.state.alert.style} >
          {this.state.alert.message}
        </Alert>
      );
    }
    return null;
  },

  render: function() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        {this.renderInscriptionFields()}
        <h3>Personne à contacter en cas d'urgence</h3>
        {this.renderContactUrgence()}
        <br/>
        <h3>Participation aux activités</h3>
        {this.renderActivityFields()}
        {this.renderMessage()}
        <input type="submit" value="Submit" />
      </form>
    );
  },
});

export default Inscription;
