import React, {useState} from "react";
import {TextField} from "@mui/material";


const CreatePage = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [lang1, setLang1] = useState('');
    const [lang2, setLang2] = useState('');
    const [langPairs, setLangPairs] = useState('');

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
        </div>
        <div className="mt-6">
            <TextField
                id="category"
                label="Category"
                variant="filled"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
            />
        </div>
    </div>
}

export default CreatePage
