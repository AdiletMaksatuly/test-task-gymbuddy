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

const MAX_WEIGHT = 200;
const MAX_REPS = 50;

function ExerciseScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [fetchError, setFetchError] = useState<Error | null>(null);

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
            })
            .catch((error: Error) => {
                setFetchError(error);
            });
    }, []);

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
                <WeightPicker items={weights} onPick={() => {}}/>
                <RepsPicker items={reps} onPick={() => {}} />

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
        borderColor: 'red',
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