import React, { ReactElement } from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
} from "react-native";
import Text from "../../components/text/newtext";

import styles from "./buttonStyles";

type BtnProps = {
    btnText: string;
    loading?: boolean;
} & TouchableOpacityProps;

export default function Button({
    btnText,
    loading,
    style,
    ...props
}: BtnProps): ReactElement {
    return (
        <TouchableOpacity disabled={loading} {...props} style={[styles.btn, style]}>
            {loading ? (
                <ActivityIndicator color="#000"/>
            ) : (
                <Text style={styles.btnText}>{btnText}</Text>
            )}
        </TouchableOpacity>
    );
}
