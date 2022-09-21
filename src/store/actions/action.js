import axios from 'axios';
import {url} from './config';
import Constants from './constants';

export const drawerAction =(value,drawerName) => {
    return(
        {type: Constants.DRAWER, payload: {value, drawerName}}
    );
}
export const registerUserAction = (user) => {
    return async (dispatch) => {
        let response;
        try{
            response = await axios.post(`${url}/register-by-email`,{...user})
        }
        catch(e){
            console.log(e);
        }

        if(response?.status === 200){
        {dispatch({type: Constants.REGISTER_USER, payload: response.data})}
        }
    }
};

export const getCandidateListAction = (uid) => {
    return async (dispatch) => {
        console.log(uid);
        let response;
        try{
             response = await axios.get(`${url}/get-all-candidate?id=${uid}`)
        }
        catch(e){
            console.log(e);
        }
        if(response?.status === 200){
        {dispatch({type: Constants.CANDIDATE_LIST, payload: response?.data?.reverse()})}
        }
    }
};

export const editCandidateAction = (candidate) => {
    return(
        {type: Constants.EDIT_CANDIDATE, payload: candidate}
    );
};


export const updateUserAction = (user, uid) => {
    console.log(user,uid);
    return async (dispatch) => {
        let response;
        try{
            response = await axios.put(`${url}/edit-candidate/${uid}`,{...user})
        }
        catch(e){
            console.log(e);
        }
        if(response?.status === 200){
        {dispatch({type: Constants.EDIT_USER, payload: response?.data})
        return response.status;
    }
        }
    }
};

export const dialogAction =(value) => {
    return(
        {type: Constants.DIALOG, payload:value, }
    );
}

export const deleteUserAction = (uid) => {
    return async (dispatch) => {
        let response;
        try{
            response = await axios.delete(`${url}/delete-candidate/${uid}`)
        }
        catch(e){
            console.log(e);
        }
        if(response?.status === 200){
        {dispatch({type: Constants.DELETE_USER, payload: uid})}
        }
    }
};

export const isVotedAction =() => {
    return(
        {type: Constants.IS_VOTED }
    );
}
