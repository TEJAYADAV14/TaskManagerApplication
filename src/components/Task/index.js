import './index.css'
import React, {useState} from 'react'

function Task({task, onEditTask, onDeleteTask}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState({...task})
  const [isSelected, setIsSelected] = useState(false)

  const handleEditChange = e => {
    const {name, value} = e.target
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleEditSubmit = e => {
    e.preventDefault()
    onEditTask(task.id, editedTask)
    setIsEditing(false)
  }

  const handleToggleCompleted = () => {
    onEditTask(task.id, {...editedTask, completed: !editedTask.completed})
    setIsSelected(!isSelected)
  }

  return (
    <div className="task">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            className="task-form-input"
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
          />
          <input
            className="task-form-input"
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
          />
          <input
            className="task-form-input"
            type="text"
            name="priority"
            value={editedTask.priority}
            onChange={handleEditChange}
          />
          <input
            className="task-form-input"
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleEditChange}
          />
          <button type="submit" className="task button">
            Save
          </button>
        </form>
      ) : (
        <div className="appointment-item">
          <div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={editedTask.completed}
                onChange={handleToggleCompleted}
                className="completed-box"
              />
            </div>
            <h3
              style={{
                textDecoration: isSelected ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate}</p>
          </div>
          <div>
            <button className="task button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="task button"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Task
