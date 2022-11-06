import { useEffect, useState } from "react";
import { SignInStack,SignOutStack } from "../../routes/navigation";
import { authentication } from "../firebase/firebase";

export const AuthenticationCheck = ()=>{
    const [currentUser,setCurrentUser] = useState(null);
    const userhandler = (user) => user ? setCurrentUser(user) : setCurrentUser(null);
    
    useEffect(()=>{
        const current = authentication.onAuthStateChanged((user)=>
            user?userhandler(user.uid):userhandler(null)  
        );
        return current;
    },[currentUser]);
console.log(currentUser);
    return(<>{currentUser!=null?<SignInStack/>:<SignOutStack/>}</>);
}