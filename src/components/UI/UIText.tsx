import styled from "styled-components/native";
import { TextProps } from "react-native";
import theme from "../../theme";
import { ReactNode } from "react";

interface UITextProps extends TextProps {
    size?: number;
    type?: 'uppercase' | 'lowercase' | 'capitalize';
    weight?: 400 | 500 | 600 | 700 | 800 | 900
    color?: string;
    align?: 'left' | 'center' | 'right';
    children: ReactNode | ReactNode[];
}

const UITextStyled = styled.Text`
    color: ${(props: UITextProps) => props.color || theme.COLORS.dark.secondary};
    text-transform: ${(props: UITextProps) => props.type || 'none'};
    font-size: ${(props: UITextProps) => props.size || theme.SIZES.font.medium}px;
    font-weight: ${(props: UITextProps) => props.weight || '400'};
    text-align: ${(props: UITextProps) => props.align || 'center'};
`;

function UIText({ children, ...props }: UITextProps) {
    return (
        <UITextStyled
            {...props}
        >{ children }</UITextStyled>
    );
}

export default UIText;