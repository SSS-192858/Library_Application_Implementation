import React , {useReducer} from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for (let key in actions){
            boundActions[key] = actions[key](dispatch);
        }

        //the state and the actions are provided to the children of the context provider
        return (
            <Context.Provider value = {{state, ...boundActions}}>
                {children}
            </Context.Provider>
        );

    };

    return {Context, Provider: Provider};
};