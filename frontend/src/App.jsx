import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import CreateExercisePage from "./pages/CreateExercisePage.jsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Drawer, Link} from "@mui/material";
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
        <BrowserRouter>
            <div className="flex bg-gray-200">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {width: 240},
                    }}>
                    <List>
                        {[{text: 'Exercises', path: '/'},
                            {text: 'Add Exercise', path: '/CreateExercisePage'},
                        ].map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.path}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <SchoolIcon/> : <AddIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div className="flex-1 flex-grow-1 mx-16">
                    <div className="flex h-screen">
                        <main className="flex-1 p-4">
                            <Routes>
                                <Route path="/" element={<ExercisesPage exercises={exercises} setCurrentExercise={setCurrentExercise}/>}/>
                                <Route path="/CreateExercisePage" element={<CreateExercisePage exercises={exercises} setExercises={setExercises}/>}/>
                                <Route path="/StudyPage" element={<StudyPage currentExercise={currentExercise} setCurrentExercise={setCurrentExercise}/>} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </>
}

export default App;