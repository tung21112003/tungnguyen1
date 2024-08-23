import Button from "../Button"
import Modal from "../Modal"
import "./style.scss"

type DeleteModalProps = {
  handleDeleteModal: () => void
  handleDeleteTask: (taskId: string) => void
  selectedTaskId: string
}

const DeleteModal = ({ handleDeleteModal, handleDeleteTask, selectedTaskId }: DeleteModalProps) => {
  const onClickDeleteButton = () => {
    handleDeleteTask(selectedTaskId)
    handleDeleteModal()
  }

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={onClickDeleteButton} />
          <Button title="Cancel" outline onClick={handleDeleteModal} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
