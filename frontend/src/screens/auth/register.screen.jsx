import { Image, SafeAreaView,TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, View, ScrollView } from "react-native";
import { TextInput} from "react-native-paper";
import { Button } from "@rneui/themed";
import React from "react";
import { Formik } from "formik"
import * as yup from "yup";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { authentication } from "../../services/firebase/firebase";
import axios from "axios";

export const RegisterScreen = ({navigation}) => {
    const [loading,setLoading] = React.useState(false);
    const LoginformSchema = yup.object().shape({
        name:yup.string().required("name is required"),
        email:yup.string().email("Invalid email").required("email is required"),
        password:yup.string().required("password is required").min(6).max(10),
    });
const url = "http://192.168.1.70:5500/api/v1/user/register";
const SignUp = async(name,email,password)=>{
  setLoading(true);
    const result = await axios.post(url,{name,email,password}).then((response)=>{console.log(response)}).catch((error)=>{alert(error)}).finally(()=>{setLoading(false);navigation.navigate("Login")});
};

// const SignIn = async(email,password)=>{
//     setLoading(true);
//     await createUserWithEmailAndPassword(authentication,email,password).then((result)=>{setLoading(false);navigation.navigate("Login");}).catch((error)=>{setLoading(false);alert(error)});
// };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.heading}>Welcome to signal,</Text>
                            <Image style={styles.icon} defaultSource={require("../../assets/icons/signal.png")} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png" }} />
                           <Formik initialValues={{name:"",email:"",password:""}} validationSchema={LoginformSchema} validateOnMount={true} onSubmit={(values)=>SignUp(values.name,values.email,values.password)}>
                           {({handleBlur,handleChange,errors,isValid,handleSubmit,values})=>(
                            <>
                            <View style={styles.inputContainer}>
                            <TextInput mode="outlined" onChangeText={handleChange("name")} value={values.name} onBlur={handleBlur("name")} autoFocus={false} activeOutlineColor="#2187e0" label={"name"} placeholder="name" style={styles.input} />
                            {<Text style={styles.error}>{values.name.length>1?errors.name:""}</Text>}
                            <TextInput mode="outlined" onChangeText={handleChange("email")} value={values.email} onBlur={handleBlur("email")} autoFocus={false} activeOutlineColor="#2187e0" label={"email"} placeholder="email" style={styles.input} />
                            {<Text style={styles.error}>{values.email.length>1?errors.email:""}</Text>}

                            <TextInput value={values.password} mode="outlined" onChangeText={handleChange("password")} onBlur={handleBlur("password")} autoFocus={false} activeOutlineColor="#2187e0" label="password" placeholder="password" secureTextEntry={true} style={styles.input} />
                            {<Text style={styles.error}>{values.password.length>1?errors.password:''}</Text>}
                        </View>
                        <View>
                            <Button loading={loading} style={styles.button(isValid)} disabled={!isValid} onPress={handleSubmit}>Register</Button>
                        </View>
                            </>
                           )}
                           </Formik>
                            <View style={{flexDirection:"row",justifyContent:"center"}}>
                                <Text>haven't you registered yet, </Text><TouchableOpacity onPress={()=>{navigation.navigate("Login")}}><Text style={{color:"#2187e0"}}>login</Text></TouchableOpacity>

                            </View>
                            <TouchableOpacity onPress={()=>{navigation.navigate("Verify")}}><Text style={{color:"#2187e0"}}>Verify Email</Text></TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    heading:{
        marginTop:20,
        fontSize:25,
        alignSelf:"center",
        fontWeight:"600",
    },
    icon: {
        marginTop: 10,
        marginBottom:20,
        alignSelf: "center",
        width: 100,
        height: 100,
    },
    inputContainer: {
        resizeMode: "contain",
    },
    input: { width: 250, margin: 10, },
    button:isValid=> ({ width: 200, marginVertical: 20, alignSelf: "center", }),
    error:{color:"red"},
})