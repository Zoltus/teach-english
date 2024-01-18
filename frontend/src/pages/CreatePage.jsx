import React, {useState} from "react";
import {Button, TextField} from "@mui/material";


const CreatePage = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [lang1, setLang1] = useState('');
    const [lang2, setLang2] = useState('');
    const [wordPairs, setWordPairs] = useState([]);

    const actionButton = (index) => {
        const isLastButton = index === wordPairs.length - 1;
        const colors = isLastButton ? "text-green-500 border-green-500" : "text-red-500 border-red-500";
        const text = isLastButton ? "+ Add" : "- Remove";

        const handleCreateClick = () => {

        };

        const handleActionClick = () => {
            if (isLastButton) {
                // Add a new wordPair
                const newId = wordPairs.length + 1;
                setWordPairs([...wordPairs, {id: newId, word1: '', word2: ''}]);
            } else {
                // Remove the current wordPair
                const updatedWordPairs = wordPairs.filter((pair, idx) => idx !== index);
                setWordPairs(updatedWordPairs);
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

    const addWords = () => {
        //If wordpairs is empty it adds 1
        if (wordPairs.length === 0) {
            wordPairs.push({word1: '', word2: ''})
        }
        const handleWordChange = (index, field, newValue) => {
            // Copy wordpairs to avoid conflicts
            const editedWordPairs = [...wordPairs];
            // Update specific word based on their index
            editedWordPairs[index] = {...editedWordPairs[index], [field]: newValue,};
            // Set edited wordpairs
            setWordPairs(editedWordPairs);
        };

        return (
            wordPairs.map((pair, index) => (
                <div key={index} className="flex space-x-4 mt-2">
                    <div className="flex-1">
                        <TextField
                            id="word1"
                            label="word1"
                            variant="filled"
                            value={pair.word1}
                            onChange={(e) => handleWordChange(index, 'word1', e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div className="flex-1">
                        <TextField
                            id="word2"
                            label="word2"
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

    return <div className={"page"}>
        <h1>Create exercise</h1>
        <div className="">
            <TextField
                required
                id="name"
                label="Name"
                variant="filled"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
            />
            <TextField
                id="category"
                label="Category"
                variant="filled"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
            />
        </div>
        <div className="flex mt-6 space-x-4">
            <TextField
                id="lang1"
                label="lang1"
                variant="filled"
                value={lang1}
                onChange={(e) => setLang1(e.target.value)}
                fullWidth
            />
            <TextField
                id="lang2"
                label="lang2"
                variant="filled"
                value={lang2}
                onChange={(e) => setLang2(e.target.value)}
                fullWidth
            />
        </div>
        <div className="mt-4">
            {addWords()}
        </div>
        <Button className="mt-4 text-gray-500 border-gray-500"
                variant="outlined"
        >
            Create Exercise
        </Button>
    </div>
}

export default CreatePage
