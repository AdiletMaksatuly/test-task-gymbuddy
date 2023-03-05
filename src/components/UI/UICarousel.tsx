import Carousel from 'react-native-snap-carousel';
import { getViewportWidth } from "../../utils";
import { RefObject } from "react";

interface UICarouselProps {
    data: any[];
    renderItem: (item: any) => JSX.Element;
    carouselRef: RefObject<Carousel<any>>;
    firstItem?: number;
    onSnapToItem?: (slideIndex: number) => void;
    carouselWidth?: number;
    itemWidth?: number;
}

function UiCarousel({ carouselRef, data, firstItem, renderItem, carouselWidth, itemWidth, onSnapToItem }: UICarouselProps) {
    return (
        <Carousel
            ref={carouselRef}
            layout={"default"}
            data={data}
            firstItem={firstItem}
            renderItem={renderItem}
            sliderWidth={carouselWidth || getViewportWidth()}
            itemWidth={itemWidth || getViewportWidth()}
            enableMomentum={true}
            decelerationRate={0.9}
            inactiveSlideScale={1}
            onSnapToItem={onSnapToItem}
        />
    );
}

export default UiCarousel;