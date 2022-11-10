import {useReducer, createContext ,useEffect, useState,useMemo } from "react";
import { StackScreens } from "../../routes/navigation";
import * as SecureStore from 'expo-secure-store';
export const UserContext = createContext();

export const AuthenticationCheck =  ({navigation}) => {
    const [state,dispatch] = useReducer((prevState,action)=>{
        switch (action.type) {
            case "RESTORE_TOKEN":
                return {
                    ...prevState,
                    userToken:action.token,
                    isLoading:false,
                };
            case "LOGIN":
                return {
                    ...prevState,
                    isSignOut:false,
                    userToken:action.token,
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    isSignOut:true,
                    userToken:null,
                };
        }
    },

    {
        isloading:true,
        isSignOut:false,
        userToken:null,
    }
    );
    useEffect(()=>{   
        const checkAuth = async()=>{
            var token;
        try {
           token = await SecureStore.getItemAsync("token").then((data)=>{
            return data;
           })
        } catch (error) {
            alert(error);
        }
        console.log(token);      
        dispatch({type:"RESTORE_TOKEN",token:token});
        }
      checkAuth();
    },[]);

    const authContext = useMemo(
        ()=>{
            return {
                signIn : async (token)=>{
                    let persist;
                    try {
                     persist = await SecureStore.setItemAsync("token",token).then(()=>{
                          return token;
                        })
                    } catch (error) {
                        alert(error);
                    }
                    console.log(persist);
                    dispatch({type:"LOGIN",token:persist});
                },
                signUp : async ()=>{
                    
                    navigation.navigate("Login");
                },
                signOut:async () => {
                    try {
                        const logout = await SecureStore.deleteItemAsync("token");    
                    } catch (error) {
                        alert(error)
                    }
                    
                    dispatch({type:"LOGOUT"})
                    
                }
            };
        },[]
    );
    
    return(
    <UserContext.Provider value={authContext}>
        <StackScreens state={state} />
        </UserContext.Provider>);
}