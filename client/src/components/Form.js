import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"


const Forms = () => {
    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [err, setErr] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json()

        if (!res.ok) {
            setErr(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (res.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setErr(null)
            setEmptyFields([])
            console.log('New Workout Record Added!', json)
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
    } 


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>

            <label>Excercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Total Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Submit</button>
            {err && <div className="error">{err}</div>}
        </form>
    )
}

export default Forms