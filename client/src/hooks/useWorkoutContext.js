import { useContext } from "react";
import { Context } from "../context/workoutContext";

export const useWorkoutContext = () => {
    const context = useContext(Context)

    if (!context) {
        throw Error('useContext must be used inside an ContextProvider')
    }

    return context
}