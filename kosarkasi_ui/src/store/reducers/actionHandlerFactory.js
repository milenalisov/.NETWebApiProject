import { Component } from "react";

const defaultHandler = (state, action) => {
    return state;
  };
  
  const defaultConfig = {
    defaultHandler
  };
  
  const formatKey = key => {
    return key.toString().toUpperCase();
  };
  
  export default class ActionHandlerFactory extends Component {
    constructor(config = defaultConfig) {
      super(config);
      this.defaultHandler = config.defaultHandler || defaultHandler;
      this.handlers = {};
    }
    register(key, handler) {
      this.handlers[formatKey(key)] = handler;
    }
    getHandler(key) {
      if (formatKey(key) in this.handlers) {
        return this.handlers[key];
      } else {
        return this.defaultHandler;
      }
    }
  }
  