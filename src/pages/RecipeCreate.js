//components
import HeaderNav from '../components/HeaderNav';
import RecipeForm from '../components/RecipeForm';
// css
import './RecipeCreate.css';

function RecipeCreate() {
  return (
    <div className="create-recipe">
        <div className="background-filter"></div>
        <div className="background-img-3"></div>

        <HeaderNav/>

        <RecipeForm formTitle="Nouvelle recette" submitAction="create"/>
    </div>
  );
}

export default RecipeCreate;
