import axios from "axios";


//Adds exercise to db
const addExercice = async (exercice) => {
    try {
        console.log("Trying to add: ", exercice)
        const resp = await axios.post('http://localhost:3000/api/exercises', exercice);
        return resp.data;
    } catch (error) {
        console.error('Error adding task: ', error);
    }
};

//Removes exercise from db
const removeExercise = async (id) => {
    try {
        const resp = await axios.delete(`http://localhost:3000/api/exercises/${id}`);
        return resp.data;
    } catch (error) {
        console.error(`Error removing id: ${id}`, error);
    }
};

//Fetches all exercices from db
const getAllExercices = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/exercises');
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export default {addExercice, getAllExercices, removeExercise };