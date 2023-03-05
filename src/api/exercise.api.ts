import { API_URL } from "./api.const";

export const fetchExercises = async () => {
    try {
        const response = await fetch(API_URL + 'exercises');
        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}