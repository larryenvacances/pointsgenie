import React, { PropTypes } from "react";
import { Input } from "react-bootstrap";

import request from "../middlewares/request";

const Jonc = React.createClass({
  displayName: "Jonc",

  propTypes: {
    ringSize: PropTypes.string
  },

  getInitialState() {
    return {
      ringSize: this.props.ringSize
    };
  },

  handleDropdownChange() {
    this.setState({isSubmitting: true});
    let refs = this.refs;
    let formData = {};
    for (let key of Object.keys(refs)) {
      formData[key] = refs[key].getValue();
    };

    request.post("/users/me/ringSize", formData, (err, res) => {
      let state = { 
        isSubmitting: false,
        ringSize: formData.ringSizeSelect
      };
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

  renderSelect: function() {
    let options = ["", "1", "1-", "2", "2-", "3", "3-", "4", "4-", "5", "5-", "6", "6-", "7", "7-", "8", "8-", "9", "9-", "10", "10-", "11", "11-", "12", "12-", "13", "13-", "14", "14-", "15"],
        makeOption = function(option) {
            return <option key={options.indexOf(option)}>{option}</option>;
        };

    return <Input ref="ringSizeSelect" type="select" label="Taille du jonc" labelClassName="col-md-3" 
    wrapperClassName="col-md-2" onChange={this.handleDropdownChange} value={this.state.ringSize}>
        {options.map(makeOption)}
      </Input>;
  },

  renderInner: function () {
    return (
    <form className="form-horizontal">
        {this.renderSelect()}
    </form>
    );
  },

  render: function() {
    return (
      <div className="user-jonc-info">
        <h4>Jonc</h4>
        {this.renderInner()}
      </div>
    );
  },
});

export default Jonc;