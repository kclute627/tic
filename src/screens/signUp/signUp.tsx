// import React, { ReactElement, useRef, useState, useEffect } from "react";
// import styles from "./RegStyles";
// import { GraidentBackground, TextInput, Button, Text } from "@components";
// import { Auth } from "aws-amplify";
// import OTPInputView from "@twotalltotems/react-native-otp-input"
// import { StackNavParams } from "@config/nav";
// import { useHeaderHeight } from "@react-navigation/elements";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RouteProp } from "@react-navigation/native";
// import {
//     ScrollView,
//     TextInput as NativeInput,
//     Alert,
//     KeyboardAvoidingView,
//     ActivityIndicator,
//     TouchableOpacity,
// } from "react-native";
// import { Platform } from "react-native";
// import { colors } from "@utils";

// type SignUpProps = {
//     navigation: NativeStackNavigationProp<StackNavParams, "SignUp">;
//     route: RouteProp<StackNavParams, "SignUp">;
// };

// export default function SignUp({
//     navigation,
//     route,
// }: SignUpProps): ReactElement {
//     const passwordRef = useRef<NativeInput | null>(null);
//     const emailRef = useRef<NativeInput | null>(null);
//     const nameRef = useRef<NativeInput | null>(null);
//     const unconfirmedUsername = route.params?.username;

//     const [form, setForm] = useState({
//         username: "riyob73239@datakop.com",
//         password: "12345678",
//         name: "Test Name",
//         email: "riyob73239@datakop.com",
//     });
//     const [loading, setLoading] = useState(false);
//     const [step, setStep] = useState<"signUp" | "otp">(
//         unconfirmedUsername ? "otp" : "signUp"
//     );
//     const [confirming, setConfirming] = useState(false);
//     const [resending, setResending] = useState(false);

//     const setFormInput = (key: keyof typeof form, value: string) => {
//         setForm({
//             ...form,
//             [key]: value,
//         });
//     };

//     useEffect(() => {
//         if (unconfirmedUsername) {
//             resendCode(unconfirmedUsername);
//             setForm({...form, username: unconfirmedUsername})
//         }
//     }, []);

//     const headerHeight = useHeaderHeight();
//     console.log(headerHeight, "headerheight");

//     // const singUp = async()=>{
//     //     try {
//     //         const res = await Auth.signUp({
//     //             username: 'test',
//     //             password: '12345678',
//     //             attributes: {
//     //                 email: 'test@test.com',
//     //                 name: 'test'
//     //             }

//     //         })
//     //         console.log(res)

//     //     } catch (error) {
//     //         console.error(error)
//     //     }
//     // }
//     const signUp = async () => {
//         setLoading(true);

//         const { username, password, email, name } = form;

//         try {
//             await Auth.signUp({
//                 username,
//                 password,
//                 attributes: {
//                     email,
//                     name,
//                 },
//             });
//             setStep("otp");
//         } catch (error) {
//             Alert.alert("Error!!", error.message || "Error!!");
//         }

//         setLoading(false);
//     };
//     const confirmCode = async (code: string) => {
//          const { username } = form;
//         setConfirming(true);
//         try {
            
//             await Auth.confirmSignUp(username, code);
           
//             navigation.navigate("Login");
//             Alert.alert(
//                 "Success!",
//                 "You Can now log in with your username and password"
//             );
//         } catch (error) {
//             console.log(error)
//             Alert.alert("Error!!", error.message || "Error!!");
//         } 
//         setConfirming(false);
//     };
//     const resendCode = async (username: string) => {
//         setResending(true);
//         try {
//             await Auth.resendSignUp(username);
//         } catch (error) {
//             Alert.alert("Error!", "Code resending failed please try later");
//         }
//         setResending(false);
//     };

//     return (
//         <GraidentBackground>
//             <KeyboardAvoidingView
//                 keyboardVerticalOffset={headerHeight}
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={{ flex: 1 }}
//             >
//                 <ScrollView contentContainerStyle={styles.container}>
//                     {step === "otp" && (
//                         <>
//                             <Text style={styles.otpText}>
//                                 Enter Code that Your received Via Email
//                             </Text>
//                             {confirming ? (
//                                 <ActivityIndicator color={colors.lightGreen} />
//                             ) : (
//                                 <>
//                                     <OTPInputView
//                                         pinCount={6}
//                                         placeholderCharacter="0"
//                                         placeholderTextColor="#5d5379"
//                                         codeInputFieldStyle={styles.otpInputBox}
//                                         codeInputHighlightStyle={
//                                             styles.otpActive
//                                         }
//                                         onCodeFilled={code => {
//                                             confirmCode(code);
//                                         }}
//                                     />
//                                     {resending ? (
//                                         <ActivityIndicator
//                                             color={colors.lightGreen}
//                                         />
//                                     ) : (
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 resendCode(form.username);
//                                             }}
//                                         >
//                                             <Text style={styles.otpBtn}>
//                                                 Resend Code
//                                             </Text>
//                                         </TouchableOpacity>
//                                     )}
//                                 </>
//                             )}
//                         </>
//                     )}

//                     {step === "signUp" && (
//                         <>
//                             <TextInput
//                                 value={form.username}
//                                 onChangeText={value => {
//                                     setFormInput("username", value);
//                                 }}
//                                 placeholder="UserName"
//                                 style={{ marginBottom: 20 }}
//                                 returnKeyType="next"
//                                 onSubmitEditing={() => {
//                                     nameRef.current?.focus();
//                                 }}
//                             />
//                             <TextInput
//                                 value={form.name}
//                                 onChangeText={value => {
//                                     setFormInput("name", value);
//                                 }}
//                                 placeholder="Name"
//                                 returnKeyType="next"
//                                 ref={nameRef}
//                                 style={{ marginBottom: 30 }}
//                                 onSubmitEditing={() => {
//                                     emailRef.current?.focus();
//                                 }}
//                             />
//                             <TextInput
//                                 value={form.email}
//                                 onChangeText={value => {
//                                     setFormInput("email", value);
//                                 }}
//                                 keyboardType="email-address"
//                                 placeholder="Email"
//                                 returnKeyType="next"
//                                 ref={emailRef}
//                                 style={{ marginBottom: 30 }}
//                                 onSubmitEditing={() => {
//                                     passwordRef.current?.focus();
//                                 }}
//                             />
//                             <TextInput
//                                 value={form.password}
//                                 onChangeText={value => {
//                                     setFormInput("password", value);
//                                 }}
//                                 placeholder="Password"
//                                 returnKeyType="done"
//                                 secureTextEntry
//                                 ref={passwordRef}
//                                 style={{ marginBottom: 30 }}
//                             />
//                             <Button
//                                 btnText="Sign Up"
//                                 onPress={signUp}
//                                 loading={loading}
//                             />
//                         </>
//                     )}
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </GraidentBackground>
//     );
// }

import React, { ReactElement, useRef, useState, useEffect } from "react";
import {
    Alert,
    ScrollView,
    TextInput as NativeTextInput,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { GraidentBackground, TextInput, Button, Text } from "@components";
import { RouteProp } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

import { NativeStackNavigationProp as StackNavigationProp } from "@react-navigation/native-stack";
import {StackNavParams as StackNavigatorParams } from "@config/nav";
import { Auth } from "aws-amplify";

import OTPInput from "@twotalltotems/react-native-otp-input";
import styles from "./RegStyles";
import { colors } from "@utils";


type SignUpProps = {
    navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
    route: RouteProp<StackNavigatorParams, "SignUp">;
};

export default function SignUp({ navigation, route }: SignUpProps): ReactElement {
    const unconfirmedUsername = route.params?.username;
    const headerHeight = useHeaderHeight();
    const passwordRef = useRef<NativeTextInput | null>(null);
    const emailRef = useRef<NativeTextInput | null>(null);
    const nameRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: "ybovezvham@email.ucms.edu.pk",
        email: "ybovezvham@email.ucms.edu.pk",
        name: "Kyle",
        password: "12345678",
    });
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"signUp" | "otp">(unconfirmedUsername ? "otp" : "signUp");
    const [confirming, setConfirming] = useState(false);
    const [resending, setResending] = useState(false);

    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

  

    const signUp = async () => {
        setLoading(true);
        const { username, password, email, name } = form;
        try {
            await Auth.signUp({
                
                username,
                password,
                attributes: {
                    email,
                    name
                }
            });
            setStep("otp");
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occurred!");
        }
        setLoading(false);
    };

    const confirmCode = async (code: string) => {
        setConfirming(true);
        
        try {
            await Auth.confirmSignUp(form.username || unconfirmedUsername || "", code);


           


            navigation.navigate("Login");
            Alert.alert("Success!", "You can now login with your account.");
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occurred!");
        }
        setConfirming(false);
    };

    const resendCode = async (username: string) => {
        setResending(true);
        try {
            await Auth.resendSignUp(username);
        } catch (error) {
            Alert.alert("Error!", error.message || "An error has occurred!");
        }
        setResending(false);
    };

    useEffect(() => {
        if (unconfirmedUsername) {
            resendCode(unconfirmedUsername);
        }
    }, []);
    return (
        <GraidentBackground>
            <KeyboardAvoidingView
                keyboardVerticalOffset={headerHeight}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    {step === "otp" && (
                        <>
                            <Text style={styles.otpText}>
                                Enter the code that you received via email.
                            </Text>
                            {confirming ? (
                                <ActivityIndicator color={colors.lightGreen} />
                            ) : (
                                <>
                                    <OTPInput
                                        placeholderCharacter="0"
                                        placeholderTextColor="#5d5379"
                                        pinCount={6}
                                        codeInputFieldStyle={styles.otpInputBox}
                                        codeInputHighlightStyle={styles.otpActive}
                                        onCodeFilled={code => {
                                            confirmCode(code);
                                        }}
                                    />
                                    {resending ? (
                                        <ActivityIndicator color={colors.lightGreen} />
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (form.username) {
                                                    resendCode(form.username);
                                                }
                                                if (unconfirmedUsername) {
                                                    resendCode(unconfirmedUsername);
                                                }
                                            }}
                                        >
                                            <Text>Resend Code</Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {step == "signUp" && (
                        <>
                            <TextInput
                                value={form.username}
                                onChangeText={value => {
                                    setFormInput("username", value);
                                }}
                                returnKeyType="next"
                                placeholder="Username"
                                style={{ marginBottom: 20 }}
                                onSubmitEditing={() => {
                                    nameRef.current?.focus();
                                }}
                            />
                            <TextInput
                                ref={nameRef}
                                value={form.name}
                                onChangeText={value => {
                                    setFormInput("name", value);
                                }}
                                returnKeyType="next"
                                placeholder="Name"
                                style={{ marginBottom: 20 }}
                                onSubmitEditing={() => {
                                    emailRef.current?.focus();
                                }}
                            />
                            <TextInput
                                keyboardType="email-address"
                                ref={emailRef}
                                value={form.email}
                                onChangeText={value => {
                                    setFormInput("email", value);
                                }}
                                returnKeyType="next"
                                placeholder="Email"
                                style={{ marginBottom: 20 }}
                                onSubmitEditing={() => {
                                    passwordRef.current?.focus();
                                }}
                            />
                            <TextInput
                                value={form.password}
                                onChangeText={value => {
                                    setFormInput("password", value);
                                }}
                                style={{ marginBottom: 30 }}
                                ref={passwordRef}
                                returnKeyType="done"
                                secureTextEntry
                                placeholder="Password"
                            />
                            <Button loading={loading} btnText="Sign-Up" onPress={signUp} />
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </GraidentBackground>
    );
}