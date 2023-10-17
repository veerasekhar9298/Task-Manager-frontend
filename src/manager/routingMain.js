 import{useState,useEffect} from"react"
 import axios from "axios"
 import { Routes, Route, Link } from 'react-router-dom'

 import TaskDetails from "./TaskDetails"







 function RoutingMain (props){


    const [Tasks,setTasks] = useState([])


    useEffect(()=>{

        axios.get(`https://task-manager-fz33.onrender.com/api/tasks`)
            .then((response)=>{
                setTasks(response.data)
            })
            .catch((err)=>{
                alert(err)
            })
    
    },[])




    return( 
        <div>
                <h1> Tasks----{Tasks.length}</h1>
                <div>

              
               {
                    Tasks.map((ele,i)=>{
                        return <Link to ={`/tasks/${ele._id}`}> Task--{i+1}</Link>
                    })
                }
                
                <Routes>
                    <Route path="/tasks/:id" element={<TaskDetails/>}/>
                </Routes>
               
               </div>
         </div>
         )
 }


 export default RoutingMain;