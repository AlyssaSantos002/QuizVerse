import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import "./Home.css"
import axios from "axios";
import banner from '../home/BANNER.png';

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
            setUser(User)

            axios
                .get(`/api/quiz-history/${User.id}`, {withCredentials: true})
                .then((res) => {
                    setHistory(res.data);
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
                    <img src={banner} className="image" alt="Quiz Illustration"/>
                </div>

                <div className="sections">
                    {/*Category Container*/}
                    <div className="category-container">
                        <h4>Category</h4>
                        {/* Looping through the categories array and rendering each category */}
                        <div className="category-scroll">
                            {category.map((item, index) => (
                                <button className="category" key={index}
                                        onClick={() => handleCategorySelection(item)}>
                                    <p>{item}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quizHistory-wrapper">
                        <h4>Quiz History</h4>
                        <div className="quizHistory-container">
                            {history.map((entry, index) => (
                                <div key={index} className="history"
                                     onClick={() => navigate('/review', {state: {entry}})}>
                                    <h4>{entry.category}</h4>
                                    <h5>{entry.difficulty}</h5>
                                    <p>Score {entry.score} / {entry.total}</p>
                                    <p>Date {new Date(entry.date).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="recommended-container">
                        <h4>Explore</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;