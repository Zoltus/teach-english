import React, { useState } from 'react';
import {TextField, Button, Snackbar} from '@mui/material';
import Database from "../Database.jsx";

/**
 * LoginPage handles logging into admin account to gain access to editing exercises
 * Interacts with backend for authentication.
 *
 * @component
 * @prop {Function} setIsAuthenticated - sets the state to true if successfull login.
 *
 * @component
 */
const LoginPage = ({setIsAuthenticated}) => {
    /**
     * Stores login information.
     */
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    /**
     * Handles form submission for login.
     * Authenticates the user by sending a request to backend and sets authentication state based on that.
     *
     * @param {Event} event - Event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await Database.auth({ name, password });
        const login = result.login;
        if (login) {
            setIsAuthenticated(login);
            setSnackbarMessage('Login successful!');
            setOpenSnackbar(true);
            setName("");
            setPassword("");
        } else {
            setSnackbarMessage('Incorrect username or password!');
            setOpenSnackbar(true);
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
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </div>
    );
};
export default LoginPage;