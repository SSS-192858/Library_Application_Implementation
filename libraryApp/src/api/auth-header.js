import AsyncStorage from '@react-native-async-storage/async-storage';

const authHeader = async() => {
  const str = await AsyncStorage.getItem('user');
  if (str){
    const user = JSON.parse(str);
    
    if (user && user.token) {
      console.log(user.token)
      return user.token;
    } else {
      return {};
    }
  }
}

export default authHeader;