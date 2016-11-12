import request from "superagent";
import ResourceApi from "./ResourceApi";
import Event from "../models/Event";

class EventApi extends ResourceApi {
  static resourceUrl = "events";
  static resourceName = {
    singular: "event",
    plural: "events",
  };
  static Resource = Event;

  readUpcoming() {
    const URL = `${this._getResourceUrl()}/upcoming`;
    return this._doGet(URL).then(res => this._multiResourceResponse(res));
  }

  openEvent(id) {
    const URL = `${this._getResourceUrl()}/openEvent/${id}`;
    return this._doPost(URL).then(res => this._singleResourceResponse(res));
  }

  closeEvent(id) {
    const URL = `${this._getResourceUrl()}/closeEvent/${id}`;
    return this._doPost(URL).then(res => this._singleResourceResponse(res));
  }
};

export default EventApi;
