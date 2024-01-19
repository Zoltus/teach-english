import React, { useState } from "react";
import Exercise from "../components/Exercise.jsx";

const ExercisesPage = ({ exercises, setCurrentExercise }) => {
    const [selectedCategorys, setselectedCategorys] = useState([]);

    const filteredExercises = () => {
        return exercises.map((exercise) => (
            <Exercise key={exercise.exercise_id} exercise={exercise} setCurrentExercise={setCurrentExercise}/>
        ));
    };

    return (
        <div className="flex flex-col items-center h-full page">
            <div className="w-full max-w-screen-lg p-4">
                <h1 className="text-center text-gray-500 mb-6">Exercises</h1>
                <div className="flex flex-row flex-wrap">
                    {filteredExercises()}
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;