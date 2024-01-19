import React, {useEffect, useState} from "react";
import {Button, Modal, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const StudyPage = ({currentExercise, setCurrentExercise}) => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const handleInputChange = (index, value) => {
        setAnswers(prevAnswers => {
            const copied = [...prevAnswers];
            copied[index] = value;
            return copied;
        });
    };

    const handleSubmit = () => {
        // calc correct answers
        const calcCorrectAnswers = answers.filter((answer, index) => {
            return answer.toLowerCase() === currentExercise.word_pairs[index].word2.toLowerCase();
        }).length;
        setCorrectAnswers(calcCorrectAnswers);
        setCurrentExercise(null);
        setOpenModal(true);
    };

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

    const words = () => currentExercise.word_pairs.map((pair, index) => {
        return (
            <div key={index} className="flex items-center mb-4">
                <Typography variant="h6">{pair.word1} =</Typography>
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
            <Button variant="contained" color="primary" className="mt-6" onClick={handleSubmit}>
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
                            variant="contained"
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
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