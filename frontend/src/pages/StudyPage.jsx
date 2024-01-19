import React, {useEffect, useState} from "react";
import {Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


/**
 * StudyPage is component for players to answer questions
 * Before the test user could swap the language.
 * Upon completing the test user gets a score.
 *
 * @prop {Object} currentExercise - Exercise currently played.
 * @prop {Function} setCurrentExercise - Function to update the current exercise.
 *
 * @component
 */
const StudyPage = ({currentExercise, setCurrentExercise}) => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    /**
     * Handles input change for each answer field.
     *
     * @param {number} index - Index of the word_pair
     * @param {string} value - Translation of the word.
     */
    const handleInputChange = (index, value) => {
        setAnswers(prevAnswers => {
            const copied = [...prevAnswers];
            copied[index] = value;
            return copied;
        });
    };

    /**
     * Handles the answer submitting
     * Calculates score based on correct answers
     */
    const handleSubmit = () => {
        const calcCorrectAnswers = answers.filter((answer, index) => {
            const pair = currentExercise.word_pairs[index];
            const word = currentExercise.swapLang ? pair.word2 : pair.word1;
            return answer.toLowerCase() === word.toLowerCase();
        }).length;
        setCorrectAnswers(calcCorrectAnswers);
        setOpenModal(true);
    };

    /**
     * Closes the score modal/popup and navigates back to the main page.
     */
    const handleCloseModal = () => {
        setOpenModal(false);
        navigate("/");
    };
    useEffect(() => {
        // If currentExercise is not set, navigate back
        if (currentExercise === undefined || currentExercise === null) {
            navigate("/");
        }
    }, []);

    // Render only if there is valid exercise
    if (!currentExercise) {
        return null;
    }
    /**
     * Creates wordpairs from current exercise words.
     */
    const words = () => currentExercise.word_pairs.map((pair, index) => {
        return (
            <div key={index} className="flex items-center mb-4">
                <Typography variant="h6">{currentExercise.swapLang ? pair.word1 : pair.word2} =</Typography>
                <TextField
                    variant="outlined"
                    label="Translation"
                    value={answers[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="ml-4"
                />
            </div>
        )
    })
    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold mb-4">Study Page</h1>
            {words()}
            <Button color="primary"
                    variant="outlined"
                    className="mt-5 text-gray-500 border-gray-500 text-xs"
                    onClick={handleSubmit}>
                Submit
            </Button>
            {openModal && (
                <div className="fixed top-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white border-2 border-black p-14 rounded-md flex flex-col items-center">
                        <p className="text-3xl">Your Score!</p>
                        <p className="text-2xl">{correctAnswers} / {currentExercise.word_pairs.length}</p>
                        <Button
                            onClick={handleCloseModal}
                            color="primary"
                            variant="outlined"
                            className="mt-5 text-gray-500 border-gray-500 text-xs"
                        >
                            OK
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyPage;