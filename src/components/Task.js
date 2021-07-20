
import Tasks from "./Tasks"

function Task({tasks, onDelete, onToggle}) {
  
    return (
        <>
           {tasks.map((task)=>(
               <Tasks key={task.id} task={task} onDelete={ onDelete } onToggle={ onToggle }/>
           ))} 
        </>
    )
}

export default Task
