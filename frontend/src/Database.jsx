import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/api/exercises`;

//Adds exercise to db
const addExercise = async (Exercise) => {
    try {
        const resp = await axios.post(url, Exercise);
        return resp.data;
    } catch (error) {
        console.error('Error adding task: ', error);
    }
};

//Removes exercise from db
const removeExercise = async (id) => {
    try {
        const resp = await axios.delete(`${url}/${id}`);
        return resp.data;
    } catch (error) {
        console.error(`Error removing id: ${id}`, error);
    }
};

// Update exercise
const updateExercise = async (exercise) => {
    try {
        const resp = await axios.patch(`${url}/${exercise.exercise_id}`, exercise);
        return resp.data;
    } catch (error) {
        console.error(`Error updating id: ${exercise.exercise_id}`, error);
    }
};

// Delete exercise
const deleteExercise = async (id) => {
    try {
        const resp = await axios.delete(`${url}/${id}`);
        return resp.data;
    } catch (error) {
        console.error(`Error Deleting id: ${id}`, error);
    }
};

//Fetches all Exercises from db
const getAllExercises = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

//Authenticate
const auth = async (credentials) => {
    try {
        const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth`, credentials);
        return resp.data;
    } catch (error) {
        console.error('Error adding task: ', error);
    }
};

export default {addExercise, getAllExercises, removeExercise, updateExercise, deleteExercise, auth };