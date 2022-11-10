import { StyleSheet,SafeAreaView, Text, View, Button, Dimensions, Image, FlatList} from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../services/auth/auth.check';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { UserData } from '../../services/data/user.data';
import { useEffect } from 'react';
import { useState } from 'react';
export const HomeScreen = ({navigation})=>{
  const [userData,setUserData] = useState([]);
  let data=[];
  const url = "http://192.168.1.70:5500/api/v1/user/profile";
  const {signOut} = useContext(UserContext);
  useEffect(()=>{UserData(data,setUserData)},[]);
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
      
      <View>
      <FlatList
      data={userData}
      renderItem={({item,index})=>(<Text key={index++} style={{color:"black",alignItems:"center",justifyContent:"center",marginTop:200}}>{item.email}</Text>)}
      keyExtractor={item => item.id}
      />
      </View>
      <View style={{marginTop:100}}>
      <Button  touchSoundDisabled={false}  title="Logout"  onPress={ () => {
            signOut()
        }} />
      </View>
      
      
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