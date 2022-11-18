import { useState,useRef, useEffect } from "react";
import { Dimensions, Keyboard, SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export const VerifyEmailScreen = ({ navigation }) => {
    const input = Array(4).fill("");
    const inputs = useRef();
    const [otp,setOtp] = useState({0:"",1:"",2:"",3:""});
    const [nextIndex,setNextIndex] = useState();

    const handletextChange = (text,index)=>{
        const newOtp = {...otp};
        newOtp[index] = text;
        setOtp(newOtp);
        const lastIndex = input.length-1;
        if(!text){
            const newIndex = index === 0 ?0:index-1;
        setNextIndex(newIndex);
        }else{
            const newIndex = index === lastIndex ?lastIndex:index+1;
        setNextIndex(newIndex);
        }
    }
    useEffect(()=>{
      const calls = ()=> inputs.current.focus();
        nextIndex != undefined ? calls() : console.log("fuck");
    },[nextIndex]);
    
    const verifyOtp = ()=>{
        Keyboard.dismiss();
        let v = "";
        let newValue = Object.values(otp).forEach(value=> v += value );
        console.log(v);
    };
    return (
        <SafeAreaView style={styles.container}>
             <Text style={styles.heading}>Welcome to signal,</Text>
            <View style={styles.view}>
                <Text style={styles.subHeading}>
                    Please verify your email,otp has been sent to your email...
                </Text>
               <View style={styles.box}>
               {input.map((data, index) => (
                    <TextInput  value={otp[index]} onChangeText={(text)=>{handletextChange(text,index)}} activeOutlineColor="#2187e0" key={index.toString()} keyboardType="numeric" maxLength={1} style={styles.input} ref={ nextIndex===index ? inputs : null } />
                ))}
               </View>
               <TouchableOpacity onPress={()=>{verifyOtp()}}>
               <Button>verify</Button>
               </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        alignItems: "center",
        justifyContent: "center"
    },
    heading:{
        marginTop:20,
        fontSize:25,
        alignSelf:"center",
        fontWeight:"600",
    },
    subHeading:{
        margin:20,
    },
    view: { flexDirection: "column", },
    box:{flexDirection:"row",justifyContent:"space-between",margin:20},
    input: {
        width: Math.round(Dimensions.get("window").width / 6),
        height: Math.round(Dimensions.get("window").width / 6),
        borderWidth: 2,
        borderColor: "#2187e0",
        textAlign: "center",
    }
});