import { useState,useEffect } from "react"
import BasedonDate from "./BasedDate"
import Listing from "./listing"
import TaskForm from "./form"
import TasksList from "./tasklist" 
import axios from "axios"
import { useSpring, animated,config } from 'react-spring';



function Manage(props) {
            
    const [Tasks,setTasks] = useState([])

    const [select,setSelect] = useState({})

    const [isEdit,setIsEdit] = useState(false)

    const addTask = (T)=>{
        setTasks([...Tasks,T])
    }

    const totalTasksAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.5)' },
        to: async (next, cancel) => {
          while (true) {
            await next({ opacity: 1, transform: 'scale(1)' });
            await next({ transform: 'scale(1.2)' });
            await next({ transform: 'scale(1)' });
          }
        },
        config: config.slow, // Use a slower easing function
      });


    const editTask = (id)=>{

        const result = Tasks.find((ele)=>ele._id === id)
            setSelect(result)
            setIsEdit(true)
    }

    const updateTask = (U)=>{
        const result = Tasks.map((ele)=>{
            if(ele._id === U._id){
                return {...U}
            }else{
                return {...ele}
            }
        })
        setTasks(result)
        setIsEdit(false)
    }

    const delTask = (id)=>{
         axios.delete(`https://task-manager-fz33.onrender.com/api/tasks/${id}`)
         .then((response)=>{
            if(response.status===200){
                const res = Tasks.filter((ele)=>ele._id !== response.data._id)
                setTasks(res)
            }
         })
         .catch((err)=>{
            alert(err)
         })
    }


    const toggleEdit = (R)=>{
       const result = Tasks.map((ele)=>{
        if(ele._id === R._id){
            return {...ele,isCompleted:R.isCompleted}
        }else{
            return{...ele}
        }
       })
       setTasks(result)
    }

useEffect(()=>{

    axios.get(`https://task-manager-fz33.onrender.com/api/tasks`)
        .then((response)=>{
            setTasks(response.data)
        })
        .catch((err)=>{
            alert(err)
        })

},[])

const saparateList = Tasks.reduce((PreV,CurrV)=>{
        if(! CurrV.isCompleted && new Date(CurrV.dueDate) < new Date() && !PreV["overDue"]){
            PreV["overDue"] = [CurrV]
        }else if(! CurrV.isCompleted && new Date(CurrV.dueDate) < new Date()){
            PreV["overDue"].push(CurrV)
        }else if(! CurrV.isCompleted && new Date(CurrV.dueDate) > new Date() && !PreV["upComing"]){
            PreV["upComing"] = [CurrV]
        }
        else if(! CurrV.isCompleted && new Date(CurrV.dueDate) > new Date()){
            PreV["upComing"].push(CurrV)
        }
        return PreV
    },{})

  
    
   
   


return (
  <div className="container mt-5">
    <h2 className="display-3">
      <span className=" bg-warning rounded-5 p-3">Tasks Manger App</span>
    </h2>
    <div className="row">
      <div className="col-lg-8 mt-3">
      <animated.h3
        className="m-4 display-6 text-info-emphasis"
        style={{
          ...totalTasksAnimation, // Apply the animation style
          whiteSpace: 'nowrap', // Prevent text from wrapping
          display: 'inline-block', // Maintain inline behavior
        }}
      >
        {' '}
        Total Tasks ---- {Tasks.length}
      </animated.h3>
        <h5 className="my-2 fw-bold"> progress of tasks</h5>
        <div class="progress m-2">
          <div
            class="progress-bar progress-bar-striped bg-success progress-bar-animated "
            role="progressbar"
            aria-valuenow={Tasks.filter((ele) => ele.isCompleted).length}
            aria-valuemin="0"
            aria-valuemax={Tasks.length}
            style={{ width: ((Tasks.filter((ele) => ele.isCompleted).length / Tasks.length) *
            100) + '%' }}

          >
            <span className="position-absolute text-dark fw-bold w-50 text-center">
              {Math.round(
                (Tasks.filter((ele) => ele.isCompleted).length / Tasks.length) *
                  100
              )}
              %
            </span>
          </div>
        </div>

        <TasksList
          Tasks={Tasks}
          delTask={delTask}
          editTask={editTask}
          toggleEdit={toggleEdit}
        />
      </div>
      <div className="col-lg-4 mt-3">
        <TaskForm
          Tasks={Tasks}
          addTask={addTask}
          select={select}
          isEdit={isEdit}
          updateTask={updateTask}
        />
      </div>
    </div>
    <div className="row">
      {Object.keys(saparateList).map((ele, i) => {
        return <Listing h={ele} data={saparateList[ele]} key={i} />;
      })}
    </div>

    <div className="row">
      <BasedonDate Tasks={Tasks} />
    </div>
  </div>
);
}

export default Manage;