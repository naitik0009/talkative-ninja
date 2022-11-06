import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import { authentication } from '../../services/firebase/firebase';
export const HomeScreen = ()=>{
    return(
        <SafeAreaView>
        <Text style={{color:"black",alignItems:"center"}}>Welcome {authentication.currentUser.email}</Text>
      
      </SafeAreaView>
    )
}