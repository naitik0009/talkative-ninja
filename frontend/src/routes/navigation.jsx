import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/auth/login.screen";
import { RegisterScreen } from "../screens/auth/register.screen";
import { HomeScreen } from "../screens/home/home.screen";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
export const SignInStack = () => {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export const SignOutStack = () => {
    return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
       </NavigationContainer>
    )
}