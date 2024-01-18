import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import {Drawer, Link} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function App() {
    //const url = `${import.meta.env.VITE_API_URL}/api/locations`;

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
                            {text: 'AddExercise', path: '/CreatePage'},
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
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/CreatePage" element={<CreatePage/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </>
}

export default App;