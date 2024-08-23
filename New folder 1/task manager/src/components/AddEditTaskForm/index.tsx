import classNames from "classnames"
import { ChangeEvent, useEffect, useState } from "react"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import { TaskProgress, TaskStatus } from "../../enums"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"

type NewTask = {
  id?: string
  title: string
  priority: "high" | "medium" | "low"
  status?: TaskStatus
  progress?: TaskProgress
}

type AddEditTaskFormProps = {
  handleAddEditModal: () => void
  addEditTask: (newTask: NewTask) => void
  selectedTask: NewTask
  currentModal: "add" | "edit" | ""
}

const AddEditTaskForm = ({ handleAddEditModal, addEditTask, selectedTask, currentModal }: AddEditTaskFormProps) => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    priority: "low",
    status: TaskStatus.TODO,
    progress: TaskProgress.TODO,
  })

  useEffect(() => {
    if (currentModal !== "add") {
      setNewTask({
        id: selectedTask.id,
        title: selectedTask.title,
        priority: selectedTask.priority,
        status: selectedTask.status,
        progress: selectedTask.progress,
      })
    }
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewTask((prevState) => ({
      ...prevState,
      title: value,
      id: currentModal === "add" ? Date.now().toString() : selectedTask.id,
    }))
  }

  const selectedPriority = (priority: "high" | "medium" | "low" | string) => {
    setNewTask((prevState) => ({ ...prevState, priority: priority as "high" | "medium" | "low" }))
  }

  const handleEditNewTask = () => {
    addEditTask(newTask)
    handleAddEditModal()
  }

  const { title } = newTask

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title"> {currentModal === "add" ? "Add Task" : "Edit Task"} </span>
            <Close onClick={handleAddEditModal} className="cp" />
          </div>
          <Input label="Task" placeholder="Type your task here..." onChange={onChange} name="title" value={title} />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li
                  key={priority}
                  className={classNames(priority === newTask.priority && `${priority}-selected`, priority)}
                  onClick={() => selectedPriority(priority)}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={currentModal === "add" ? "Add" : "Edit"}
              disabled={title.trim().length < 1}
              onClick={handleEditNewTask}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
