import TaskItem from "./taskItem"

function TasksList (props){

    const {Tasks,delTask,editTask,toggleEdit} = props



return(<div className="mt-4">
            {
                Tasks.map((ele,i)=>{
                    return <TaskItem key={i} {...ele} delTask={delTask} editTask={editTask} toggleEdit={toggleEdit} />
                })
            }
    </div>)
} 

export default TasksList