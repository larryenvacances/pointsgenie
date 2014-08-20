/** @jsx React.DOM */
"use strict";
var React = require("react");
var PropTypes = React.PropTypes;
var Input = require("react-bootstrap/Input");

var Pikaday = require("pikaday");

module.exports = React.createClass({
  displayName: "DatePicker",
  propTypes: {
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.instanceOf(Date),
    date: PropTypes.instanceOf(Date),
    i18n: PropTypes.object,
  },
  getDefaultProps: function () {
    return {
      minDate: new Date(),
      i18n: {
        previousMonth : "Mois précdédent",
        nextMonth     : "Mois suivant",
        months        : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        weekdays      : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        weekdaysShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      }
    };
  },
  getInitialState: function () {
    return {
      datePickerType: "date"
    };
  },
  getValue: function () {
    var d = new Date(this.refs.input.getValue());
    // offset because date is chosen in locale but is created in UTC
    d.setUTCMinutes(d.getUTCMinutes() + d.getTimezoneOffset());
    return d;
  },
  componentDidMount: function () {
    var onChange = this.props.onChange;
    this.setState({
      datePicker: new Pikaday({
        field: this.refs.input.getInputDOMNode(),
        defaultDate: this.props.date,
        setDefaultDate: !!this.props.date,
        minDate: this.props.minDate,
        i18n: this.props.i18n,
        onSelect: function () {
          onChange();
        },
      }),
      datePickerType: "text",
    });
  },
  render: function () {
    var date = this.props.date && this.props.date.toLocaleDateString();
    return this.transferPropsTo(
      <Input type={this.state.datePickerType} ref="input" onChange={this.props.onChange} value={date} />
    );
  },
});