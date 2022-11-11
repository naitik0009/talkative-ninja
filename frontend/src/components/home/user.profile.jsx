import { View,ActivityIndicator,Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState,useContext } from "react";
import { UserDataContext } from "../../context/context.api";
import { Image } from "@rneui/themed";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
const url = "http://192.168.1.70:5500/api/v1/user/upload-avatar";
export const UserProfile = (item)=>{
    const {profile,setProfile} = useContext(UserDataContext);
    const pickImage = async()=>{
        let {status} =await  ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status==="granted"){
            const result =  ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[4,3],
                quality:1,
            }).then((response)=>{setProfile(response.uri)}).catch((error)=>{alert(error)});
        }
    };
    // useEffect(()=>{uploadImageToServer()},[])
    const uploadImageToServer = async ()=>{
        const formdata = new FormData();
        formdata.append("profile",{
            name:new Date()+"_profile",
            uri:profile,
            type:"image/jpg",
        });
        const token = await SecureStore.getItemAsync("token").then(async (jwt)=>{
            
            await axios.post(url,formdata,{
                headers:{
                    authorization:jwt,
                },
            });
        }).catch((error)=>{alert("fuck")});
    };
    return (
<SafeAreaView style={styles.container}>
    <View>
    <Image source={{uri:profile}} style={{width:100,height:100,borderRadius:50,marginTop:100,marginBottom:50}} PlaceholderContent={<ActivityIndicator/>}/>
    </View> 
<TouchableOpacity onPress={()=>{pickImage().then(()=>{uploadImageToServer()}).catch((error)=>{alert(error)})}}>
    <Text style={{fontSize:30,fontWeight:"900"}}>Select image</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{uploadImageToServer().catch((error)=>{alert(error)})}}>
    <Text style={{fontSize:30,fontWeight:"900"}}>Upload image</Text>
</TouchableOpacity>
    
</SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
    }
})