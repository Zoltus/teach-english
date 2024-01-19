import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/api/exercises`;

//Adds exercise to db
const addExercise = async (Exercise) => {
    try {
        console.log("Trying to adda: ", Exercise)
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
const updateExercise = async (id, exercise) => {
    try {
        const resp = await axios.patch(`${url}/${id}`, exercise);
        return resp.data;
    } catch (error) {
        console.error(`Error updating id: ${id}`, error);
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

export default {addExercise, getAllExercises, removeExercise, updateExercise };