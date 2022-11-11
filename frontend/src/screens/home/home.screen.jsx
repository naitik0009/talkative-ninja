import { StyleSheet,SafeAreaView, Text, View,  Dimensions,  FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../services/auth/auth.check';
import { UserProfile } from '../../services/data/user.data';
import {Image,Icon,Avatar,ListItem} from "@rneui/themed"
import { useState } from 'react';
import { useEffect } from 'react';
import { UserDataContext } from '../../context/context.api';
export const HomeScreen = ({navigation})=>{
  const {profile,setProfile} = useContext(UserDataContext);
  useEffect(()=>{UserProfile(setProfile)},[])
  const {signOut} = useContext(UserContext);
  const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
    },
     // more items
  ];
  
    return(
      <>
        <SafeAreaView style={styles.container}>          
           <View style={styles.header}>
          <View>
           <TouchableOpacity onPress={()=>{signOut()}}>
           <Image style={{width:50,height:50}} source={require("../../assets/icons/signal.png")}/>
           </TouchableOpacity>
          </View>
          <Text style={{color:"white",fontWeight:"900",fontSize:20}}>Talking Ninja</Text>
          <View style={{flexDirection:"row"}}>
            <Icon name="edit" size={35} style={{marginRight:5}} color="white"/>
            <Icon name="camera" size={35} style={{marginRight:5}} color="white"/>
          <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}}>
          <Avatar size={35} rounded source={{uri:`${profile}`}} containerStyle={{marginRight:5}} />
          </TouchableOpacity>
          </View>
            </View>
            <View>
            {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider>
        <Avatar source={{uri: l.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
  }
            </View>
      </SafeAreaView>
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