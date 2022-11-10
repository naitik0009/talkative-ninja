import axios from "axios";
import { UserDataContext } from "../../context/context.api";
import * as SecureStore from 'expo-secure-store';
import { useContext } from "react";
export const data = [];
const url = "http://192.168.1.70:5500/api/v1/user/profile";

export const UserData = async ()=>{
    const {setUserData} = useContext(UserDataContext);
    const token = await SecureStore.getItemAsync("token").then((data)=>data);
    const config = {
        headers:{
            authorization : token,
        }
    };
    const request = await axios.get(url,config).then((response)=>{
if(response){
    data.push(response.data.message)
    setUserData(data);
}
        console.log(data);
    }).catch((error)=>{console.log(error)});

}