import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//service
import RecipeService from '../services/RecipeService';
//components
import HeaderNav from '../components/HeaderNav';
import RecipeForm from '../components/RecipeForm';
// css
import './RecipeUpdate.css';

function RecipeUpdate() {
  const [recipe, setRecipe] = useState(null);

  const {id} = useParams();

  const fetchRecipe = () => {
    RecipeService.readOne(id).then(res => {
      setRecipe(res.data);
    });
  }
  
  useEffect(fetchRecipe, [id]);

  return (
    <div className="update-recipe">
        <div className="background-filter"></div>
        <div className="background-img-3"></div>

        <HeaderNav/>
        {recipe &&  
          <RecipeForm recipe={recipe} formTitle="Modifier cette recette" submitAction="update"/>
        }
    </div>
  );
}

export default RecipeUpdate;
