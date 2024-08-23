import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import { Task } from "../../types"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"

interface TaskCardProps {
  task: Task
  handleDeleteModal: () => void
  onChangeEditModal: () => void
  setSelectedTaskId: (id: string) => void
  setSelectedTask: (task: Task) => void
  handleUpdateTaskStatus: (id: string) => void
}

const TaskCard = ({
  task,
  handleDeleteModal,
  onChangeEditModal,
  setSelectedTaskId,
  handleUpdateTaskStatus,
  setSelectedTask,
}: TaskCardProps) => {
  const { id, title, priority, status, progress } = task

  const onClickDeleteIcon = (id: string) => {
    setSelectedTaskId(id)
    handleDeleteModal()
  }

  const onClickEditIcon = (task: Task) => {
    setSelectedTask(task)
    onChangeEditModal()
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={() => handleUpdateTaskStatus(id)}>
          {status}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={() => onClickEditIcon(task)} />
        <DeleteIcon onClick={() => onClickDeleteIcon(id)} className="cp" />
      </div>
    </div>
  )
}

export default TaskCard
