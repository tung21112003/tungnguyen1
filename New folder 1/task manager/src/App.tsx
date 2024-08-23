import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { TaskProgress, TaskStatus } from "./enums"
import { taskList } from "./siteData/taskList"
import { Task } from "./types"

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(taskList)
  const [selectedTaskId, setSelectedTaskId] = useState<string>("")
  const [selectedTask, setSelectedTask] = useState<any | {}>({})
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [currentModal, setCurrentModal] = useState<"add" | "edit" | "">("")

  const onChangeAddModal = () => {
    setShowAddEditModal(!showAddEditModal)
    setCurrentModal("add")
  }

  const onChangeEditModal = () => {
    setShowAddEditModal(!showAddEditModal)
    setCurrentModal("edit")
  }

  const handleAddEditModal = () => {
    setShowAddEditModal(!showAddEditModal)
  }

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => id !== task.id))
  }

  const handleUpdateTaskStatus = (id: string) => {
    const update = tasks.map((task) => {
      if (task.id === id) {
        switch (task.status) {
          case TaskStatus.TODO:
            return {
              ...task,
              status: TaskStatus.IN_PROGRESS,
              progress: TaskProgress.IN_PROGRESS,
            }
          case TaskStatus.IN_PROGRESS:
            return {
              ...task,
              status: TaskStatus.DONE,
              progress: TaskProgress.DONE,
            }
          case TaskStatus.DONE:
            return {
              ...task,
              status: TaskStatus.TODO,
              progress: TaskProgress.TODO,
            }
          default:
            return task
        }
      } else {
        return task
      }
    })
    setTasks(update)
  }

  const addEditTask = (newTask: Task) => {
    if (currentModal === "add") {
      setTasks([newTask, ...tasks])
    } else {
      const EditedTask = tasks.map((task) => (task.id === selectedTask.id ? newTask : task))
      setTasks(EditedTask)
    }
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={onChangeAddModal} />
        </div>
        <div className="task-container">
          {tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleDeleteModal={handleDeleteModal}
              onChangeEditModal={onChangeEditModal}
              setSelectedTaskId={setSelectedTaskId}
              setSelectedTask={setSelectedTask}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          handleAddEditModal={handleAddEditModal}
          currentModal={currentModal}
          addEditTask={addEditTask}
          selectedTask={selectedTask}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          handleDeleteModal={handleDeleteModal}
          handleDeleteTask={handleDeleteTask}
          selectedTaskId={selectedTaskId}
        />
      )}
    </div>
  )
}

export default App
