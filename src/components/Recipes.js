import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

//service
import RecipeService from '../services/RecipeService';
// css
import './Recipes.css';


function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);

    

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        RecipeService.read().then(res => {
            setRecipes(res.data);
        })
        .catch(err => {
            console.log(err);
            alert("Une erreur est survenue !");
        });
    };


    const openConfirmDeletePopup = () => {
        setShowDeleteConfirmPopup(true);
    }

    const deleteRecipe = id => {
        RecipeService.delete(id).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            alert("Une erreur est survenue !");
        });
    }

    return (
        <div className="recipes">

            { showDeleteConfirmPopup &&
                <ConfirmPopup 
                message="Confirmez-vous la suppression de cette recette ?" 
                onConfirm={confirmDeleteRecipe}
                onCancel={() => { setShowDeleteConfirmPopup(false);}}
                />
            }
            <ul className="recipes-list">
            {recipes && recipes.map((recipe, index) => (
                <li key={index}>
                    <Link to={`/recette-details/${recipe.id}`}>
                        <img src={recipe.photo} alt="super recette"/>
                    </Link>
                    <h3>{recipe.titre}</h3>
                    <div className="recipe-btns">
                        <Link to={`/modifier-ma-recette/${recipe.id}`}>Modifier</Link>
                        <button onClick={deleteRecipe}>Supprimer</button>
                    </div>


                </li>
            ))}
            </ul>
        </div>
    );
}

export default Recipes;
