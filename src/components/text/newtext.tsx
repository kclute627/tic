import React, { ReactNode, ReactElement } from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

type TextProps = {
    weight: "400" | "700";
    children: ReactNode;
} & NativeTextProps;

const defaultProps = {
    weight: "400",
};
export default function Newtext({
    children,
    style,
    weight,
}: TextProps): ReactElement {
    let fontFamily;

    if (weight == "700") fontFamily = "DeliusUnicase_700Bold";
    if (weight == "400") fontFamily = "DeliusUnicase_400Regular";
    return (
        <NativeText style={[{ fontFamily: fontFamily }, style]}>
            {children}
        </NativeText>
    );
}
Newtext.defaultProps = defaultProps;
