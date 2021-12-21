import { FaTimes } from 'react-icons/fa';
// css
import './RecipeForm.css';

function Ingredient({parts, onDelete, onUpdateParts}) {

    const handlePartChange = (value, index) => {
        onUpdateParts(index, value);
    }

    return (
        <div className="ingredient">   
            <input placeholder="Quantité (ex: 5, 50ml, 50g)" name="part1" type="text" value={parts[0]} onChange={e => {handlePartChange(e.target.value, 0)}}/>
            <input placeholder="ex: 'de sel', 'de beurre', ..." name="part2" type="text" value={parts[1]} onChange={e => {handlePartChange(e.target.value, 1)}}/>
            <button type="button" className="remove-item-btn" onClick={onDelete}><FaTimes/></button>
        </div>
    );
}

export default Ingredient;
