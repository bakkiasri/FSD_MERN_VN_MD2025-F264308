import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [submittedRating, setSubmittedRating] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setSubmittedRating(rating);
    alert(`Thanks for rating ${rating} star${rating > 1 ? "s" : ""}`); // Save current rating
    // Optionally clear rating: setRating(0);
  };

  return (
    <Form className="mt-5 p-3 shadow-lg rounded-5" onSubmit={handleSubmit}>
      <h4>Give your ratings here:</h4>
      <div className="p-3">
        {[...Array(5)].map((star, index) => {
          const currentRate = index + 1;
          return (
            <label key={currentRate}>
              <input
                type="radio"
                name="rate"
                value={currentRate}
                onClick={() => setRating(currentRate)}
                style={{ display: "none" }}
              />
              <FaStar
                size={40}
                color={currentRate <= (hover || rating) ? "yellow" : "grey"}
                onMouseEnter={() => setHover(currentRate)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            </label>
          );
        })}
      </div>
      <Button className="border-0 bg-paimary rounded-5" type="submit">
        Submit Rating
      </Button>

      {/* {submittedRating && (
        <p style={{ marginTop: '10px' }}>You rated this: {submittedRating} star(s)</p>
      )} */}
    </Form>
  );
};

export default StarRating;
