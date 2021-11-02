import React, { ReactElement, forwardRef } from "react";
import {
    TextInput as NativeTextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";
import { colors } from "@utils";

const TextInput = forwardRef< NativeTextInput ,TextInputProps>(({ style, ...props }: TextInputProps, ref): ReactElement => {
    return (
        <NativeTextInput
        
            ref={ref}
            placeholderTextColor={colors.darkPurple}
            style={[styles.textInput, style]}
            {...props}
        />
    );
});

TextInput.displayName = 'TextInput'

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: colors.lightGreen,
        backgroundColor: colors.blue2,
        padding: 10,

        color: colors.lightGreen,
        fontFamily: "DeliusUnicase_400Regular",
    },
});
export default TextInput;
