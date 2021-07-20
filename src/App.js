import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
   const getTasks = async()=>{
     const fetchFromServer = await fetchTasks()
     setTasks(fetchFromServer)
   }
    getTasks()
  }, [])
//FETCH TASKS
const fetchTasks = async()=>{
  const res = await fetch('http://localhost:5000/tasks')
  const data = res.json()

  return data

}
//FETCH TASKS update
const fetchTask = async(id)=>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = res.json()

  return data

}


//Add task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),     
  })
const data = await res.json()


setTasks([...tasks, data])



  // const id = Math.floor(Math.random() * 10000) + 1;
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])

}

//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{ 
     method:'DELETE',
     })

  setTasks(tasks.filter((task)=> task.id !== id))
}

//Toggle reminder
const toggleReminder = async(id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })
  const data = await res.json()


  setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task))
}

  return (
    <Router>
      <div className="container">
      <Header onAdd={() => (setShowAddTask(!showAddTask))} showAdd={showAddTask}/>
      <Route path='/' exact render={(props)=>(
        <>
        {showAddTask && <AddTask  onAdd={addTask} />}
        <Task tasks ={tasks} onDelete = {deleteTask} onToggle={toggleReminder} />

        
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
