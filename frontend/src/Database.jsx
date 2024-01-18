import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/api/exercises`;

//Adds exercise to db
const addExercice = async (exercice) => {
    try {
        console.log("Trying to adda: ", exercice)
        const resp = await axios.post(url, exercice);
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

//Fetches all exercices from db
const getAllExercices = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export default {addExercice, getAllExercices, removeExercise };