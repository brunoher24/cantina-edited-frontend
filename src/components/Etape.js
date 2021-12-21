import { FaTimes } from 'react-icons/fa';
// css
import './RecipeForm.css';


function Etape({etape, onDelete, onUpdateEtape}) {

    const handleEtapeChange = value => {
        onUpdateEtape(value);
    }

    return (
        <div className="etape">   
            <textarea value={etape} onChange={e => {handleEtapeChange(e.target.value)}}></textarea>
            <button type="button" className="remove-item-btn" onClick={onDelete}><FaTimes/></button>
        </div>
    );
}

export default Etape;
