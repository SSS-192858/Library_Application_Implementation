import React, { useContext, useState } from "react";
import useLoginFormValidator from "../validators/loginValidator";
import { StyleSheet, View } from "react-native";
import {Text, Button, Input, Card, Image} from 'react-native-elements';
import Spacer from "../reusables/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const LoginForm = ({navigation}) => {

  const {state, signin} = useContext(AuthContext); 

    const [username, setUsername ] = useState("");
    const [password, setPassword ] = useState(""); 

    const [message, setMessage] = useState("");

  const {errors, validateForm} = useLoginFormValidator({username: username, password: password});

  const onSubmitForm = e => {
    setMessage("")    
    const { isValid } = validateForm({ form: {username: username, password: password}, errors, forceTouchErrors: true });
    if (!isValid) return;

    signin(username, password);
    if (state.isAdmin){
      navigation.navigate("BoardAdmin");
    }else if (state.isStudent){
      navigation.navigate("BoardStudent");
    }
    setMessage(state.errorMessage)
  };

  return (<Card>
    <View style={styles.card_container}>
        <Image source="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" style={styles.profile_img_card} />
        <View>
            <Spacer>
                <Input label = "Username" value = {username} onChangeText={setUsername} autoCapitalize="none" autoCorrect = {false}/>
                {errors.username.dirty && errors.username.error ? (
                            <Text style={styles.errorMessage}>{errors.username.message}</Text>
                            ) : null}
            </Spacer>
            <Spacer>
                <Input secureTextEntry label = "Password" value = {password} onChangeText = {setPassword} autoCapitalize="none" autoCorrect = {false}/>
                {errors.username.dirty && errors.username.error ? (
                            <Text style={styles.errorMessage}>{errors.username.message}</Text>
                            ) : null}
            </Spacer>
            <Button title="Login" onPress={onSubmitForm}/>
                
            {message ? 
                  <View style={styles.errorMessage}>{message}</View>
                : null}
        </View>
    </View>
    
  </Card>)
}

const styles = StyleSheet.create({
    card_container : {
        maxWidth: 350,
        padding: 40
    },
    card: {
        backgroundColor: "gray",
        padding: 25, 
        margin: 25,
        marginTop: 50,
        borderRadius: 2,
    },
    profile_img_card : {
        width: 96,
        height: 96,
        margin: 10,
    },
    errorMessage : {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    },
})

export default LoginForm;