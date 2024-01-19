import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/api/exercises`;

/**
 * Add a new exercise to the database.
 *
 * Sends request to add Exercise.
 *
 * @param {Object} Exercise - Destructed data for new exercise.
 * @returns {Promise<number>} Newly added id.
 */
const addExercise = async (Exercise) => {
    try {
        const resp = await axios.post(url, Exercise);
        return resp.data;
    } catch (error) {
        console.error('Error adding task: ', error);
    }
};



/**
 * Update an existing exercise.
 *
 * @param {Object} exercise - Execise containing id and data to update.
 * @returns {Promise<number>} Promise with the id updated.
 */
const updateExercise = async (exercise) => {
    try {
        const resp = await axios.patch(`${url}/${exercise.exercise_id}`, exercise);
        return resp.data;
    } catch (error) {
        console.error(`Error updating id: ${exercise.exercise_id}`, error);
    }
};

/**
 * Deletes an exercise based on the id
 *
 * @param {number} id - of the exercise to delete.
 */
const deleteExercise = async (id) => {
    try {
        const resp = await axios.delete(`${url}/${id}`);
        return resp.data;
    } catch (error) {
        console.error(`Error Deleting id: ${id}`, error);
    }
};


/**
 * Get all exercises from the backend
 *
 * Finds all exercises
 *
 * @returns {Promise} Containing all Exercises.
 */
const getAllExercises = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

/**
 * Authenticates a user.
 * Sends request to backend and gives response true or false if user has right credentials.
 *
 * @param {Object} credentials - Credentials for user.
 */
const auth = async (credentials) => {
    try {
        const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth`, credentials);
        return resp.data;
    } catch (error) {
        console.error('Error adding task: ', error);
    }
};

export default {addExercise, getAllExercises, updateExercise, deleteExercise, auth };