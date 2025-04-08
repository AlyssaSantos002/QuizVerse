import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./QuizGeneration.css";
import axios from "axios";
import quiz1 from '../home/Quiz1.png'

const QuizGeneration = () => {

    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [numQuestions, setNumQuestions] = useState(10);
    const navigate = useNavigate();


    const handleSubmit = async () => {
        try {
            const response = await axios.get('/api/quiz', {
                params: {
                    difficulty,
                    type,
                    numberOfQuestions: numQuestions,
                },
            });
            navigate('/quiz', {state: {questions: response.data}});
        } catch (err) {
            console.error('Failed to fetch quiz', err);
        }
    };

    return (
        <div className="QuizGeneration">
            <h2>Customize your Quiz</h2>

            <div className="customize-container">
                <div className="customize-containerLeft">
                    <label>Difficulty</label>
                    <select value={difficulty} className="dropdown" onChange={(e) => setDifficulty(e.target.value)}>
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <label>Type</label>
                    <select value={type} className="dropdown" onChange={(e) => setType(e.target.value)}>
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