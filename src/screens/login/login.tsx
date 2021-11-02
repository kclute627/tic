import React, { ReactElement, useRef, useState } from "react";
import styles from "./loginStyles";
import { View } from "react-native";
import { GraidentBackground, TextInput, Button, Text } from "@components";
import { Auth } from "aws-amplify";
import { StackNavParams } from "@config/nav";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    ScrollView,
    TextInput as NativeInput,
    TouchableOpacity,
    Alert,
} from "react-native";

type LoginProps = {
    navigation: NativeStackNavigationProp<StackNavParams, "Login">;
};

export default function login({ navigation }: LoginProps): ReactElement {
    const passwordRef = useRef<NativeInput | null>(null);

    const [form, setForm] = useState({
        userName: "test",
        password: "12345678",
    });
    const [loading, setLoading] = useState(false);

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    // const singUp = async()=>{
    //     try {
    //         const res = await Auth.signUp({
    //             username: 'test',
    //             password: '12345678',
    //             attributes: {
    //                 email: 'test@test.com',
    //                 name: 'test'
    //             }

    //         })
    //         console.log(res)

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    const login = async () => {
        setLoading(true);

        const { userName, password } = form;

        try {
            await Auth.signIn(userName, password);
            navigation.navigate("Home");
        } catch (error) {
            if (error.code === "UserNotConfirmedException") {
                navigation.navigate("SignUp", { username: userName });
            } else {
                Alert.alert("Error!", error.message || "An error has occured");
            }
        }

        setLoading(false);
    };

    return (
        <GraidentBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    value={form.userName}
                    onChangeText={value => {
                        setFormInput("userName", value);
                    }}
                    placeholder="UserName"
                    style={{ marginBottom: 20 }}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        passwordRef.current?.focus();
                    }}
                />
                <TextInput
                    value={form.password}
                    onChangeText={value => {
                        setFormInput("password", value);
                    }}
                    placeholder="Password"
                    secureTextEntry
                    returnKeyType="done"
                    ref={passwordRef}
                    style={{ marginBottom: 30 }}
                />

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("ForgotPassword");
                    }}
                >
                    <Text style={styles.forgotLink}> Forgot Password?</Text>
                </TouchableOpacity>

                <Button btnText="Login" onPress={login} loading={loading} />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("SignUp");
                    }}
                >
                    <Text style={styles.regLink}>
                       
                        Don&apos;t Have an Account?
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </GraidentBackground>
    );
}
