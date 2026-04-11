import { useContext } from "react"
import { AuthContext } from "./context"

export const useUser = ()=>{
    const ctx = useContext(AuthContext)
    if(!ctx){
        throw new Error("useUser must be used within an AuthProvider")
    }
    return ctx
}