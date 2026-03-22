
import { useContext } from "react";
import { GuestContext } from "../context/GuestContext";

export const useGuest = () =>{
    return useContext(GuestContext);
}