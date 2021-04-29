import React, {useContext} from "react";

const UserContext = React.createContext('non-auth')

export default function useUserLogin() {
    const login = useContext(UserContext)
    return login
}