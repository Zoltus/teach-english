import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import CreateExercicePage from "./pages/CreateExercicePage.jsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import {Drawer, Link} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Database from "./Database.jsx";

function App() {
    const [exercises, setExercises] = useState([]);

    const addExercise = async (exercise) => {
        setExercises([...exercises, exercise]);
        await Database.addExercice(exercise);
    };

    return <>
        <BrowserRouter>
            <div className={"flex"}>
                <Drawer
                    anchor="left"
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {width: 240},
                    }}
                >
                    <List>
                        {[{text: 'Home', path: '/'},
                            {text: 'AddExercise', path: '/CreateExercicePage'},
                        ].map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.path}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <HomeIcon/> : <AddIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div className={"flex-1 flex-grow-1"}>
                    <div className="flex h-screen bg-gray-200">
                        <main className="flex-1 p-4">
                            <Routes>
                                <Route path="/" element={<ExercisesPage exercises={exercises}/>}/>
                                <Route path="/CreateExercicePage" element={<CreateExercicePage addExercise={addExercise}/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </>
}

export default App;