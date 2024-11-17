import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllResources.css'; // Custom styles for the resources page

function AllResources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/resources', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Optional, if using JWT token
                    },
                });
                setResources(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching resources:', err);
                setError('Something went wrong. Please try again later.');
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    if (loading) {
        return <div>Loading resources...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="view-all-resources">
            <h2>All Resources</h2>
            {resources.length === 0 ? (
                <p>No resources available at the moment.</p>
            ) : (
                <div className="resources-container">
                    {resources.map((resource) => (
                        <div key={resource._id} className="resource-card">
                            <img
                                src={resource.image || 'https://via.placeholder.com/150'}
                                alt={resource.title}
                                className="resource-image"
                            />
                            <div className="resource-info">
                                <h4>{resource.title}</h4>
                                <p>{resource.description}</p>
                                <p>Author: {resource.author ? resource.author.userFullName : 'Unknown'}</p>
                                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                    View Resource
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AllResources;
