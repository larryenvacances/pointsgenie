import React, { PropTypes } from "react";
import { Table } from "react-bootstrap";

import request from "../middlewares/request";

import UserStore from "../stores/user";

const NextSchedule = React.createClass({
  displayName: "NextSchedule",

  propTypes: {
    event: PropTypes.object,
  },

  getInitialState(){
    return {};
  },

  componentWillMount() {
    UserStore.init();
  },

  componentDidMount() {
    UserStore.addChangeListener(this.updateUsers);
    const id = this.props.event.id;
    request.get("/schedules/" + id, (err, res) => {
      if (err) {
        return; // @TODO handle errors
      }
      let users = this.getMappedUsers(res.body.schedule);
      this.setState({
        schedule: res.body.schedule,
        users: users,
       });
    });
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this.updateUsers);
  },

  renderTableHeader(columns) {
    let ths = columns.map((column) => {
      return (<th>{column}</th>);
    });
    return (
      <thead>
        {ths}
      </thead>
    );
  },

  getMappedUsers(schedule) {
    if (!schedule || !schedule.hours) {
      return null;
    }

    let hours = Object.keys(schedule.hours);
    let tasks = Object.keys(schedule.hours[hours[0]]);
    let users = {};
    // @TODO
    hours.forEach((row) => {
      tasks.forEach((column) => {
        schedule.hours[row][column].forEach((id) => {
          if (!users[id]) {
            users[id] = UserStore.getUser(id);
          }
        });
      });
    });
    return users;
  },

  updateUsers() {
    if (this.state.schedule) {
      this.setState({ users: this.getMappedUsers(this.state.schedule) });
    }
  },

  renderTableBody(rows, columns) {
    let schedule = this.state.schedule.hours;
    let trs = rows.map((row) => {
      let tds = columns.map((column) => {
        let list = schedule[row][column].map((id) => {
          let user = this.state.users[id];
          return (<li>{user.name || user.cip}</li>);
        });
        return (
          <td><ul>{list}</ul></td>
        );
      });
      let date = new Date(Number(row));
      tds.unshift(
        <td>
          <ul>
            <li>{date.toLocaleDateString()}</li>
            <li>{date.toLocaleTimeString()}</li>
          </ul>
        </td>
      );
      return (
        <tr key={row}>
          {tds}
        </tr>
      );
    });
    return (
      <tbody>
        {trs}
      </tbody>
    );
  },

  renderSchedule() {
    let schedule = this.state.schedule.hours;
    let columns = ["Heures"];
    let rows = [];
    if (schedule) {
      rows = Object.keys(schedule).sort();
    }

    if (rows.length > 0) {
      columns = columns.concat(Object.keys(schedule[rows[0]]));
    }
    let name = this.state.schedule.event ? this.state.schedule.event.name : "";
    return (
      <div class="schedule">
        <h3>Horaire pour l'événement {name}</h3>
        <Table bordered hover responsive>
          {this.renderTableHeader(columns)}
          {this.renderTableBody(rows, Object.keys(schedule[rows[0]]) )}
        </Table>
      </div>
    );
  },

  renderWaiting() {
    return (
      <div className="waiting">
        <h3>Horaire du {this.props.event.name}</h3>
        <div>Chargement en cours...</div>
      </div>
    );
  },

  render() {
    return (
      <div className="schedule-wrapper">
        { this.state.schedule && this.state.users ? this.renderSchedule() : this.renderWaiting() }
      </div>
    );
  }
});

export default NextSchedule;


/*  render() {
    let myVar = this.props.event;
    console.log("Next is myVar inside NextSchedule")
    console.log(myVar)
    return(
       <div className="index-schedule">
        <h3>Horaire du prochain événement <small>{myVar.name}</small></h3>
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
}); */