import React, {useContext} from "react";
import { StyleSheet} from "react-native";
import { Context as AuthContext } from "./context/AuthContext";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawerContent = ({navigation}) => {

    const {state} = useContext(AuthContext);

    return (
        <DrawerContentScrollView style={styles.container}>
            <DrawerItem label="Home" labelStyle={styles.button} onPress={navigation.navigate("")}/>
            
            {state.isAdmin ? 
                <DrawerItem label="Board Admin" labelStyle={styles.button} onPress={navigation.navigate("")} />
            :null}

            {state.isStudent ? 
                <DrawerItem label="Board Student" labelStyle={styles.button} onPress={navigation.navigate("")} />
            :null}

            <DrawerItem label="Logout" labelStyle={styles.button} onPress={navigation.navigate("")} />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowColor: '#000',
        borderRadius: 1
    },
    button: {
        padding: 5
    }
})

export default CustomDrawerContent;
