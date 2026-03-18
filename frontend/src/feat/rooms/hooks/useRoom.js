import { useContext } from "react";


import { RoomContext } from "../context/roomContext";

export const useRoom = () => {
    return useContext(RoomContext);
}