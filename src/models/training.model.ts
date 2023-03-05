import { Exercise } from "./exercies.model";

export interface Training {
    exercise: Exercise;
    weight: number;
    reps: number;
    step: number,
}