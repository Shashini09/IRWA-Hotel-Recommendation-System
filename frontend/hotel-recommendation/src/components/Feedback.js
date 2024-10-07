import React, { useState } from 'react';
import { ref, push } from '../firebase/database'; // import 'push' from firebase
import { database } from '../firebase'; // use the database from firebase.js

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === '') {
      alert('Please provide both rating and feedback.');
      return;
    }

    // Create a reference for feedback in Firebase under the 'feedbacks' node
    const feedbackRef = ref(database, 'feedbacks');

    // Push feedback to Firebase
    push(feedbackRef, {
      rating,
      feedback,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        console.log('Feedback submitted:', { rating, feedback });
        alert('Thank you for your feedback!');
        // Reset fields
        setRating(0);
        setFeedback('');
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback, please try again later.');
      });
  };

  return (
    <div style={{ margin: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Feedback</h2>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              color: value <= rating ? '#FFD700' : '#ccc',
              margin: '0 5px',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Leave your feedback here..."
        value={feedback}
        onChange={handleFeedbackChange}
        style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '10px',
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
