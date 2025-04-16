import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./Home.css"
import axios from "axios";
import banner from '../home/BANNER2.png';

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet"/>


const Home = () => {
    const [category, setCategory] = useState([]);
    const [user, setUser] = useState(null)
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();


// Fetch the categories from the backend
    useEffect(() => {
        axios
            // GET request to fetch the categories
            .get('/api/categories')
            .then((response) => {
                //setting the data
                setCategory(response.data);
            })
            // If error log to the console
            .catch((err) => {
                console.log('Error fetching categories,', err);
            });
    }, []);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const User = JSON.parse(storedUserData);
            setUser(User);

            axios.get('/api/quiz-history/' + User.id, { withCredentials: true })
                .then((res) => {
                    // remove duplicates based on ID and keep only latest
                    const seen = new Map();
                    const latestOnly = [];

                    for (const entry of res.data) {
                        if (!seen.has(entry.id)) {
                            seen.set(entry.id, true);
                            latestOnly.push(entry);
                        }
                    }

                    setHistory(latestOnly);
                })
                .catch((err) => {
                    console.error('Failed to fetch quiz history', err);
                });
        }
    }, []);

    const handleCategorySelection = (category) => {
        navigate('/generate-quiz', {state: {category}});
    };

    return (
        <>
            <div className="home">

                {/*Intro Container*/}
                <div className="intro-container">
                    {/*<button className="circle">*/}
                    {/*    <span>?</span>*/}
                    {/*</button>*/}
                    <img src={banner} className="image" alt="Quiz Illustration"/>
                </div>

                {/*<div className="home-desc">*/}
                {/*    Pick a category, customize the question type, difficulty, and number of questions, then dive into your quiz!*/}
                {/*    Sign up to save your quiz history and keep track of your trivia triumphs.*/}
                {/*</div>*/}

                <div className="sections">
                    {/*Category Container*/}

                    <div className="category-container">
                        <h4>CATEGORIES</h4>
                        {/* Looping through the categories array and rendering each category */}
                        <div className="category-selection">
                            {category.map((item, index) => (
                                <button
                                    className="category"
                                    key={index}
                                    style={{ backgroundImage: `url(categories/${item.image})` }}
                                    onClick={() => handleCategorySelection(item.name)}>
                                    <p>{item.name}</p>
                                </button>
                            ))}
                        </div>

                    </div>

                    <div className="quizHistory-wrapper">
                        <h4>Quiz History</h4>
                        <div className="quizHistory-container">
                            {history.length > 0 ? (
                                history.map((entry, index) => (
                                    <div key={index} className="history"
                                         onClick={() => navigate('/review', { state: { entry } })}>
                                        <h4>{entry.category}</h4>
                                        <h5>{entry.difficulty}</h5>
                                        <p>Score {entry.score} / {entry.total}</p>
                                        <p>Date {new Date(entry.date).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No history found.</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;