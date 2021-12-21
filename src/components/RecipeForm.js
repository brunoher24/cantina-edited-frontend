import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

// global
import {NIVEAUX} from '../global';
//service
import RecipeService from '../services/RecipeService';
//composants
import Ingredient from './Ingredient';
import Etape from './Etape';
// css
import './RecipeForm.css';


function RecipeForm({recipe=null, formTitle, submitAction}) {
    const recipe_ = recipe ? {...recipe} : {...RecipeService.model};
    const [recipeData, setRecipeData] = useState(recipe_);
    const [imgSrc, setImgSrc] = useState("");
    const [imageNameInDatabase, setImageNameInDatabase] = useState(null);
    const [showInput, setShowInput] = useState(true);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        // formData["personnes"] = parseInt(formData["personnes"]);
        // formData["tempsPreparation"] = parseInt(formData["tempsPreparation"]);
        for(const key in recipeData) {
            if(!formData.get(key)) {
                if(typeof recipeData[key] === "object") {
                  for(const elem of recipeData[key]) {
                    formData.append(key, elem);
                  }
                } else {
                    formData.append(key, recipeData[key]);
                }
            }
        }
        if(imageNameInDatabase) {
            formData.append("imageNameInDatabase", imageNameInDatabase);
            console.log(formData.get("imageNameInDatabase"));
        }

        for(const key of formData.keys()) {
            console.log(key, formData.get(key));
        }
       
        submitAction === "create" ? createRecipe(formData) : updateRecipe(formData);
    }

    const createRecipe = formData => {
        RecipeService.create(formData);
    }

    const updateRecipe = formData => {
        RecipeService.update(recipeData.id, formData);
    }

    const handleInputChange = e => {
        const recipeData_ = {...recipeData};
        const key = e.target.name;
        recipeData_[key] = e.target.value;
        setRecipeData(recipeData_);
    }

    const updateIngredientParts = (index, i, value) => {
        const recipeData_ = {...recipeData};
        recipeData_.ingredients[index][i] = value.split(",").join(" ");
        setRecipeData(recipeData_);
    }

    const deleteIngredient = index => {
        const recipeData_ = {...recipeData};
        recipeData_.ingredients.splice(index, 1);
        setRecipeData(recipeData_);
    }

    const addIngredient = () => {
        const recipeData_ = {...recipeData};
        recipeData_.ingredients.push(["", ""]);
        setRecipeData(recipeData_);
    }

    const updateEtape = (index, value) => {
        const recipeData_ = {...recipeData};
        recipeData_.etapes[index] = value;
        setRecipeData(recipeData_);
    }

    const deleteEtape = index => {
        const recipeData_ = {...recipeData};
        recipeData_.etapes.splice(index, 1);
        setRecipeData(recipeData_);
    }

    const addEtape = () => {
        const recipeData_ = {...recipeData};
        recipeData_.etapes.push("");
        setRecipeData(recipeData_);
    }

    const handleInputFileChange = e => {
        const reader = new FileReader();
        reader.onload = function (evt) {
            setImgSrc(evt.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        setImageNameInDatabase(`${e.target.files[0].name.split(".")[0]}-${Date.now()}`);
        // setInputFile(e.target.files[0]);
    }

    const removeImageFile = () => {
        setImgSrc(null);
        setImageNameInDatabase(null);
        setShowInput(false);
        window.setTimeout(() => {
            setShowInput(true);
        }, 500);
    }

    return (
        <div className="recipe-form">
            <form 
            onSubmit={handleSubmit} 
            className="recipe-form" 
            encType="multipart/form-data">
                 <h1>{formTitle}</h1>
                <div className="form-field">
                    <label>Titre</label>
                    <input name="titre" type="text" value={recipeData.titre} onChange={handleInputChange}/>
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea name="description" value={recipeData.description} onChange={handleInputChange}>
                    
                    </textarea>
                </div>
                <div className="form-field">
                    <label>Niveau</label>
                    <select name="niveau" value={recipeData.niveau} onChange={handleInputChange}>
                        {NIVEAUX.map((niveau, index) => (
                            <option key={index} value={niveau}>{niveau}</option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label>Nombre de personnes</label>
                    <input name="personnes" type="number" value={recipeData.personnes} onChange={handleInputChange}/>
                </div>
                <div className="form-field">
                    <label>Temps de préparation (en minutes)</label>
                    <input name="tempsPreparation" type="number" value={recipeData.tempsPreparation} onChange={handleInputChange}/>
                </div>

                <div className="form-field">
                    <label>Ingredients</label>
                    {recipeData && recipeData.ingredients && recipeData.ingredients.map((ingredient, index) => (
                        <Ingredient key={index} parts={ingredient} 
                        onDelete={() => {deleteIngredient(index)}}
                        onUpdateParts={(i, value) => {updateIngredientParts(index, i, value)}}
                        />
                    ))}
                    <button type="button" onClick={addIngredient}>Ajouter un ingrédient</button>
                </div>

                <div className="form-field">
                    <label>Etapes</label>
                    {recipeData && recipeData.etapes && recipeData.etapes.map((etape, index) => (
                        <Etape key={index} etape={etape} 
                        onDelete={() => {deleteEtape(index)}}
                        onUpdateEtape={value => {updateEtape(index, value)}}
                        />
                    ))}
                    <button type="button" onClick={addEtape}>Ajouter une étape</button>
                </div>

                {   showInput &&
                <div className="form-field">
                    <div className="input-file-ctnr">
                        <input 
                        className="input-file" 
                        type="file"
                        name="image"
                        onChange={handleInputFileChange}
                        />
                        <button className="fake-input-file-btn">Ajouter une image</button>
                    </div>
                    {   imgSrc &&
                    <div className="file-input-image-preview-ctnr">
                        <img className="file-input-image-preview" src={imgSrc} alt=""/>
                        <button className="remove-item-btn file-input-image-preview-delete-btn" onClick={removeImageFile}><FaTimes/></button>
                    </div>
                    }
                    
                </div>
                }
                <input type="submit"/>

            </form>
        </div>
    );
}

export default RecipeForm;
