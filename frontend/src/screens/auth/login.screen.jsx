import { Image, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "@rneui/themed";
import React from "react";
import { authentication } from "../../services/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik"
import * as yup from "yup";
export const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = React.useState(false);
    const LoginformSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("email is required"),
        password: yup.string().required("password is required").min(6).max(10),
    });

    const SignIn = async (email, password) => {
        setLoading(true);
        await signInWithEmailAndPassword(authentication, email, password).then((result) => {setLoading(false);}).catch((error) => {setLoading(false);alert(error)});
    }
    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.heading}>Welcome to signal,</Text>
                            <Image style={styles.icon} defaultSource={require("../../assets/icons/signal.png")} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png" }} />
                            <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginformSchema} validateOnMount={true} onSubmit={(values) => { SignIn(values.email,values.password); }}>
                                {({ handleBlur, handleChange, errors, isValid, handleSubmit, values }) => (
                                    <>
                                        <View style={styles.inputContainer}>
                                            <TextInput mode="outlined" onChangeText={handleChange("email")} value={values.email} onBlur={handleBlur("email")} autoFocus={false} activeOutlineColor="#2187e0" label={"email"} placeholder="email" style={styles.input} />

                                            {<Text style={styles.error}>{values.email.length > 1 ? errors.email : ""}</Text>}

                                            <TextInput value={values.password} mode="outlined" onChangeText={handleChange("password")} onBlur={handleBlur("password")} autoFocus={false} activeOutlineColor="#2187e0" label="password" placeholder="password" secureTextEntry={true} style={styles.input} />
                                            {<Text style={styles.error}>{values.password.length > 1 ? errors.password : ''}</Text>}
                                        </View>
                                        <View>
                                            <Button loading={loading} style={styles.button(isValid)} disabled={!isValid} onPress={handleSubmit}>Login</Button>
                                        </View>
                                    </>
                                )}
                            </Formik>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Text>haven't you registered yet, </Text><TouchableOpacity onPress={() => { navigation.navigate("Register") }}><Text style={{ color: "#2187e0" }}>register</Text></TouchableOpacity>
                            </View>
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
    heading: {
        marginTop: 20,
        fontSize: 25,
        alignSelf: "center",
        fontWeight: "600",
    },
    icon: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: "center",
        width: 100,
        height: 100,
    },
    inputContainer: {
        resizeMode: "contain",
    },
    input: { width: 250, margin: 10, },
    button: isValid => ({ width: 200, marginVertical: 20, alignSelf: "center", }),
    error: { color: "red" },
})