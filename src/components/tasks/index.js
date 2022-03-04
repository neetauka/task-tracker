/**
 * Since this is the main entry point of you app,
 * the idea is to fetch the tasks from the server
 */
import React, {useCallback, useEffect, useState} from 'react';
import TaskItem from "./TaskItem"
import useApi from "../../api/useApi";

const NoTaskList = () => {
    return (
        <div className="no-task-list">
            <h2>No tasks yet</h2>
            <p>
                You can add a task by clicking on the button above
            </p>
        </div>
    )
}

const TasksList = () => {

    const {fetchTasks, deleteTask, fetchTask, updateTask} = useApi()

    const [tasks, setTasks] = useState([])

    // get the tasks from the server when component is mounted
    useEffect(() => {
        // wrap in an anonymous function to avoid thread blocking
        // task will be populated whenever there's data from the server
        (async () => {
            const tasks = await fetchTasks()
            if (tasks) {
                setTasks(tasks)
            }
        })()
    }, [])

    // use a callback to update the tasks list when a task is deleted
    const onDeleteTask = useCallback(async (id) => {
        try {
            // delete task from the server
            await deleteTask(id)

            // update local state of deleted task
            const newTasks = tasks.filter(task => task.id !== id)
            setTasks(newTasks)
        } catch (e) {
            // panic if error while running this action
            console.warn("Error deleting task", e)
        }
    }, [tasks])


    const onToggle = useCallback(async (taskId) => {
        if (!taskId) {
            console.error("No task id provided")
            return
        }

        /**
         *  No need to fetch the task again from the server since ..
         *  .. local state is already updated
         */
            // const task = fetchTask(taskId)

            // find the task in the list instead of fetching it again from the server
        const task = tasks.find(task => task.id === taskId)

        if (!task) {
            console.error("No task found with id, refusing toggling..", taskId)
            return
        }

        const updateTaskPayload = {
            ...task,
            reminder: !task.reminder
        }

        try {
            const result = await updateTask(taskId, updateTaskPayload)
            // update local state
            setTasks(tasks.map(task => task.id === taskId ? result : task))
        } catch (e) {
            console.error("Error updating task", e)
        }

    }, [tasks])

    return (
        <div>
            {tasks.length === 0 && <NoTaskList/>}

            {tasks.map((task) => (
                <TaskItem key={task.id}
                          task={task}
                          onDelete={onDeleteTask}
                          onToggle={onToggle}
                />
            ))}
        </div>
    )
}

export default TasksList
