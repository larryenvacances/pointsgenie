var request = require("../middlewares/request");

var _events = {};
var _changeListeners  = [];
var _initCalled = false;

import EventApi from "../api/EventApi";
const eventApi = new EventApi();

var EventStore = {
  init: function () {
    if(_initCalled)
      return;
    _initCalled = true;
    this.fetchAll();
  },
  fetchAll: function() {
    return eventApi.readAll()
      .then((events) => {
        events.forEach((event) => {
          _events[event.id] = event;
        });
        EventStore.notifyChange();
    }).catch(err => {console.log(err.message); console.log(err.stack);});
  },
  getEvents: function () {
    return Object.keys(_events).map(key => _events[key]);
  },
  notifyChange: function() {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  openEvent: function (id, done = function(){}) {
    eventApi.openEvent(id).then((event) => {
      _events[event.id] = event;
      EventStore.notifyChange();
      done();
    });
  },
  closeEvent: function (id, done = function(){}) {
    eventApi.closeEvent(id).then((event) => {
      _events[event.id] = event;
      EventStore.notifyChange();
      done();
    });
  },
  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  },
};

module.exports = EventStore;