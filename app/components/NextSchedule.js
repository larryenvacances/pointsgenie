import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";

const NextSchedule = React.createClass({
  displayName: "NextSchedule",

  propTypes: {
  //  event: PropTypes.object
  },

  getInitialState(){
    return {};
  },

  render() {
    let myVar = this.props.event;
    console.log(myVar)
    return(
       <div className="index-schedule">
        <h3>Horaire du prochain événement <small>notDick</small></h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Événement</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            Des trucs
          </tbody>
        </Table>
      </div>
    );
  }
});

export default NextSchedule;