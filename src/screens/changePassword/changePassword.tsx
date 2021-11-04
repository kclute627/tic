import React, { useState, useRef, useEffect, ReactElement } from "react";

import { GraidentBackground, TextInput, Button, Text } from "@components";
import styles from "./changePassword-styles";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAuth } from "@context/Auth-context";
import { Auth } from "aws-amplify";
import { StackNavParams } from "@config/nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    ScrollView,
    TextInput as NativeInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Alert,
} from "react-native";

type ChangePasswordScreenNavProps = NativeStackNavigationProp<
    StackNavParams,
    "ChangePassword"
>;

type ChangePasswordProps = {
    navigation: ChangePasswordScreenNavProps;
};

export default function forgotPassword({
    navigation,
}: ChangePasswordProps): ReactElement {
    const [form, setForm] = useState({
        newPassword: "",
        oldPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const passwordRef = useRef<NativeInput | null>(null);

    const { oldPassword, newPassword } = form;
    const { user } = useAuth();

    const changePassword = async () => {
        setLoading(true);
        try {
            await Auth.changePassword(user, oldPassword, newPassword);
            Alert.alert("Password Changed!");

            navigation.navigate("Settings");
        } catch (error) {
            Alert.alert("Error!!", error.message || "Error Occurred!!");
        }
        setLoading(false);
    };

    const formHelper = (value: string, name: keyof typeof form) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const headerHeight = useHeaderHeight();
    return (
        <GraidentBackground>
            <KeyboardAvoidingView
                keyboardVerticalOffset={headerHeight}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <TextInput
                        value={oldPassword}
                        onChangeText={value => {
                            formHelper(value, "oldPassword");
                        }}
                        placeholder="Old Password"
                        secureTextEntry
                        style={{ marginBottom: 20 }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passwordRef.current?.focus();
                        }}
                    />
                    <TextInput
                        value={newPassword}
                        onChangeText={value => {
                            formHelper(value, "newPassword");
                        }}
                        placeholder="New Password"
                        style={{ marginBottom: 20 }}
                        ref={passwordRef}
                        returnKeyType="done"
                        secureTextEntry
                    />

                    <Button
                        btnText="Change Password"
                        onPress={changePassword}
                        loading={loading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </GraidentBackground>
    );
}
