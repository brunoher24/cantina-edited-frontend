import axios from "axios";
import {API_URL} from '../global';

const RecipeService = {
    model: {  
        titre: "",
        description: "",
        niveau: "",
        personnes: "",
        tempsPreparation: "",
        ingredients: [["", ""]],
        etapes: [""]
    },
    create: async (formData) => {
        try {
            const res = axios.post(`${API_URL}recipes`, formData);
            return res;
        } catch (error) {
            console.log(error);
            return {error};
        }
    },
    read: async () => {
        try {
            const data = await axios.get(`${API_URL}recipes`);
            return data;
        } catch (error) {
            console.log(error);
            return {error};
        }
    },
    readOne: async id => {
        try {
            const data = await axios.get(`${API_URL}recipe/${id}`);
            return data;
        } catch (error) {
            console.log(error);
            return {error};
        }
    },
    update: async (id, formData) => {
        try {
            const res = await axios.put(`${API_URL}recipe/${id}`, formData);
            return res;
        } catch (error) {
            console.log(error);
            return {error};
        }
    },
    delete: async id => {
        try {
            const res = await axios.delete(`${API_URL}recipe/${id}`);
            return res;
        } catch (error) {
            console.log(error);
            return {error};
        }
    },
};

export default RecipeService;