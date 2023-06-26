import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginForm from "./src/screens/LoginForm";
import LogoutScreen from "./src/screens/LogoutScreen";
import BoardAdmin from "./src/screens/BoardAdmin";
import BoardStudent from "./src/screens/BoardStudent";
import Home from "./src/screens/Home";
import CustomDrawerContent from "./src/DrawerContent";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";

const loginFlow = createStackNavigator({
  Home: Home,
  Login: LoginForm
})

const Drawer = createDrawerNavigator();

function myDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={<Home />}/>
      <Drawer.Screen name="BoardAdmin" component={<BoardAdmin />}/>
      <Drawer.Screen name="BoardStudent" component={<BoardStudent />} />
      <Drawer.Screen name="Logout" component={<LogoutScreen />}/>
    </Drawer.Navigator>
  )
}

const SwitchNavigator = createSwitchNavigator({
  resolve: ResolveAuthScreen,
  loginFlow: loginFlow,
  drawer: myDrawer
})

const App = createAppContainer(SwitchNavigator);

export default () => {
  return <AuthProvider>
    <App />
  </AuthProvider>
}