/**
 * You can use this file to add your custom routes.
 * so, the idea here is that you can have multiple routes pointing to different sections of your app
 */

import {Route, Routes} from "react-router-dom";
import About from "./components/About";
import TasksList from "./components/tasks";

const TaskRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<TasksList/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>
    )
}

export default TaskRoutes;