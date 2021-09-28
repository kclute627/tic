import React from "react";
import { View} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar"

export default function GredBackground() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <LinearGradient
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
                colors={["#0f78af", "#154c79"]}
            />
        </View>
    );
}
