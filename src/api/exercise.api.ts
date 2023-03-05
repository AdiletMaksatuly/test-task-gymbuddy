import { API_URL } from "@env";

export const fetchExercises = async () => {
    try {
        console.log(API_URL)

        const response = await fetch(API_URL + 'exercises');
        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}