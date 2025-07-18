import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

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
      {/* Hero Section */}
      <section className="hero d-flex justify-content-center align-items-center text-center text-light">
        <div className="hero-overlay w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="container">
            <h1 className="display-3 animated fadeIn">💖 Celebrate Your Valentine's with AI! 💖</h1>
            <p className="lead mb-4 animated fadeIn">Let <strong>SoulmateAI</strong> be your ultimate wingman! Discover your perfect match with cutting-edge AI-powered matchmaking. Say goodbye to endless swiping and hello to <strong>real connections</strong>!</p>
            
            <a href="https://soulmateai.vercel.app/chat" className="btn btn-lg btn-heart animated bounceIn" style={{ textTransform: 'none', backgroundColor: '#007bff', color: 'white' }}>
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

      {/* Footer Section */}
      <footer className="text-center py-4">
        <p>
          <a href="https://cfmerchant-docs.s3.ap-south-1.amazonaws.com/website_tnc_910828?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiBd5JluozvbsgJ2soqYIMhgSbzLXwl9FaPv8ozZqaM4ZQIgWrNW%2F%2BOSaP4MaS2%2BgDWeWfdNOOinfSQ62GUWTiYsxcwqhwUIExAAGgwxODUxNTI3MzUxOTUiDBnbAzlFdTC36ic2%2BSrkBOp62DWhO13FFk5FN3gbhVBsj7QKBjHDkeZ7vI8NJ5WmPZKA7esaUyfn8HbpyGR40pvcosVB6O1oWj%2F8ENUGIwvricdMxGsZWVBRWaU45bvL74rxpAIQ5e7U3wbtyBCmwYqMPnCxTjti2nvo5evKGGXQZuSTw45LwgMV1lCMPxEjjbqFg%2BzyYWc5E2cbyzMbSzSOje0SONmUVXzXeux6EGWchmGA6h9pMNRpC5md33MELBvKZ2s7WnuICnyecc6zl66cyJIXycH92GQL2IVKB%2BDTc4zEZFbwSBnw0ykuoI%2FZb4zcW3cOlpZ5SltiuEkR5%2BunO4lNQ6uaKT2NIdvjkuuGkFgZmVYMh7xldqgQyGnOfV6lBZr7%2Bq%2FntPQ9mTaeWNDKWltaIBDgFBiDUOt8RXGCsw5nFM1blTAJl5ARvL3WTJFhLc8y%2Bjv376gD7EWr8rjeK9XTQR9j8F4CqJ9GaGebMu2XXBKQxC9%2BFP80jFuhHIcPMYC3shtuxr1uZWTpzXC1Y0tqPobqQkLOAjVb6uErtMpIV8EAwZ1AnHaEG9I4QSJ3%2Fs6lxt3z4o%2FcD5gKJuZT52%2BiTQAx5oFTHV9hq3xwGWaNuk9QInzZjzh%2BhPXgyv5aEy%2FoCvfD41QvhFHrvslmTZoS9i2gslVylh%2BIS7O6MQXhTNiFLA6tEbmmx5S6rhBf%2FICHTjoPweuRjg8SQ3dyVMypmvwBsPvp2D%2FWJ%2F0LXielpQn6xV2CIBdhtwlYHip8hg2opO%2FEOGo1twnXm1K5JbEXoVtpKMVn4LE7e6R7svW6udRPIrVGhtQgBX%2FAED0LajCu%2Bba9BjqbAfPioFba%2BF%2FP4b8WRt%2Fgk2Wn4a8PCu%2B1sQnZcSCwj0W36p%2Fn8%2FLgDBvmSel%2B3SzpRsF2DBwrbuOGhbo9YhyN3YFHsb4Q06BudFeBx3gWyseIKHg1zdeXP2A0WNjkHTmeYRlQs630kLR1DrMxOPAAR%2Fc78yz7xZDPds1zkKWikFQ6lPKKRo%2FjwmKFdhbKbMauTDw6a3egz1ZECw1E&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250213T100207Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=ASIASWG7WQ7NRIMB7XCI%2F20250213%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c77254bd4a2b2794fe72d45e8d9941ef1a752c051dd5b61550c69f3e20909d27" download="terms-and-conditions.pdf" className="text-primary">Terms and Conditions</a> | 
          <a href="https://cfmerchant-docs.s3.ap-south-1.amazonaws.com/website_contactUs_910828?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiBd5JluozvbsgJ2soqYIMhgSbzLXwl9FaPv8ozZqaM4ZQIgWrNW%2F%2BOSaP4MaS2%2BgDWeWfdNOOinfSQ62GUWTiYsxcwqhwUIExAAGgwxODUxNTI3MzUxOTUiDBnbAzlFdTC36ic2%2BSrkBOp62DWhO13FFk5FN3gbhVBsj7QKBjHDkeZ7vI8NJ5WmPZKA7esaUyfn8HbpyGR40pvcosVB6O1oWj%2F8ENUGIwvricdMxGsZWVBRWaU45bvL74rxpAIQ5e7U3wbtyBCmwYqMPnCxTjti2nvo5evKGGXQZuSTw45LwgMV1lCMPxEjjbqFg%2BzyYWc5E2cbyzMbSzSOje0SONmUVXzXeux6EGWchmGA6h9pMNRpC5md33MELBvKZ2s7WnuICnyecc6zl66cyJIXycH92GQL2IVKB%2BDTc4zEZFbwSBnw0ykuoI%2FZb4zcW3cOlpZ5SltiuEkR5%2BunO4lNQ6uaKT2NIdvjkuuGkFgZmVYMh7xldqgQyGnOfV6lBZr7%2Bq%2FntPQ9mTaeWNDKWltaIBDgFBiDUOt8RXGCsw5nFM1blTAJl5ARvL3WTJFhLc8y%2Bjv376gD7EWr8rjeK9XTQR9j8F4CqJ9GaGebMu2XXBKQxC9%2BFP80jFuhHIcPMYC3shtuxr1uZWTpzXC1Y0tqPobqQkLOAjVb6uErtMpIV8EAwZ1AnHaEG9I4QSJ3%2Fs6lxt3z4o%2FcD5gKJuZT52%2BiTQAx5oFTHV9hq3xwGWaNuk9QInzZjzh%2BhPXgyv5aEy%2FoCvfD41QvhFHrvslmTZoS9i2gslVylh%2BIS7O6MQXhTNiFLA6tEbmmx5S6rhBf%2FICHTjoPweuRjg8SQ3dyVMypmvwBsPvp2D%2FWJ%2F0LXielpQn6xV2CIBdhtwlYHip8hg2opO%2FEOGo1twnXm1K5JbEXoVtpKMVn4LE7e6R7svW6udRPIrVGhtQgBX%2FAED0LajCu%2Bba9BjqbAfPioFba%2BF%2FP4b8WRt%2Fgk2Wn4a8PCu%2B1sQnZcSCwj0W36p%2Fn8%2FLgDBvmSel%2B3SzpRsF2DBwrbuOGhbo9YhyN3YFHsb4Q06BudFeBx3gWyseIKHg1zdeXP2A0WNjkHTmeYRlQs630kLR1DrMxOPAAR%2Fc78yz7xZDPds1zkKWikFQ6lPKKRo%2FjwmKFdhbKbMauTDw6a3egz1ZECw1E&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250213T100152Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=ASIASWG7WQ7NRIMB7XCI%2F20250213%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=597a986782ccf9b66d54f9c0e2bada4dc0a509d7a2b43c95760c9beb8477c3e7" download="contact-us.pdf" className="text-primary"> Contact Us</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
