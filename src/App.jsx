import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingChange = (newRating) => {
    if (!hasRated) {
      setRating(newRating);
    }
  };

  useEffect(() => {
    axios.get('https://landingpage-backend-mvil.onrender.com/api/ratings')
      .then(response => {
        setAverageRating(response.data.averageRating);
      })
      .catch(error => {
        console.log('Error fetching ratings:', error);
      });
  }, []);

  const handleSubmitRating = () => {
    if (rating > 0 && !hasRated) {
      axios.post('https://landingpage-backend-mvil.onrender.com/api/ratings', { rating })
        .then(response => {
          setHasRated(true);
          setRating(0);
          axios.get('https://landingpage-backend-mvil.onrender.com/api/ratings')
            .then(response => {
              setAverageRating(response.data.averageRating);
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
      <Analytics/>
      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center text-center text-light">
        <div className="hero-overlay w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="container">
            <h1 className="display-3 animated fadeIn">💖 Celebrate Your Valentine's with AI! 💖</h1>
            <p className="lead mb-4 animated fadeIn">Let <strong>SoulmateAI</strong> be your ultimate wingman! Discover your perfect match with cutting-edge AI-powered matchmaking. Say goodbye to endless swiping and hello to <strong>real connections</strong>!</p>
            
            <a href="https://soulmateai.vercel.app/" className="btn btn-lg btn-heart animated bounceIn" style={{ textTransform: 'none', backgroundColor: '#007bff', color: 'white' }}>
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
        <div className="rating-display mb-4">
          <h2 className="text-dark animated zoomIn">Rate our App</h2>
          <h3 className="text-light">Average Rating: {averageRating} / 5</h3>
        </div>

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
                color: star <= rating ? 'gold' : 'gray',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              ★
            </span>
          ))}
        </div>

        {!hasRated ? (
          <button className="btn btn-lg btn-light animated bounceIn" onClick={handleSubmitRating}>
            Submit Rating
          </button>
        ) : (
          <p className="text-white mt-4">Thank you for rating our app! 😊</p>
        )}

        <br /><br />
        <h2 className="text-white animated zoomIn">Start Your Journey Today! 😉😉</h2>
        <a href="https://soulmateai.vercel.app/signup" className="btn btn-lg btn-light animated bounceIn">Create your Account now</a>
      </section>
    </div>
  );
}

export default App;
