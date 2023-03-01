import React, {useMemo} from 'react';
import { Image, StyleSheet, View } from "react-native";
import UIText from "./UI/UIText";
import { Exercise } from "../models/exercies.model";
import { ALL_STEPS_COUNT } from "../models/steps.const";
import { EXERCISES_SCREEN_PADDING_X } from "../models/exercises-screen.const";
import { getViewportWidth } from "../utils";

interface ExercisesProps {
    exercises: Exercise[],
    currentStep: number
}

const COLUMN_GAP = 20;
const componentWidth = getViewportWidth() - (EXERCISES_SCREEN_PADDING_X * 2);
const imageWidth = (componentWidth / ALL_STEPS_COUNT) - COLUMN_GAP;

function Exercises({ exercises, currentStep }: ExercisesProps) {
    const getImageStyles = (id: number) => ({
            ...styles.image,
            width: imageWidth,
            height: imageWidth * 2,
            ...(id === currentStep
                ? { opacity: 1 }
                : { opacity: 0.5 })
    });

    const calculatePosition = useMemo(() => {
        const [{ translateX }] = styles.images.transform;

        return ({
            ...styles.images,
            transform: [{translateX: translateX -(imageWidth + COLUMN_GAP) * currentStep}],
        });
    }, [currentStep])

    return (
        <View style={styles.exercises}>
            <UIText
                style={styles.exerciseName}
                weight={600}
                type={"uppercase"}>
                { exercises[currentStep].name }
            </UIText>

            <View style={calculatePosition}>
                {
                    exercises.map((exercise: Exercise, index) => (
                        <Image
                            style={getImageStyles(index)}
                            key={exercise.id}
                            source={{ uri: exercise.imageURL }} />
                    ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    exercises: {
        flex: 1,
        maxWidth: '100%',
        overflow: 'hidden',
    },
    exerciseName: {
        textAlign: 'center',
        marginVertical: 30,
    },
    images: {
      flexDirection: 'row',
      columnGap: COLUMN_GAP,
        transform: [{ translateX: imageWidth + COLUMN_GAP}]
    },
    image: {
        width: 100,
        height: 200,
    }
});

export default Exercises;