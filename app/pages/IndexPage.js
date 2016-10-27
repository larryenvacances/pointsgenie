import React, { PropTypes } from "react";

import PointsLog from "../components/PointsLog";
import ApplyToEvent from "../components/ApplyToEvent";
import NextSchedule from "../components/NextSchedule";

import { RouteHandler, Link } from "react-router/build/npm/lib";
import { Table, Glyphicon } from "react-bootstrap";
import { sortByOrder as _sortByOrder } from "lodash"
import request from "../middlewares/request";

import connectToStore from "flummox/connect";

import EventStore from "../stores/event.js"

const IndexPage = React.createClass({
  displayName: "IndexPage",

  contextTypes: {
    flux: PropTypes.object,
  },

  getInitialState() {
    return {
      events: EventStore.getEvents(),
    }
  },

  componentWillMount() {
    EventStore.init();
  },

  componentDidMount() {
    EventStore.addChangeListener(this.updateEvents);
  },

  componentWillUnmount() {
    EventStore.removeChangeListener(this.updateEvents);
  },

  updateEvents() {
    if(!this.isMounted()) {
      return;
    }
    this.setState({
      events: EventStore.getEvents(),
    });
  },

  getNextEvent(EventSource) {
    let events = [];
    EventSource.forEach(function(entry) {
      if ( entry.startDate > Date.now() && entry.isClosed == true ) {
        events.push(entry)
        };
      });
    return events
  },

  render() {
    //const nextEvent = this.getNextEvent();
    console.log('BEFORE THE SHIT');
    var callback = function (err, data) {
      if (err) return console.error(err);
      console.log(data);
      };
    this.getNextEvent(this.state.event, callback);
    console.log('AFTER THE SHIT');
    const user = this.props.user || {};
    return (
      <div className= "index-page">
        <ApplyToEvent promocard={user.promocard} />
      </div>
    );
  }
});

const ConnectedEventList = connectToStore(IndexPage, {
  auth: store => ({
    user: store.getAuthenticatedUser(),
  })
});

export default ConnectedEventList;

      //if (entry.isClosed == true & entry.isPointsAttributed == false) {
      //  events.push(entry)

    /*  <NextSchedule event={nextEvent[0]} />
        <NextSchedule event={nextEvent[1]} /> */