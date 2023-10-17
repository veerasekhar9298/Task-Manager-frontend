import { useState,useEffect } from "react"
import axios from "axios"
import TaskItem from "./taskItem"
import {DragDropContext, Droppable,Draggable } from "react-beautiful-dnd"
function BasedonDate (props){

    const {Tasks} = props
     
    const initialDates = Tasks.reduce((prev, curr) => {
        const date = curr.dueDate.split("T")[0];
        if (!prev[date]) {
          prev[date] = [curr];
        } else {
          prev[date].push(curr);
        }
        return prev;
      }, {});
    
      
      const [datesState, setDatesState] = useState(initialDates);
  
      useEffect(() => {
        setDatesState(initialDates);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [Tasks]);

 
      const handleDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
        
        const sourceDate = result.source.droppableId;
        const destinationDate = result.destination.droppableId;
        const draggedTask = datesState[sourceDate][result.source.index];
      
        // Create a copy of the state to update
        const updatedDatesState = { ...datesState };
      
        if (sourceDate === destinationDate) {
          const updatedTasks = Array.from(updatedDatesState[sourceDate]);
          updatedTasks.splice(result.source.index, 1);
          updatedTasks.splice(result.destination.index, 0, draggedTask);
      
          updatedDatesState[sourceDate] = updatedTasks;
          setDatesState(updatedDatesState);
        } else {
          const sourceTasks = Array.from(updatedDatesState[sourceDate]);
          const destinationTasks = Array.from(updatedDatesState[destinationDate]);
      
          sourceTasks.splice(result.source.index, 1);
          draggedTask.dueDate = destinationDate; // Update the due date
      
          axios
            .put(`https://task-manager-fz33.onrender.com/api/tasks/${draggedTask._id}`, draggedTask)
            .then((response) => {
              if (response.status === 200) {
                destinationTasks.splice(result.destination.index, 0, response.data);
                updatedDatesState[sourceDate] = sourceTasks;
                updatedDatesState[destinationDate] = destinationTasks;
                setDatesState(updatedDatesState);
              }
            })
            .catch((error) => {
              alert(error);
            });
        }
      };
      

return(
    <div className="bg-primary bg-opacity-50 p-4 rounded-5">
       
      
      <DragDropContext onDragEnd={handleDragEnd}>
      {
          Object.keys(datesState).length >0 &&  Object.keys(datesState).map((ele,i)=>{
                    return (<div key={i}>
                        <h3 className="display-4"> Date :  {ele}</h3>
                        <Droppable droppableId={`${ele}`}>
                        {(provided) => (
                        <div
                            className='flex-center bg-danger bg-opacity-50 rounded-5 shadow'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                            datesState[ele].map((ele,i2)=>{
                                return (
                                    <Draggable key = {i2} draggableId={`${ele._id}`} index={i2}>
                                        {(provided)=>(
                                            <div className="tasks" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <TaskItem key={i2} {...ele}/>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            }) 
                            }
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                    </div>)
            })
        }
      </DragDropContext>
     
    </div>
)
}

export default BasedonDate







