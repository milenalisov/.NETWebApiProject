import {userConstants} from "../../constants";
import {userService} from "../../services";
import {alertActions} from "./";
import {history} from "../../helpers";

export const login = (username, password) => {
    return dispatch => {
        return userService.login(username, password).then(
           (user) => {
                dispatch({type: userConstants.LOGIN_SUCCESS, user});
               history.push("/");
            },
            (error) => {
                dispatch({type: userConstants.LOGIN_ERROR, error})
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
};

