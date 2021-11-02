import React, { ReactElement, useState } from "react";
import styles from "./home.styles";

import { ScrollView, Image, View } from "react-native";
import { Button } from "@components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParams } from "@config/nav";
import { GraidentBackground, Text } from "@components";
import { useAuth } from "@context/Auth-context";
import { Auth } from "aws-amplify";
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    const { user } = useAuth();
    const [signOut, setSignOut] = useState(false);

    return (
        <GraidentBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("@assets/logo.png")}
                />
                <View style={styles.btn}>
                    <Button
                        btnText="Single Player"
                        onPress={() => navigation.navigate("SinglePlayer")}
                        style={styles.btns}
                    />
                    <Button btnText="Multiplayer Player" style={styles.btns} />
                    <Button
                        loading={signOut}
                        btnText={!user ? "Login" : "Log Out"}
                        onPress={async () => {
                            if (user) {
                                // logout
                                try {
                                    setSignOut(true);
                                    await Auth.signOut();
                                    setSignOut(false);
                                } catch (error) {
                                    alert("error");
                                }
                            }else{
                                navigation.navigate("Login");
                            }
                           
                        }}
                        style={styles.btns}
                    />
                    <Button
                        btnText="Settings"
                        onPress={() => navigation.navigate("Settings")}
                        style={styles.btns}
                    />
                    {user && (
                        <Text weight="400" style={styles.loggedIn}>
                            Logged In as
                            <Text weight="700">{user.username}</Text>
                        </Text>
                    )}
                </View>
            </ScrollView>
        </GraidentBackground>
    );
}
