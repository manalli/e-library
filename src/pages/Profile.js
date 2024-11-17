import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data from the API (adjust URL as necessary)
                const response = await axios.get('http://localhost:5000/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        src={user.profileImage || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-initials">
                        {user.userFullName?.substring(0, 1)}
                    </div>
                </div>
            </div>
            
            <div className="profile-details">
                <h1 className="profile-title">{user.userFullName}</h1>
                <p className="profile-bio">Age: {user.age} | Gender: {user.gender}</p>
                <p className="profile-bio">Date of Birth: {user.dob}</p>
                <p className="profile-bio">Email: {user.email}</p>
                <p className="profile-bio">Phone: {user.mobileNumber}</p>
                {user.address && <p className="profile-bio">Address: {user.address}</p>}
            </div>

            <div className="profile-activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>Ratings: {user.activity?.ratings.length}</li>
                    <li>Views: {user.activity?.views.length}</li>
                    <li>Downloads: {user.activity?.downloads.length}</li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;
