import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import { Text, AppBootstrap } from "@components";

export default function App():ReactElement {
   
    return (
        <AppBootstrap>
            <View style={styles.container}>
                <Text weight="400" style={{ fontSize: 55 }}>
                    New Statment <Text weight="700"> Manning </Text>
                </Text>
            </View>
        </AppBootstrap>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});
