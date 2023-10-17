import TaskItem from "./taskItem"

function Listing(props){

    const {h,data} = props



return (
    <div>
        <h3 className="display-4">{h}</h3>
        {
            data.map((ele,k)=>{
                return <TaskItem key = {k} {...ele}/>
            })
        }
    </div>
)
}

export default Listing