import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Database from "../Database.jsx";

const LoginPage = ({setIsAuthenticated}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Loginsubmit")
        const result = await Database.auth({ name, password })
        const login = result.login;
        if (login) {
            setIsAuthenticated(login);
        } else {
            //Wrong pass or sthing
        }
    };
    return (
        <div className="max-w-[400px] mx-auto p-5 mt-20">
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    id="name"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    className="mt-6"
                    margin="normal"
                />
                <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className="mt-6"
                    margin="normal"
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    className="mt-4 text-gray-500 border-gray-500"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;