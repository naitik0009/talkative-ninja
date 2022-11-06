import { HomeScreen } from "./src/screens/home/home.screen";
import { NavigationContainer } from "@react-navigation/native";
import { SignInStack } from "./src/routes/navigation";
export default function App() {
  return (
    <NavigationContainer>
        <SignInStack/>
    </NavigationContainer>

  );
}


