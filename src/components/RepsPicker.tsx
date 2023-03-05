import { StyleSheet, View } from "react-native";
import { getViewportWidth } from "../utils";
import React, { useEffect, useRef, useState } from "react";
import UIText from "./UI/UIText";
import theme from "../theme";
import UiPicker from "./UI/UIPicker";
import { EXERCISES_SCREEN_PADDING_X } from "../models/exercises-screen.const";
import Carousel from "react-native-snap-carousel";

type Reps = number;

interface RepsPickerProps {
    items: Reps[];
    onPick: (value: Reps) => void;
}

const pickerWidth = getViewportWidth() - (EXERCISES_SCREEN_PADDING_X * 2);

function RepsPicker({ items, onPick }: RepsPickerProps) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const pickerRef = useRef<Carousel<any>>(null);

    useEffect(() => {
        setActiveSlideIndex(0);
        pickerRef.current?.snapToItem(0);
    }, [items]);

    const renderItem = ({ item, index }: { item: Reps, index: number }) => {
        return (
            <View style={styles.repsPickerItem}>
                <UIText weight={700} size={
                    index === activeSlideIndex
                        ? theme.SIZES.font.xxlarge
                        : theme.SIZES.font.medium
                }>{item}</UIText>
            </View>
        )
    }

    const onPickReps = (slideIndex: number) => {
        setActiveSlideIndex(slideIndex);

        onPick(items[slideIndex]);
    }

    return (
        <View style={styles.repsPickerContainer}>
            <UIText
                style={styles.repsPickerTitle}
                type={'uppercase'}
                weight={700}
                size={theme.SIZES.font.small}
            >Укажите количество повторений</UIText>
            <UiPicker
                pickerRef={pickerRef}
                items={items}
                renderItem={renderItem}
                width={pickerWidth}
                onPick={onPickReps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    repsPickerContainer: {
        rowGap: 10,
    },
    repsPickerTitle: {},
    repsPickerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    }
});

export default RepsPicker;