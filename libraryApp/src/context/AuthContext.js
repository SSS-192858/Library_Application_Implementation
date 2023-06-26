import createDataContext from "./createDataContext";
import { login, getCurrentUser, logout, registerStudent } from "../api/auth_services";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: (action.payload.response &&
                action.payload.response.data &&
                action.payload.response.data.message) ||
              action.payload.message ||
              action.payload.toString()
            }
        case 'signout' :
            return {...state, currentUser: null, isAdmin: false, isStudent: false};
        case 'signin':
            newState = {...state}
            if (action.payload){
                newState = {...state, currentUser: action.payload}
                if (action.payload && action.payload.user && action.payload.user.roles && action.payload.user.roles[0] && action.payload.user.roles[0].name && action.payload.user.roles[0].name === "ADMIN"){
                    newState = {...state, isAdmin: true}
                }
                else if (action.payload && action.payload.user && action.payload.user.roles && action.payload.user.roles[0] && action.payload.user.roles[0].name && action.payload.user.roles[0].name === "STUDENT"){
                    newState = {...state, isStudent: true}
                }
            }
            return newState;
        default :
            return state;
    }
}

//function to get token from async storage and signin if required
const tryLocalSignin = (dispatch) => {
    return () => {
        const user = getCurrentUser();
        
        if (user){
            dispatch({type : 'signin', payload: user});
        }
    }
};

const signupStudent = (dispatch) => {
    return (username, password, studentName, email, phone) => {
        try {
            registerStudent(username, password, studentName, email, phone);
        }catch (err){
            dispatch({type: 'add_error', payload: err})
        }
    };
};

const signupAdmin = (dispatch) => {
    return (username, password) => {
        try {
            registerAdmin(username, password);
        }catch (err){
            dispatch({type: 'add_error', payload: err})
        }
    }
}

const signin = (dispatch) => {
    return (username, password) => {
        try {
            const response = login(username, password);
            dispatch({type : 'signin', payload: response});
        }catch (err){
            dispatch({type: 'add_error', payload: 'Invalid username or password'})
        }
    };
};

const signout = (dispatch) => {
    return () => {
        logout();
        dispatch({type: 'signout'});
    };
};

export const {Provider, Context} = createDataContext(
    authReducer, 
    {signin, signupStudent, signupAdmin, signout, tryLocalSignin}, 
    {currentUser: null, isAdmin: false, isStudent: false, errorMessage: ""}
);