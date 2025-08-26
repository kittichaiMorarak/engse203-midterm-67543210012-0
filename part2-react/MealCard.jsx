// src/components/MealCard.jsx
import React from 'react';

const MealCard = ({ meal }) => {
  return (
    <div className="meal-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="meal-info">
        <h3>{meal.strMeal}</h3>
      </div>
    </div>
  );
};

export default MealCard;