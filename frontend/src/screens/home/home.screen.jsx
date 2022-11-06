import { StyleSheet,SafeAreaView, Text, View, Button, Dimensions, Image } from 'react-native';
import { authentication } from '../../services/firebase/firebase';
export const HomeScreen = ()=>{
    return(
      <>
        <SafeAreaView style={styles.container}>          
           <View style={styles.header}>
          <View>
            <Image style={{width:50,height:50}} source={require("../../assets/icons/signal.png")}/>
          </View>
          <Text>Signal</Text>
          <View>
            <Text>camera</Text>
            <Text>edit</Text>
          </View>
            </View>
       
        </SafeAreaView>
       <Text style={{color:"black",alignItems:"center",justifyContent:"center",marginTop:200}}>Welcome {authentication.currentUser.email}</Text>
        <Button title="Logout" onPress={()=>{authentication.signOut()}}/>
      
      </>
      
    )
}

const styles = StyleSheet.create({
  container:{
   position:"absolute",zIndex:999
  },
  header:{ width:Dimensions.get("screen").width,
  backgroundColor:"#2187e0",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}
})