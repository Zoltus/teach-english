import React, {useState} from "react";
import Exercise from "../components/Exercise.jsx";

/**
 * ExercisePage builds Exercise card for earch exercise.
 *
 * @prop {Array} exercises - array with all exercises.
 * @prop {Function} setCurrentExercise - Function to set the current active exercise.
 *
 * @component
 */
const ExercisesPage = ({exercises, setCurrentExercise}) => {
    return (
        <div className="flex flex-col items-center h-full page">
            <div className="w-full max-w-screen-lg p-4">
                <h1 className="text-center text-gray-500 mb-6">Exercises</h1>
                <div className="flex flex-row flex-wrap">
                    {exercises.map((exercise) =>
                        <Exercise key={exercise.exercise_id} exercise={exercise}
                                  setCurrentExercise={setCurrentExercise}/>)}
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;