import React from "react";
import {useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import "./QuizGeneration.css";
import axios from "axios";
import quiz1 from '../home/Quiz1.png'

const QuizGeneration = () => {

    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [numQuestions, setNumQuestions] = useState(10);
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category;
    
    const getCategoryId = (categoryName) => {
        const map = {
            'Science': 17,
            'Mathematics': 19,
            'History': 23,
            'Animals': 27,
            'Sports': 21,
            'Music': 12,
            'Anime & Manga': 31,
            'Books': 10,
            'Art': 25,
            'Computers': 18
        };
        return map[categoryName];
    };

    const handleSubmit = async () => {
        if(numQuestions < 2 || numQuestions > 20){
            alert("Please enter a number of questions between 2 and 20!");
            return;
        }

        const difficultyParam = difficulty === "Any Difficulty" || difficulty === "" ? "" : difficulty;
        const typeParam = type === "Any Type" || type === "" ? "" : type;

        try {
            const response = await axios.get('/api/quiz', {
                params: {
                    categoryId: getCategoryId(category),
                    difficulty: difficultyParam,
                    type: typeParam,
                    numberOfQuestions: numQuestions,
                },
            });
            navigate('/quiz', {state: {questions: response.data, category,difficulty: difficultyParam, type: typeParam}});
        } catch (err) {
            console.error('Failed to fetch quiz', err);
            alert("Something went wrong, please try again.");
            navigate("/")
        }
    };

    return (
        <div className="QuizGeneration">
            <h2>Customize your Quiz</h2>

            <h3>Category : {category}</h3>
            <div className="customize-container">
                <div className="customize-containerLeft">

                    <label>Difficulty</label>
                    <select value={difficulty} className="Dropdown" onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <label>Type</label>
                    <select value={type} className="Dropdown" onChange={(e) => setType(e.target.value)}>
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>

                    <label>Number of Questions</label>
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        placeholder="Enter number below 20"
                        min="1"
                        max="20"
                    />

                    <button onClick={handleSubmit}>Start Quiz</button>
                </div>

                <div className="customize-containerRight">
                    <img src={quiz1} alt="Quiz"/>
                </div>
            </div>
        </div>
    );

};

export default QuizGeneration;