import React, {
    useState,
    useEffect,
    createContext, useContext, useReducer,
    Dispatch,
    ComponentType,
    
} from "react";

export const initialState = {
    user: null,
    userAuthFlow: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER_AUTH_FLOW":
            return {
                ...state,
                userAuthFlow: action.payload
            };
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};


/* import { Action, initialState, reducer, State } from './common';
 */

const stateCtx = createContext(initialState);
const dispatchCtx = createContext(() => 0);

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <dispatchCtx.Provider value={dispatch}>
            <stateCtx.Provider value={state}>{children}</stateCtx.Provider>
        </dispatchCtx.Provider>
    );
};

export const useDispatch = () => {
    return useContext(dispatchCtx);
};

export const useGlobalState = (property) => {
    const state = useContext(stateCtx);
    return state[property]; // only one depth selector for comparison
};
