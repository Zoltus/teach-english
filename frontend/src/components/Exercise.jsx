import React, {useState} from "react";
import {Button, Card, CardContent, Typography} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {useNavigate} from "react-router-dom";

/**
 * Exercise component.
 *
 * Each exercise card is built here showing name, category and button
 *
 * @param {Object} props - Props component which is destructed.
 * @param {Object} props.exercise - prop containing exercise to get data from.
 * @param {Function} props.setCurrentExercise - Function to set the current exercise.
 * @returns {JSX.Element} React JSX element.
 *
 * @component
 */
function Exercise({exercise, setCurrentExercise}) {
    const [swapLang, setSwapLang] = useState(true);
    const navigate = useNavigate();

    /**
     * Swap languages
     */
    const swapLanguage = () => setSwapLang(!swapLang);

    /**
     *
     */
    const study = () => {
        //Set swapLang to exercise so we know if we should swap languages.
        exercise.swapLang = swapLang;
        setCurrentExercise(exercise);
        navigate("/study");
    };
    return (
        <Card className="">
            <CardContent>
                <Typography variant="h5" component="div" className="mb-4">
                    {exercise.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Category: {exercise.category}
                </Typography>
                <div className="flex justify-between items-center">
                    <Typography color="textSecondary" gutterBottom>
                        {swapLang ? exercise.lang1 : exercise.lang2}
                        <SwapHorizIcon className="align-middle mx-4" onClick={swapLanguage}/>
                        {swapLang ? exercise.lang2 : exercise.lang1}
                    </Typography>
                    <Button
                        variant="outlined"
                        className="ml-4 text-gray-500 border-gray-500 text-xs"
                        onClick={swapLanguage}>Swap</Button>
                </div>
                <Button
                    variant="outlined"
                    className="mt-5 text-gray-500 border-gray-500 text-xs"
                    onClick={study}>
                    Study
                </Button>
            </CardContent>
        </Card>
    )
}

export default Exercise;