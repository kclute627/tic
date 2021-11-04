import React, { useState, ReactElement } from "react";

import { GraidentBackground, TextInput, Button } from "@components";
import styles from "./forgotPassword-styles";
import { Auth } from "aws-amplify";
import { useHeaderHeight } from "@react-navigation/elements";
import { StackNavParams } from "@config/nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    ScrollView,
    TextInput as NativeInput,
    Platform,
  
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { useRef } from "react";

type ForgotPasswordScreenNavProps = NativeStackNavigationProp<
    StackNavParams,
    "ForgotPassword"
>;

type ForgotPasswordProps = {
    navigation: ForgotPasswordScreenNavProps;
};

export default function forgotPassword({
    navigation,
}: ForgotPasswordProps): ReactElement {
    const [form, setForm] = useState({
        username: "",
        password: "",
        code: "",
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"1" | "2">("1");
    const headerHeight = useHeaderHeight();
    const passwordRef = useRef<NativeInput | null>(null);

    const { username, code, password } = form;

    const forgotPassword = async () => {
        setLoading(true);
        try {
            await Auth.forgotPassword(username);
            setStep("2");
        } catch (error) {
            Alert.alert("Error", error.message || "An error has occurred!");
        }
        setLoading(false);
    };

    const formHelper = (value: string, field: keyof typeof form) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const forgotPasswordSubmit = async () => {
           setLoading(true);
           try {
               await Auth.forgotPasswordSubmit(username, code,password)
               Alert.alert('Success!, "Password Changed!!')
               navigation.navigate('Login')
           } catch (error) {
               Alert.alert("Error", error.message || "An error has occurred!");
           }
           setLoading(false);
    };
    return (
        <GraidentBackground>
            <KeyboardAvoidingView
                keyboardVerticalOffset={headerHeight}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    {step == "1" && (
                        <TextInput
                            value={username}
                            onChangeText={value => {
                                formHelper(value, "username");
                            }}
                            placeholder="Username"
                            style={{ marginBottom: 20 }}
                            returnKeyType="done"
                            // onSubmitEditing={() => {
                            //     passwordRef.current?.focus();
                            // }}
                        />
                    )}
                    {step == "2" && (
                        <>
                            <TextInput
                                value={code}
                                onChangeText={value => {
                                    formHelper(value, "code");
                                }}
                                placeholder="Verification Code"
                                style={{ marginBottom: 20 }}
                                returnKeyType="next"
                                secureTextEntry
                                onSubmitEditing={() => {
                                    passwordRef.current?.focus();
                                }}
                            />
                            <TextInput
                                value={password}
                                onChangeText={value => {
                                    formHelper(value, "password");
                                }}
                                ref={passwordRef}
                                secureTextEntry

                                placeholder="New Password"
                                style={{ marginBottom: 20 }}
                                returnKeyType="done"
                            />
                        </>
                    )}

                    <Button
                        btnText="Submit"
                        onPress={
                            step === "1" ? forgotPassword : forgotPasswordSubmit
                        }
                        loading={loading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </GraidentBackground>
    );
}
