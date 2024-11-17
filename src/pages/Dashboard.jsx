import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Fetch resources from API
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/resources', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    // Handle Search submission
    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            try {
                const response = await axios.get('http://localhost:5000/api/resources/search', {
                    params: { query: searchQuery },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setResources(response.data);
            } catch (error) {
                console.error('Error during search:', error);
            }
        }
    };

    // Delete Resource function
    const handleDeleteResource = async (resourceId) => {
        const confirmed = window.confirm('Are you sure you want to delete this resource?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/resources/${resourceId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setResources(resources.filter((resource) => resource._id !== resourceId)); // Remove deleted resource from state
                alert('Resource deleted successfully.');
            } catch (error) {
                console.error('Error deleting resource:', error);
            }
        }
    };

    // Navigate to All Resources Page
    const handleAllResourcesClick = () => {
        navigate('/resources');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // Current reading (you can adjust based on the user's data or preferences)
    const currentReading = resources[0]; // For simplicity, using the first resource
    const suggestedResources = resources.slice(1, 5); // First 5 resources as suggested books

    return (
        <div className="dashboard-container">
            <h2>Welcome to Readify</h2>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {/* Top Icons */}
            <div className="top-icons">
                <i
                    className="fa fa-bookmark bookmark-icon"
                    title="Bookmark"
                    onClick={() => console.log('Bookmark clicked')}
                />
                <i
                    className="fa fa-user-circle user-icon"
                    title="User Profile"
                    onClick={() => navigate('/profile')}
                />
            </div>

            {/* Currently Reading Section */}
            <div className="current-reading">
                <h3>Currently Reading</h3>
                {currentReading ? (
                    <div className="card horizontal-card">
                        {currentReading.image && (
                            <img
                                src={currentReading.image}
                                alt={currentReading.title}
                                className="resource-image-horizontal"
                            />
                        )}
                        <div className="resource-info">
                            <h4>{currentReading.title}</h4>
                            <p>{currentReading.description}</p>
                            <p>Author: {currentReading.author ? currentReading.author.userFullName : 'Unknown'}</p>
                            <a href={currentReading.fileUrl} target="_blank" rel="noopener noreferrer">
                                View Resource
                            </a>
                            <span
                                className="delete-resource"
                                onClick={() => handleDeleteResource(currentReading._id)}
                            >
                                Delete Resource
                            </span>
                        </div>
                    </div>
                ) : (
                    <p>No current resource available.</p>
                )}
            </div>

            {/* Suggested Resources Section */}
            <div className="suggested-books">
                <h3>Suggested Books</h3>
                <div className="suggested-books-container">
                    {suggestedResources.length > 0 ? (
                        suggestedResources.map((resource) => (
                            <div key={resource._id} className="card small-card">
                                {resource.image && (
                                    <img
                                        src={resource.image}
                                        alt={resource.title}
                                        className="resource-image"
                                    />
                                )}
                                <h5>{resource.title}</h5>
                                <p>{resource.description}</p>
                                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                    View Resource
                                </a>
                                <span
                                    className="delete-resource"
                                    onClick={() => handleDeleteResource(resource._id)}
                                >
                                    Delete Resource
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>No suggested resources available.</p>
                    )}
                </div>
            </div>

            {/* Button to View All Resources */}
            <div className="view-all-btn-container">
                <button onClick={handleAllResourcesClick} className="btn btn-primary">
                    Explore More...
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
