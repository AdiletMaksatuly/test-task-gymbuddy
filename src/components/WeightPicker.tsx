import { StyleSheet, View } from "react-native";
import { getViewportWidth } from "../utils";
import { EXERCISES_SCREEN_PADDING_X } from "../models/exercises-screen.const";
import { useState } from "react";
import UIText from "./UI/UIText";
import theme from "../theme";
import UiPicker from "./UI/UIPicker";

type Weight = number;

interface WeightPickerProps {
    items: Weight[];
    onPick: (value: Weight) => void;
}

const pickerWidth = getViewportWidth() - (EXERCISES_SCREEN_PADDING_X * 2);
const pickerHeight = 50;

function WeightPicker({ items, onPick }: WeightPickerProps) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const renderItem = ({ item, index }: { item: Weight, index: number }) => {
        return (
            <View style={styles.weightPickerItem}>
                <UIText
                    weight={700}
                    size={
                        index === activeSlideIndex
                            ? theme.SIZES.font.xxlarge
                            : theme.SIZES.font.medium
                    }
                >{item}</UIText>
            </View>
        )
    }

    const onPickWeight = (slideIndex: number) => {
        setActiveSlideIndex(slideIndex);

        onPick(items[slideIndex]);
    };

    return (
        <View style={styles.weightPickerContainer}>
            <UIText
                style={styles.weightPickerTitle}
                type={'uppercase'}
                weight={700}
                size={theme.SIZES.font.small}
            >Укажите вес с которым вы работали</UIText>
            <UiPicker
                items={items}
                renderItem={renderItem}
                width={pickerWidth}
                height={pickerHeight}
                onPick={onPickWeight}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    weightPickerContainer: {
        rowGap: 10,
    },
    weightPickerTitle: {},
    weightPickerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    }
});

export default WeightPicker;