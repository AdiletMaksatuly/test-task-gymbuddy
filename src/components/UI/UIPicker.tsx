import UiCarousel from "./UICarousel";
import { getViewportWidth } from "../../utils";
import { StyleSheet, View } from "react-native";
import { RefObject } from "react";
import Carousel from "react-native-snap-carousel";

interface UiPickerProps {
    items: any[];
    renderItem: (item: any) => JSX.Element;
    pickerRef: RefObject<Carousel<any>>;
    activeSlideIndex?: number;
    onPick?: (slideIndex: number) => void;
    width?: number;
    height?: number;
    itemWidth?: number;
}

function UiPicker({
                      items,
                      renderItem,
                      pickerRef,
                      width,
                      height,
                      itemWidth,
                      onPick,
                      activeSlideIndex }: UiPickerProps) {
    return (
        <View style={{...styles.picker, height: height || 50}}>
            <UiCarousel
                carouselRef={pickerRef}
                data={items}
                firstItem={activeSlideIndex}
                renderItem={renderItem}
                carouselWidth={width || getViewportWidth()}
                itemWidth={itemWidth || getViewportWidth() / 3}
                onSnapToItem={onPick}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default UiPicker;