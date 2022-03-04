import Header from './components/partials/Header'
import Footer from './components/partials/Footer';
import {useState} from "react"
import TaskRoutes from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    return (
        <div className="container">
            <BrowserRouter>
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />
                    <TaskRoutes/>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App;
