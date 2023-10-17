 
    import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"

 function TaskDetails (props){

    const {id} = useParams()

            const [Task,setTask] = useState({})

        useEffect(()=>{
            axios.get(`https://task-manager-fz33.onrender.com/api/tasks/${id}`)
            .then((response)=>{
                console.log(response.data)
                setTask(response.data)
            })
        },[id])

    return(
        <div>
            <p> Task ---{id}</p>
            {
                Object.keys(Task).length >0 && (<div>
                    <h2> {Task.title}</h2>

                </div>)
            }
        </div>
    )
 }

 export default TaskDetails;