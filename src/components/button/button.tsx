import React, { ReactElement } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Text from "../../components/text/newtext";

import styles from "./buttonStyles";

type BtnProps = {
    btnText: string;
} & TouchableOpacityProps;

export default function Button({
    btnText,
    style,
    ...props
}: BtnProps): ReactElement {
    return (
        <TouchableOpacity {...props} style={[styles.btn, style]}>
            <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>
    );
}
