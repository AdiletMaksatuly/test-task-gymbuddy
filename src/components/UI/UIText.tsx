import styled from "styled-components/native";
import {StyleSheet} from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
import theme from "../../theme";

interface UITextProps {
    size?: number;
    type?: 'uppercase' | 'lowercase' | 'capitalize';
    weight?: 400 | 500 | 600 | 700 | 800 | 900
    style?: NamedStyles<any>;
    children: string;
}

const UITextStyled = styled.Text`
    color: #ffffff;
    text-transform: ${(props: UITextProps) => props.type || 'none'};
    font-size: ${(props: UITextProps) => props.size || theme.SIZES.font.medium}px;
    font-weight: ${(props: UITextProps) => props.weight || '400'};
`;

function UIText({ children, ...props }: UITextProps) {
    return (
        <UITextStyled
            {...props}
        >{ children }</UITextStyled>
    );
}

export default UIText;