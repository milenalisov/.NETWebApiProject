import {loadingConstants} from "../../constants";
import {kosarkasiService} from "../../services";

export const ucitavanje = () => {
    return dispatch => {
        return kosarkasiService.ucitavanje().then(
            (kosarkasi) => {
                dispatch ({type: loadingConstants.LOADING_SUCCESS, kosarkasi});
            },
            () => {
                dispatch({type: loadingConstants.LOADING_FAILED});
            }
        );
    };
};