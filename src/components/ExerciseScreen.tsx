import { View, StyleSheet } from "react-native";
import { useEffect, useMemo, useState } from "react";
import theme from "../theme";
import UIText from "./UI/UIText";
import UIButton from "./UI/UIButton";
import Exercises from "./Exercises";
import WeightPicker from "./WeightPicker";
import RepsPicker from "./RepsPicker";
import { Exercise } from "../models/exercies.model";
import { ALL_STEPS_COUNT } from "../models/steps.const";
import { EXERCISES_SCREEN_PADDING_X } from "../models/exercises-screen.const";
import { generateNumbers, getViewportHeight } from "../utils";
import { fetchExercises } from "../api/";
import { Training } from "../models/training.model";

const MAX_WEIGHT = 200;
const MAX_REPS = 50;

function ExerciseScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [threeSet, setThreeSet] = useState<Training[]>([]);

    const reps = useMemo(() => {
        return generateNumbers(MAX_REPS)
    }, [currentStep]);

    const weights = useMemo(() => {
        return generateNumbers(MAX_WEIGHT)
    }, [currentStep]);

    useEffect(() => {
        fetchExercises()
            .then((exercises: Exercise[]) => {
                setExercises(exercises);

                setThreeSet([{
                    exercise: exercises[currentStep],
                    weight: 0,
                    reps: 0,
                    step: currentStep
                }])
            })
            .catch((error: Error) => {
                setFetchError(error);
            });
    }, []);

    useEffect(() => {
        setThreeSet(prev => [...prev, {
            exercise: exercises[currentStep],
            weight: 0,
            reps: 0,
            step: currentStep
        }]);
    }, [currentStep]);

    const pickHandler = (value: number, triggeredBy: 'weight' | 'reps'): void => {
        if (exercises.length === 0) return;

        const currentExercise = exercises[currentStep];

        const currentExerciseInThreeSet = threeSet.find((training) => {
            return training.exercise.id === currentExercise.id;
        });

        if (!currentExerciseInThreeSet) {
            setThreeSet(prev => [...prev, {
                exercise: exercises[currentStep],
                weight: triggeredBy === 'weight' ? value : 0,
                reps: triggeredBy === 'reps' ? value : 0,
                step: currentStep
            }])
        }

        if (triggeredBy === 'weight') {
            setThreeSet(prev => prev.map((training) => {
                if (training.exercise.id === currentExercise.id) {
                    return {
                        ...training,
                        weight: value,
                    }
                }

                return training;
            }));
        }

        if (triggeredBy === 'reps') {
            setThreeSet(prev => prev.map((training) => {
                if (training.exercise.id === currentExercise.id) {
                    return {
                        ...training,
                        reps: value,
                    }
                }

                return training;
            }));
        }
    };

    const getHeaderText = (): string => {
        return `${currentStep + 1} / ${ALL_STEPS_COUNT}`;
    }

    const getConfirmButtonText = (): string => {
        if (currentStep === ALL_STEPS_COUNT - 1) {
            return 'Завершить';
        }
        return `Подтвердить (${currentStep + 1} из ${ALL_STEPS_COUNT})`;
    }

    const goNextStep = (): void => {
        if (ALL_STEPS_COUNT - 1 === currentStep) {
            console.log(threeSet);
            return;
        }

        setCurrentStep(prev => prev + 1)
    }


    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <UIText weight={500} type={"uppercase"}>Трисет</UIText>
                <View style={styles.counter}>
                    <UIText weight={700} type={"uppercase"} size={theme.SIZES.font.xxlarge}>{ getHeaderText() }</UIText>
                    <UIText weight={500} type={"uppercase"} size={theme.SIZES.font.small}>Подход</UIText>
                </View>
            </View>

            {
                fetchError
                    ? <UIText>Ошибка загрузки упражнений { JSON.stringify(fetchError.message) }</UIText>
                    : exercises && exercises.length
                        ? <Exercises exercises={exercises} currentStep={currentStep} />
                        : <UIText>Загрузка...</UIText>
            }


            <View style={styles.screenFooter}>
                <WeightPicker items={weights} onPick={(value) => pickHandler(value, 'weight')}/>
                <RepsPicker items={reps} onPick={(value) => pickHandler(value, 'reps')} />

                <UIButton style={styles.submitButton} onPress={goNextStep}>
                    <UIText
                        color={theme.COLORS.dark.primary}
                        weight={600}
                        type={"uppercase"}>
                        { getConfirmButtonText() }
                    </UIText>
                </UIButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: getViewportHeight(),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
        paddingHorizontal: EXERCISES_SCREEN_PADDING_X,  borderWidth: 1,
    },
    screenHeader: {
        rowGap: 20,
    },
    counter: {},
    screenFooter: {
        rowGap: 20,
    },
    submitButton: {}
});

export default ExerciseScreen;