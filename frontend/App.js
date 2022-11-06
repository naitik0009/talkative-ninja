import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { SignInStack, SignOutStack } from "./src/routes/navigation";
export default function App() {
  return (
    <NavigationContainer>
       <StatusBar style="auto" />
        {/* <SignInStack/> */}
        <SignOutStack/>
    </NavigationContainer>

  );
}


