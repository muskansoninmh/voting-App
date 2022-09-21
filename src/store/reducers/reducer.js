const initialState = {
    id: '',
    open: false,
    openDialog: false,
    drawerName: '',
    candidateList: [],
    editCandidate: {},
    isVoted: false
}

const reducerFunction = (state = initialState, action) => {
    switch(action.type){
        case "DRAWER": {
            return {
                ...state,
                open: action.payload.value,
                drawerName: action.payload.drawerName
            }
        }
        case "SEND_UID": {
            return {
                ...state,
                id: action.payload
            }
        }
        case "REGISTER_USER": {
            return{
                ...state,
                candidateList: [action.payload,...state.candidateList]
            }
        }
        case "CANDIDATE_LIST": {
            return {
                ...state,
                candidateList: action.payload
            }
        }
        case "EDIT_CANDIDATE": {
            return {
                ...state,
                editCandidate: action.payload
            }
        }
        case "EDIT_USER":{
            return {
                ...state,
                candidateList: state.candidateList.map((obj) => obj.Uid === action.payload.Uid ? action.payload : obj)
            }
        }
        case "DIALOG": {
            return {
                ...state,
                openDialog: action.payload
            }
        }
        case "DELETE_USER": {
            return {
                ...state,
                candidateList: state.candidateList.filter((obj) => obj.Uid !== action.payload)
            }
        }
        case "IS_VOTED": {
            return {
                ...state,
                isVoted: true
            }
        }
        default : {
            return {
                ...state
            }
        }
        }
}
export default reducerFunction;