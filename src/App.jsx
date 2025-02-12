import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State to handle ratings, the average rating, and if the user has rated
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [hasRated, setHasRated] = useState(false); // Track if the user has already rated

  // Function to handle rating changes
  const handleRatingChange = (newRating) => {
    if (!hasRated) {  // Only allow rating changes if the user hasn't rated yet
      setRating(newRating);
    }
  };

  // Fetch the average rating from the server
  useEffect(() => {
    axios.get('http://localhost:3000/api/ratings')
      .then(response => {
        setAverageRating(response.data.averageRating);
      })
      .catch(error => {
        console.log('Error fetching ratings:', error);
      });
  }, []);  // Empty dependency array, runs only once on component mount

  // Function to submit the rating to the server
  const handleSubmitRating = () => {
    if (rating > 0 && !hasRated) {
      axios.post('http://localhost:3000/api/ratings', { rating })
        .then(response => {
          setHasRated(true);  // Mark that the user has rated
          setRating(0); // Reset rating after submission
          // Fetch the updated average rating after submission
          axios.get('http://localhost:3000/api/ratings')
            .then(response => {
              setAverageRating(response.data.averageRating); // Update average rating
            })
            .catch(error => {
              console.log('Error fetching ratings:', error);
            });
        })
        .catch(error => {
          console.log('Error submitting rating:', error);
        });
    }
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center text-center text-light">
        <div className="hero-overlay w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="container">
            <h1 className="display-3 animated fadeIn">Find Your Soulmate with AI</h1>
            <p className="lead mb-4 animated fadeIn">Let SoulmateAI guide you to your perfect match with advanced AI technology and a touch of intelligence!</p>

            <a href="" className="btn btn-lg btn-heart animated bounceIn" style={{ textTransform: 'none' }}>
              Start your free trial now😉😉
            </a><br /><br />
            <a href="#signup" className="btn btn-lg btn-heart animated bounceIn" style={{ textTransform: 'none', backgroundColor: '#007bff', color: 'white' }}>
  🚀 Launch App
</a>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-box text-center">
                <h3>AI-Powered Matching</h3>
                <p>Our AI uses deep learning algorithms to connect you with your soulmate based on compatibility.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box text-center">
                <h3>Intuitive Interface</h3>
                <p>Easy-to-use design and features make it simple to connect and communicate.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box text-center">
                <h3>Privacy First</h3>
                <p>Your privacy is our priority. We ensure a secure environment for all users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-danger text-center py-5">
        {/* Display Average Rating */}
        <div className="rating-display mb-4">
          <h2 className="text-dark animated zoomIn">Rate our App</h2>
          <h3 className="text-light">Average Rating: {averageRating} / 5</h3>
        </div>

        {/* Rating Component with Stars */}
        <div className="rating mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => handleRatingChange(star)}
              role="button"
              style={{
                cursor: 'pointer',
                fontSize: '30px',
                transition: 'transform 0.2s ease, color 0.2s ease',
                color: star <= rating ? 'gold' : 'gray',  // Change color when selected
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'} // On hover, scale the star
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} // Reset the scale when hover ends
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit Rating Button */}
        {!hasRated ? (
          <button className="btn btn-lg btn-light animated bounceIn" onClick={handleSubmitRating}>
            Submit Rating
          </button>
        ) : (
          <p className="text-white mt-4">Thank you for rating our app! 😊</p>
        )}

        <br /><br />
        <h2 className="text-white animated zoomIn">Start Your Journey Today!😉😉</h2>
        <a href="#signup" className="btn btn-lg btn-light animated bounceIn">Create your Account now</a>
      </section>
    </div>
  );
}

export default App;
