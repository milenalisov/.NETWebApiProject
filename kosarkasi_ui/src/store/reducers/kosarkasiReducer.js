import handlerFactory from "./kosarkasiReducerActionHandlerFactory";

const initState = {
  kosarkasi: []
};

const kosarkasiReducer = (state = initState, action) => {
  const handle = handlerFactory.getHandler(action.type);
  const newState = handle(state, action);
  
  return newState;
  

};



export default kosarkasiReducer;
 