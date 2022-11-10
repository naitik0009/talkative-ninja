
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/auth/login.screen";
import { RegisterScreen } from "../screens/auth/register.screen";
import { HomeScreen } from "../screens/home/home.screen";
import { NavigationContainer } from '@react-navigation/native';
import { UserDataProvider } from "../context/context.api";
const Stack = createNativeStackNavigator();

export const StackScreens = ({state}) => {
    return (
     state.userToken!=null?<UserDataProvider>
       <NavigationContainer>
     {
     <Stack.Navigator  screenOptions={{headerShown:false}}>
 {state.userToken==null
        ?( <>
        <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Register" component={RegisterScreen} />
        </>)
        :
        (
       <Stack.Screen name="Home" component={HomeScreen} />
        )
        }
    </Stack.Navigator>
}
</NavigationContainer>
     </UserDataProvider>: <NavigationContainer>
      {
      <Stack.Navigator  screenOptions={{headerShown:false}}>
  {state.userToken==null
         ?( <>
         <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
         </>)
         :
         (
        <Stack.Screen name="Home" component={HomeScreen} />
         )
         }
     </Stack.Navigator>
}
</NavigationContainer>
    )
}