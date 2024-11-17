// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <div className='home-page'>
                <div align="center">
                    <h1 align="center" style={{ fontSize: '80px' }}>Readify</h1>
                    <h5>Your own e-Library</h5>
                    <h6 className='mt-4'>"Revolutionizing Study, One Click at a Time."</h6>

                    {/* Correct use of Link with a path */}
                    <Link to="/login">
                        <button type="button" className="mt-3 login-button btn btn-outline-dark">
                            Login
                        </button>
                    </Link>
                </div>
            </div >
        </>
    );
};

export default HomePage;
