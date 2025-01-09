import { useWorkoutContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Details = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    
    const handleClick = async () => {
        const res = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        }) 
        const json = await res.json()

        if (res.ok) {
            dispatch({type: 'DELETE_WORKOUTS', payload: json})
        }
    }
    
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick}></span>
        </div>
    )
}

export default Details