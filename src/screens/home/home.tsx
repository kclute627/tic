import React, { ReactElement } from "react";
import styles from "./home.styles";

import {ScrollView, Image, View } from "react-native";
import { Button } from "@components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParams } from "@config/nav";
import { GraidentBackground } from "@components";
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
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
                        onPress={()=>navigation.navigate('SinglePlayer')}
                        style={styles.btns}
                    />
                    <Button
                        btnText="Multiplayer Player"
                      
                        style={styles.btns}
                    />
                    <Button
                        btnText="Login"
                      
                        style={styles.btns}
                    />
                    <Button
                        btnText="Settings"
                      
                        style={styles.btns}
                    />
                </View>
            </ScrollView>
        </GraidentBackground>
    );
}
