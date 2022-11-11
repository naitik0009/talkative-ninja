import { createContext,useState } from "react";
export const UserDataContext = createContext();

export const UserDataProvider = ({children})=>{
    const [profile,setProfile] = useState("https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg");
    return (
        <UserDataContext.Provider value={{profile,setProfile}}>{children}</UserDataContext.Provider>
    )
}