import React, { ReactElement, useState } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import styles from "./Serrings-styles";

import { colors } from "@utils";
import { GraidentBackground, Text } from "@components";

export default function Settings(): ReactElement {
    const difficulty = {
        "1": "Beginner",
        "3": "Intermediate",
        "4": "Hard",
        "-1": "Impossible",
    };
    const [sound, setSound] = useState(false);
    const [vibrations, setVibrations] = useState(false)
    return (
        <GraidentBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Bot Difficulty</Text>
                    <View style={styles.choices}>
                        {Object.keys(difficulty).map(level => {
                            return (
                                <TouchableOpacity
                                    style={styles.choice}
                                    key={level}
                                >
                                    <Text style={styles.choiceText}>
                                        {
                                            difficulty[
                                                level as "1" | "3" | "4" | "-1"
                                            ]
                                        }
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <View style={[styles.field, styles.switchField]}>
                    <Text style={styles.label}>Sounds</Text>
                    <Switch
                        trackColor={{
                            false: colors.purple,
                            true: colors.lightPurple,
                        }}
                        thumbColor={colors.lightGreen}
                        ios_backgroundColor={colors.purple}
                        value={sound}
                        onValueChange={() => {
                            setSound(!sound);
                        }}
                    />
                </View>
                <View style={[styles.field, styles.switchField]}>
                    <Text style={styles.label}>Haptics / Vibrations</Text>
                    <Switch
                        trackColor={{
                            false: colors.purple,
                            true: colors.lightPurple,
                        }}
                        thumbColor={colors.lightGreen}
                        ios_backgroundColor={colors.purple}
                        value={vibrations}
                        onValueChange={() => {
                            setVibrations(!vibrations);
                        }}
                    />
                </View>
            </ScrollView>
        </GraidentBackground>
    );
}
