export const fetchExercises = async () => {
    try {
        const response = await fetch('https://red-brooms-judge-2-133-73-79.loca.lt/exercises/');
        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}