import axios from "axios"
import { useState,useEffect } from "react"





function TaskForm (props){

    const {Tasks,addTask,select,isEdit,updateTask} = props



    const [title,setTitle] = useState("")
    const [discription,setDiscription] = useState("")
    const [isCompleted,setIsCompleted] = useState(false)
    const [dueDate,setdueDate] = useState("")

    const [formErrors,setFormErrors] = useState({})
    const errors = {}

     const runValidations =()=>{
        
        if(title.trim().length ===0){
            errors.title = "Title is Required"
        }

        if(discription.trim().length ===0){
            errors.description = "Description is Required"
        }
        if(dueDate.trim().length ===0){
            errors.dueDate = "due Date is required"
        }
     }


        const HandleSubmit = (e)=>{
            e.preventDefault()
            runValidations()
            if(Object.keys(errors).length ===0){
                const data = {title,discription,isCompleted,dueDate}
                
                axios.post(`https://task-manager-fz33.onrender.com/api/tasks`,data)
                .then((response)=>{
                    if(response.status === 200){
                    
                        addTask(response.data)
                    }
                })
            }
            setFormErrors(errors)
        }   


        const HandleEdit = (e)=>{
            e.preventDefault()
            runValidations()
            if(Object.keys(errors).length ===0){
                const updateData = {title,discription,isCompleted,dueDate} 
                axios.put(`https://task-manager-fz33.onrender.com/api/tasks/${select._id}`,updateData)
                .then((response)=>{
                    if(response.status ===200){
                        updateTask(response.data)
                    }
                })
            }
        }


        useEffect(()=>{

            if(isEdit){
                setTitle(select.title)
                setDiscription(select.discription)
                setIsCompleted(select.isCompleted)
                setdueDate(new Date(select.dueDate).toISOString().split('T')[0])
            }


        },[select,isEdit])
        

        useEffect(()=>{

            setTitle("")
            setDiscription("")
            setIsCompleted(false)
            setdueDate("")
        },[Tasks])


    return(
        <div>
            {isEdit ? <h3 className="display-6"><span className="bg-success  text-white p-2 rounded-3"> Edit Task Form</span></h3> : <h3 className="display-6"><span className="bg-primary text-white p-2 rounded-3"> Add Tasks Form</span></h3>}
            
            <form onSubmit={isEdit ? HandleEdit : HandleSubmit}>
                <label className="mt-3 fw-bold"> Title : <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control" placeholder="Title" /></label> <br/> {formErrors.title && <span className="text-danger fw-bold">*{formErrors.title}</span>} <br/>
                <label className="mt-2 fw-bold"> Description : <textarea value={discription} onChange={(e)=>{setDiscription(e.target.value)}} className="form-control"></textarea></label> <br/>{formErrors.description && <span className="text-danger fw-bold">*{formErrors.description}</span>} <br/>
                <label className="mt-2 fw-bold"> <input type="checkbox" className="form-check-input" checked={isCompleted} onChange={(e)=>{setIsCompleted(e.target.checked)}} /> Done </label> <br/>
                <label className="mt-2 fw-bold"> <input type="date"  value={dueDate} onChange={(e)=>{setdueDate(e.target.value)}} className="form-control"/></label> <br/>{formErrors.dueDate && <span className="text-danger fw-bold">*{formErrors.dueDate}</span>} <br/>
                    {isEdit ?<input type="submit" value="Update Task" className="btn btn-warning m-4"/> :<input type="submit" value="Add Task" className="btn btn-primary m-4"/>}
            </form>
        </div>
    )
} 

export default TaskForm