import { loadingConstants } from "../../constants";
import ActionHandlerFactory from "./actionHandlerFactory";


const setKosarkasi = (state, action) => {
  return {
    ...state,
    kosarkasi: action.kosarkasi,

  };
    

};


const errorHandler = (state, action) => {
    return {
      ...state
    };
  };
  

const factory = new ActionHandlerFactory();
factory.register(
  loadingConstants.LOADING_SUCCESS,
  setKosarkasi
);
factory.register(loadingConstants.LOADING_FAILED, errorHandler);

export default factory;
