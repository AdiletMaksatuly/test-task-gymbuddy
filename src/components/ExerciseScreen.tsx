import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import UIText from "./UI/UIText";
import theme from "../theme";
import UIButton from "./UI/UIButton";
import { fetchExercises } from "../api/";
import { Exercise } from "../models/exercies.model";
import Exercises from "./Exercises";
import { ALL_STEPS_COUNT } from "../models/steps.const";
import { EXERCISES_SCREEN_PADDING_X } from "../models/exercises-screen.const";

function ExerciseScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        fetchExercises()
            .then((exercises: Exercise[]) => {
                setExercises(exercises);
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
            <UIText weight={500} type={"uppercase"}>Трисет</UIText>
            <View style={styles.counter}>
                <UIText weight={700} type={"uppercase"} size={theme.SIZES.font.xxlarge}>{ getHeaderText() }</UIText>
                <UIText weight={500} type={"uppercase"} size={theme.SIZES.font.small}>Подход</UIText>
            </View>
            {
                exercises && exercises.length
                    ? <Exercises exercises={exercises} currentStep={currentStep} />
                    : <UIText>Загрузка...</UIText>
            }
            <UIButton style={styles.submitButton} onPress={goNextStep}>
                <UIText
                    color={theme.COLORS.dark.primary}
                    weight={600}
                    type={"uppercase"}>
                        { getConfirmButtonText() }
                </UIText>
            </UIButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: EXERCISES_SCREEN_PADDING_X,
    },
    counter: {
        marginTop: 15,
        alignItems: 'center',
    },
    submitButton: {
        marginTop: 40,
    }
});

export default ExerciseScreen;