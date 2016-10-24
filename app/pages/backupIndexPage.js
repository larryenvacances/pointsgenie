import React, { PropTypes } from "react";

import PointsLog from "../components/PointsLog";
import ApplyToEvent from "../components/ApplyToEvent";
import NextSchedule from "../components/NextSchedule";

import { RouteHandler, Link } from "react-router/build/npm/lib";
import { Table, Glyphicon } from "react-bootstrap";
import { sortByOrder as _sortByOrder } from "lodash"
import request from "../middlewares/request";

import connectToStore from "flummox/connect";

const IndexPage = React.createClass({
  displayName: "IndexPage",

  contextTypes: {
    flux: PropTypes.object,
  },

  render() {
    console.log(this.props.events)
    //const user = this.props.user || {};
    //const events = this.props.events || {};
    return (
      <div className= "index-page">
        <NextSchedule event={events} />
      </div>
    );
  }
});

const ConnectedEventList = connectToStore(IndexPage, {
  event: store => ({
    events: store.getAllEvents(),
  })
});

export default ConnectedEventList;


//         <ApplyToEvent promocard={user.promocard} />
//        <PointsLog log={user.points} />
//   auth: store => ({
//    user: store.getAuthenticatedUser(),
//  }),