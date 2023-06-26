import {useEffect, useContext} from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = ({navigation}) => {
    const {state, tryLocalSignin} = useContext(AuthContext);

    const start = () => {
        tryLocalSignin();
        if (state.currentUser && state.isAdmin){
            navigation.navigate("BoardAdmin");
        }else if (state.currentUser && state.isStudent){
            navigation.navigate("BoardStudent")
        }else{
            navigation.navigate("loginFlow")
        }
    }

    //to get the token only once when we first open the application
    useEffect( () => {
        start();
    }, []);

    return null;
}

export default ResolveAuthScreen;