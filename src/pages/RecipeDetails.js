import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RecipeService from '../services/RecipeService';

import HeaderNav from '../components/HeaderNav';

import './RecipeDetails.css';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({
    titre: ""
  });

  const {id} = useParams();

  const fetchRecipe = () => {
    RecipeService.readOne(id).then(res => {
      setRecipe(res.data);
    });
  }
  
  useEffect(fetchRecipe, [id]);

  return (
    <div className="recipe-details">
        <div className="background-filter"></div>
        <div className="background-img-2"></div>
        <HeaderNav/>
        <h1>{recipe.titre}</h1>
    </div>
  );
}

export default RecipeDetails;
