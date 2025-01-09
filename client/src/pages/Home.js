import { useEffect } from "react"
import Details from '../components/Details'
import Forms from "../components/Form"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts/')
            const json = await res.json()

            if (res.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <Details key={workout._id} workout={workout}/>
                ))}
            </div>
            <Forms /> 
        </div>
    )
}

export default Home