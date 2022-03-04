/**
 * This should be the single source of truth from you task data
 * @returns {{fetchTask: ((function(*): Promise<any|undefined>)|*), deleteTask: ((function(*): Promise<void>)|*), fetchTasks: (function(): any), addTask: (function(*=): any)}}
 */

// Fetch Index
const useApi = () => {
    // Root URL
    const BASE_URL = 'http://localhost:5000';
    // Task pragma URL
    const TASK_URL = `${BASE_URL}/tasks`;

    /**
     * Fetch all tasks
     * @returns {Promise<any>}
     */
    const fetchTasks = async () => {
        try {
            const response = await fetch(TASK_URL);
            return await response.json();
        } catch (e) {
            console.error("[Fetch Tasks Error] ", e)
        }
    }

    /**
     * Fetch a single task
     * @param id
     * @returns {Promise<any>}
     */
    const fetchTask = async (id) => {
        try {
            const res = await fetch(`${TASK_URL}/${id}`)
            return await res.json()
        } catch (error) {
            console.error("[Fetch Task Error] ", error)
        }
    }


    /**
     * Deletes a task from the server
     * @param id
     * @returns {Promise<void>}
     */
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`,
            {method: 'DELETE'})
    }

    //Add task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        return await res.json()
        // const id = Math.floor(Math.random() * 1000)+ 1
        // const newTask = { id,...task}
        // setTasks([...tasks, newTask])
    }

    /**
     * Update task here
     * @param id
     * @param payload
     * @returns {Promise<any>}
     */
    const updateTask = async (id, payload) => {
        const res = await fetch(`${TASK_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        return await res.json()
    }

    return {
        addTask, deleteTask, fetchTasks, fetchTask, updateTask
    }
}


export default useApi
