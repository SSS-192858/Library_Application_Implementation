import React, { useContext } from "react";
import BoxContainer from "../reusables/Container";
import { TouchableOpacity, StyleSheet, View} from "react-native";
import { Text } from "react-native-elements";
import {Context as AuthContext} from "../context/AuthContext";

const Home = ({navigation}) => {

    const {state} = useContext(AuthContext);

    const nav = () => {
        navigation.navigate("Login")
    }

    return (
        <View>
            <BoxContainer>
                <Text>Home Page</Text>
            </BoxContainer>


            {state.currentUser ? 
                <TouchableOpacity onPress={nav}>
                    <Text style={styles.link}>
                        Already have an account? Go to Login Page..
                    </Text>
                </TouchableOpacity>
            :null}
            
        </View>  
    );
}

const styles = StyleSheet.create({
    link: {
        color: "blue"
    }
})

export default Home;