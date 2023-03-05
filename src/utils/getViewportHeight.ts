import { Dimensions } from "react-native";

export const getViewportHeight = () => {
    return Dimensions.get('window').height;
}