import { useState } from "react";
import axios from "axios";




function TaskItem (props){
    const {_id,title,isCompleted,dueDate,delTask,editTask,toggleEdit} = props 

        const [toggle,setToggle] = useState(isCompleted)

        const handleToggle = () => {
                    setToggle(!toggle);

                    axios.put(`https://task-manager-fz33.onrender.com/api/tasks/${_id}`, { isCompleted: !toggle })
                        .then(response => {
                            if (response.status === 200) {
                                toggleEdit(response.data)
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }


    return(<p className="fw-bold m-2 rounded-5 shadow mx-3 d-inline-block bg-warning bg-opacity-40"><span className="text-danger mx-3"> Title :</span>{title}   <span className="text-danger mx-2">Status : </span> <input type="checkbox" className="form-check-inline" checked={toggle} onChange={handleToggle}/>{toggle ? "Completed":"inComplete"}   <span className="text-danger mx-2">DuteDate :</span>{new Date(dueDate).toLocaleDateString()} <button className="btn btn-danger m-2 fw-bold" onClick={()=>{delTask(_id)}}> Delete</button> <button onClick={()=>{editTask(_id)}} className="btn btn-info fw-bold mx-3" > Edit</button></p>)
}   

export default TaskItem;