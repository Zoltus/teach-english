import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import CreateExercisePage from "./pages/CreateExercisePage.jsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import Database from "./Database.jsx";
import SchoolIcon from '@mui/icons-material/School';
import StudyPage from "./pages/StudyPage.jsx";

function App() {
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState();

    // Fetch data on mount
    useEffect(() => {
        (async () => {
            const fetched = await Database.getAllExercises();
            setExercises(fetched);
        })();
    }, []);

    return <>
        <Router>
            <div className="flex bg-gray-200">

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/CreateExercisePage">create</Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex-1 flex-grow-1 mx-16">

                    <div className="flex h-screen">
                        <main className="flex-1 p-4">
                            <Routes>
                                <Route path="/" element={<ExercisesPage exercises={exercises}
                                                                        setCurrentExercise={setCurrentExercise}/>}/>
                                <Route path="/CreateExercisePage" element={<CreateExercisePage exercises={exercises}
                                                                                              setExercises={setExercises}/>}/>
                                <Route path="/StudyPage" element={<StudyPage currentExercise={currentExercise}
                                                                            setCurrentExercise={setCurrentExercise}/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </Router>
    </>
}

export default App;