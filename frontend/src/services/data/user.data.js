import axios from "axios";
import * as SecureStore from 'expo-secure-store';
const url = "http://192.168.1.70:5500/api/v1/user/profile";

export const UserProfile = async (setData)=>{
    try {
        const token = await SecureStore.getItemAsync("token").then( (data) => data );
    
    const config = {
        headers:{
            authorization : token,
        }
    };
    await axios.get(url,config).then((response)=>{
        if(response){
            setData(response.data.message.avatar);
        }           
    }).catch((error)=>{console.log(error)});
    } catch (error) {
        alert(error);
    }

}

