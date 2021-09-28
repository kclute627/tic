import React, { ReactElement } from "react";
import styles from "./home.styles";
import { Text, Button, ScrollView} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParams } from "@config/nav";
i
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        

            <ScrollView contentContainerStyle={styles.container}>
                <Text>Home Page</Text>
                <Button
                    title="Game"
                    onPress={() => {
                        navigation.navigate("Game", { gameId: "435" });
                    }}
                />
            </ScrollView>
       
    );
}
