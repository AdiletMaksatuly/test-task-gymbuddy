import { Dimensions } from "react-native";

export const getViewportWidth = () => {
    return Dimensions.get('window').width;
}