import React from "react";
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css"
import axios from "axios";
import banner from '../home/BANNER2.png';

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet"/>


const Home = () => {
    const [category, setCategory] = useState([]);

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

    const handleCategorySelection = (category) => {
       navigate('/generate-quiz', {state : {category}});
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

                    <div className="createQuiz-container">

                    </div>

                    <div className="quizHistory-container">
                        <h4>Quiz History</h4>
                        <div className="history"></div>
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