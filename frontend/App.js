import { StatusBar } from 'expo-status-bar';
import { AuthenticationCheck } from "./src/services/auth/auth.check";
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
       <StatusBar style="auto" />
        <AuthenticationCheck/>
    </>

  );
}


