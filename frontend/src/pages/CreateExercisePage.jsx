import React, {useState} from "react";
import {Autocomplete, Button, FormControl, TextField} from "@mui/material";
import Database from "../Database.jsx";
import exercise from "../components/Exercise.jsx";

/**
 * CreateExercisePage provides ability to create, edit, and delete exercises.
 * User can define exercise name, category, language and word prais.
 *
 * @prop {Array} exercises - An array of all exercises
 * @prop {Function} setExercises - Function to update the list of exercises.
 *
 * @component
 */
const CreateExercisePage = ({exercises, setExercises}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [lang1, setLang1] = useState('');
    const [lang2, setLang2] = useState('');
    const [word_pairs, setWord_pairs] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    /**
     * Checks if user is editing execises and changes the visuals based on that
     * @returns {boolean} true if user is editing exercise
     */
    const isEditing = () => selectedExercise != null
        && selectedExercise.exercise_id !== null && selectedExercise.exercise_id !== -1;

    /**
     * Gets the next available exercise ID.
     * @returns {number} A new id for exercise
     */
    const getNewId = () => exercises.reduce((maxId, exercise) =>
        exercise.exercise_id > maxId ? exercise.exercise_id : maxId, 0) + 1;

    //Empty option so you can add new if u select this:
    const exerciseOptions = [
        {exercise_id: -1, label: 'ADD NEW', data: null},
        ...exercises.map(exercise => ({
            exercise_id: exercise.exercise_id,
            label: exercise.name,
            data: exercise
        })),
    ];

    /**
     * Adds a new exercise.
     * @param {Object} exercise - object to be added.
     */
    const addExercise = async (exercise) => {
        setExercises((prevExercises) => [...prevExercises, exercise]);
        await Database.addExercise(exercise);
    };

    /**
     * Updates an existing exercise.
     * @param {Object} exercise - to be updated.
     */
    const updateExercise = async (exercise) => {
        if (selectedExercise) {
            await Database.updateExercise(exercise);
        }
    };

    /**
     * Deletes selected exercise and reset fields.
     */
    const deleteExercise = async () => {
        const selectedID = selectedExercise.exercise_id;
        if (selectedExercise) {
            //reset fields
            setName('');
            setCategory('');
            setLang1('');
            setLang2('');
            setWord_pairs([]);
            await Database.deleteExercise(selectedID);
            setExercises((prevExercises) =>
                prevExercises.filter((exercise) => exercise.exercise_id !== selectedID)
            );
            setSelectedExercise(exerciseOptions[0]);
        }
    };

    /**
     * Actionbutton for words, its either add or remove based on if its the last entry on the list.
     *
     * @param {number} index - of the button
     * @returns {JSX.Element} A button.
     */
    const actionButton = (index) => {
        const isLastButton = index === word_pairs.length - 1;
        const colors = isLastButton ? "text-green-500 border-green-500" : "text-red-500 border-red-500";
        const text = isLastButton ? "+ Add" : "- Remove";

        /**
         * Handles action button click, either remove or add word pair slot
         */
        const handleActionClick = () => {
            if (isLastButton) {
                // Add a new wordPair
                const newId = word_pairs.length + 1;
                setWord_pairs([...word_pairs, {id: newId, word1: '', word2: ''}]);
            } else {
                // Remove the current wordPair
                const updatedWordPairs = word_pairs.filter((pair, idx) => idx !== index);
                setWord_pairs(updatedWordPairs);
            }
        };
        return (
            <Button className={`m-2 ${colors} min-w-[120px]`}
                    variant="outlined"
                    onClick={handleActionClick}>
                {text}
            </Button>
        );
    };

    /**
     * Handles all word rendering
     *
     * @returns {JSX.Element} Element with list of all wordpairs with buttons.
     */
    const addWords = () => {
        //If wordpairs is empty it adds 1
        if (word_pairs.length === 0) {
            word_pairs.push({word1: '', word2: ''})
        }
        const handleWordChange = (index, field, newValue) => {
            // Copy wordpairs to avoid conflicts
            const editedWordPairs = [...word_pairs];
            // Update specific word based on their index
            editedWordPairs[index] = {...editedWordPairs[index], [field]: newValue,};
            // Set edited wordpairs
            setWord_pairs(editedWordPairs);
        };

        return (
            word_pairs.map((pair, index) => (
                <div key={index} className="flex space-x-4 mt-2">
                    <div className="flex-1">
                        <TextField
                            required
                            id="word1"
                            label="Word"
                            variant="filled"
                            value={pair.word1}
                            onChange={(e) => handleWordChange(index, 'word1', e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className="flex-1">
                        <TextField
                            required
                            id="word2"
                            label="Translation"
                            variant="filled"
                            value={pair.word2}
                            onChange={(e) => handleWordChange(index, 'word2', e.target.value)}
                            fullWidth
                        />
                    </div>
                    {actionButton(index)}
                </div>
            ))
        );
    }

    /**
     * Handles data sumbitting.
     * Creates exercise from new id {getNewId} and data from the fields.
     *
     * @param {Event} e - Event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const editing = isEditing();
        const exercise = {
            exercise_id: editing ? selectedExercise.exercise_id : getNewId(),
            name,
            category,
            lang1,
            lang2,
            word_pairs
        };
        //reset fields
        setName('');
        setCategory('');
        setLang1('');
        setLang2('');
        setWord_pairs([]);
        setSelectedExercise(exerciseOptions[0]);
        if (editing) {
            await updateExercise(exercise)
        } else {
            await addExercise(exercise);
        }
    };

    /**
     * Handles changes in the exercise selection.
     * User can either Add new or edit/delete old exercises.
     * Fills all fields if user selects exercise.
     *
     * @param {Event} event - Event object.
     * @param {Object} value - Values of the selected entry.
     */
    const handleAutocompleteChange = (event, value) => {
        setSelectedExercise(value);
        if (value && value.exercise_id !== -1) {
            setName(value.label);
            setCategory(value.data.category);
            setLang1(value.data.lang1);
            setLang2(value.data.lang2);
            setWord_pairs(value.data.word_pairs);
        } else {
            setName("");
            setCategory("");
            setLang1("");
            setLang2("");
            setWord_pairs([]);
        }
    };

    /**
     * Renders the add or edit button based on if user is editing exercise or not.
     *
     * @returns {JSX.Element} A Button.
     */
    const AddEditButton = () => {
        const text = isEditing() ? "Update Exercise" : "Add Exercise";
        return (
            <Button className="mt-4 text-gray-500 border-gray-500"
                    variant="outlined"
                    type="submit">
                {text}
            </Button>
        )
    }
    return (
        <div>
            <h1 className="text-gray-500">Create exercise</h1>
            <FormControl component="form" onSubmit={handleSubmit}>
                <Autocomplete
                    disablePortal
                    freeSolo
                    id="suggestions"
                    value={selectedExercise}
                    options={exerciseOptions}
                    onChange={handleAutocompleteChange}
                    getOptionKey={(option) => option.exercise_id}
                    isOptionEqualToValue={
                        (option, value) => option.exercise_id === value.exercise_id
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) =>
                        <TextField className="bg-perfect-gray" {...params} label="Select to edit or Add new!"/>}
                />
                <div className="">
                    <TextField
                        required
                        id="name"
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        className="mt-6"
                    />
                    <TextField
                        id="category"
                        label="Category"
                        variant="filled"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        className="mt-6"
                    />
                </div>
                <div className="flex mt-6 space-x-4">
                    <TextField
                        required
                        id="lang1"
                        label="From language"
                        variant="filled"
                        value={lang1}
                        onChange={(e) => setLang1(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        required
                        id="lang2"
                        label="To Language"
                        variant="filled"
                        value={lang2}
                        onChange={(e) => setLang2(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="mt-4">
                    {addWords()}
                </div>
                {AddEditButton()}
                {isEditing() && (
                    <Button className="mt-4 text-red-500 border-red-500"
                            variant="outlined"
                            onClick={deleteExercise}
                    >
                        Delete Exercise
                    </Button>
                )}
            </FormControl>
        </div>
    )
}

export default CreateExercisePage
