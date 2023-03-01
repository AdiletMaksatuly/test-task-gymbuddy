import styled from "styled-components/native";
import theme from "../../theme";
import { ReactNode } from "react";
import { PressableProps, StyleSheet } from "react-native";
import NamedStyles = StyleSheet.NamedStyles;

interface UIButtonProps extends PressableProps {
    style?: NamedStyles<any>;
    children: ReactNode;
}

const UIButtonStyled = styled.Pressable`
    padding: 15px 30px;
    background-color: ${theme.COLORS.dark.secondary};
    border-radius: 50px;
    border: 1px solid ${theme.COLORS.dark.secondary};
`

function UIButton({ children, ...props }: UIButtonProps) {
    return (
        <UIButtonStyled { ...props }>{ children }</UIButtonStyled>
    );
}

export default UIButton;