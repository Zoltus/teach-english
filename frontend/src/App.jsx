import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import CreateExercisePage from "./pages/CreateExercisePage.jsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Drawer} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Database from "./Database.jsx";
import SchoolIcon from '@mui/icons-material/School';
import StudyPage from "./pages/StudyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LoginIcon from '@mui/icons-material/Login';

function App() {
    const [exercises, setExercises] = useState([]);
    const [currentExercise, setCurrentExercise] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                <Drawer
                    anchor="left"
                    variant="permanent"
                    className="min-w-[240px] flex-shrink-0"
                    sx={{'& .MuiDrawer-paper': {width: 240}}}>
                    <div className="flex flex-col h-full justify-between"> {/* Added flex container */}
                        <List className="mt-20">
                            <ListItem key="1" disablePadding>
                                <div className="w-full">
                                    <Link to="/">
                                        <ListItemButton className="w-full">
                                            <ListItemIcon>
                                                <SchoolIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Exercises" />
                                        </ListItemButton>
                                    </Link>
                                </div>
                            </ListItem>
                            { isAuthenticated &&
                                <ListItem key="2" disablePadding>
                                    <div className="w-full">
                                        <Link to="/panel">
                                            <ListItemButton className="w-full">
                                                <ListItemIcon>
                                                    <AddIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Exercise" />
                                            </ListItemButton>
                                        </Link>
                                    </div>
                                </ListItem>
                            }
                        </List>
                        <List>
                            <ListItem disablePadding>
                                <div className="w-full">
                                    <Link to="/login">
                                        <ListItemButton className="w-full">
                                            <ListItemIcon>
                                                <LoginIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Login" />
                                        </ListItemButton>
                                    </Link>
                                </div>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <div className="flex-1 flex-grow-1 mx-16">
                    <div className="flex h-screen">
                        <main className="flex-1 p-4">
                            <Routes>
                                <Route path="/" element={<ExercisesPage exercises={exercises}
                                                                        setCurrentExercise={setCurrentExercise}/>}/>
                                <Route path="/panel" element={<CreateExercisePage exercises={exercises}
                                                                                  setExercises={setExercises}/>}/>
                                <Route path="/study"
                                       element={<StudyPage currentExercise={currentExercise}
                                                           setCurrentExercise={setCurrentExercise}/>}/>
                                <Route path="/panel"
                                       element={isAuthenticated ? <CreateExercisePage/> : <Navigate to="/login"/>}/>
                                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </Router>
    </>
}

export default App;