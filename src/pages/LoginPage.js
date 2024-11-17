import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

function LoginPage() {
    const [isNewUser, setIsNewUser] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    
    // Handle form submission (without checking backend or adding data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        // Validate that email and password fields are filled
        if (!email || !password || (isNewUser && !confirmPassword)) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        // If new user, check if password and confirm password match
        if (isNewUser && password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            // Simulate login/signup logic without calling the backend
            localStorage.setItem('authToken', 'dummy-token');  // Mock token
            console.log('User logged in / signed up successfully');
            
            // Navigate to the dashboard page after login/signup
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="left-column">
                <img
                    src="https://www.pngarts.com/files/3/Open-Book-PNG-Photo.png"
                    alt="Login illustration"
                    className="login-image"
                />
                <div className="text">
                    <h2>Welcome to Readify</h2>
                    <p>Access a world of knowledge and study materials.</p>
                </div>
            </div>

            <div className="right-column">
                <h2>{isNewUser ? 'Sign Up' : 'Log In'}</h2>
                {error && <p className="error">{error}</p>} {/* Display error message */}

                <form onSubmit={handleSubmit}>
                    {isNewUser && (
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="form-input"
                            value={email}  // Fix: Replace username with email (email field handles this now)
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isNewUser && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Please wait...' : isNewUser ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                <div className="toggle-signup-login">
                    <p>
                        {isNewUser ? 'Already have an account?' : 'New to Readify?'}{' '}
                        <button onClick={() => navigate('/dashboard')} className="toggle-btn">
                            {isNewUser ? 'Log In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
