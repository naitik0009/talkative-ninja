import { StyleSheet,SafeAreaView, Text, View, Button, Dimensions, Image, ScrollView } from 'react-native';
import { useContext,useMemo } from 'react';
import { UserContext } from '../../services/auth/auth.check';
import { UserData } from '../../services/data/user.data';
import { UserDataContext } from '../../context/context.api';
export const HomeScreen = ({navigation})=>{
  const {signOut} = useContext(UserContext);
  const {userData} = useContext(UserDataContext);
  useMemo(()=>{UserData()},[])
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
            <Text>editt</Text>
          </View>
            </View>
       
        </SafeAreaView>
      <ScrollView>
      <View>
      {userData.map((data)=>(<Text style={{color:"black",alignItems:"center",justifyContent:"center",marginTop:200}}>{data.email}</Text>))}
      </View>
       
        <Button title="Logout" onPress={ () => {
            signOut()
        }} />
      </ScrollView>
      
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