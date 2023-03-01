import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
import theme from "../../theme";
import { ReactNode } from "react";

interface UITextProps {
    size?: number;
    type?: 'uppercase' | 'lowercase' | 'capitalize';
    weight?: 400 | 500 | 600 | 700 | 800 | 900
    style?: NamedStyles<any>;
    color?: string;
    children: ReactNode;
}

const UITextStyled = styled.Text`
    color: ${(props: UITextProps) => props.color || theme.COLORS.dark.secondary};
    text-transform: ${(props: UITextProps) => props.type || 'none'};
    font-size: ${(props: UITextProps) => props.size || theme.SIZES.font.medium}px;
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