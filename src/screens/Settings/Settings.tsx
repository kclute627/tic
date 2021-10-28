import React, { ReactElement } from "react";
import { View, ScrollView, TouchableOpacity, Switch } from "react-native";
import styles from "./Serrings-styles";

import { colors } from "@utils";
import { GraidentBackground, Text } from "@components";
import { difficulty, useSettings} from "@context/Settings-context";



export default function Settings(): ReactElement | null {
    // const [sound, setSound] = useState(false);
    // const [vibrations, setVibrations] = useState(false)

  
    const {settings, saveSetting} = useSettings()
    

   

    if (!settings) return null;

    return (
        <GraidentBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Bot Difficulty</Text>
                    <View style={styles.choices}>
                        {Object.keys(difficulty).map(level => {
                            return (
                                <TouchableOpacity
                                onPress={()=>{
                                    saveSetting('difficulty', level as keyof typeof difficulty)
                                }}
                                    style={[
                                        styles.choice,
                                        {
                                            backgroundColor:
                                                settings.difficulty === level
                                                    ? colors.darkPurple
                                                    : colors.lightPurple,
                                        },
                                    ]}
                                    key={level}
                                >
                                    <Text
                                        style={[
                                            styles.choiceText,
                                            {
                                                color:
                                                    settings.difficulty ===
                                                    level
                                                        ? colors.lightPurple
                                                        : colors.lightGreen,
                                            },
                                        ]}
                                    >
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
                        value={settings.sounds}
                        onValueChange={() => {
                            saveSetting('sounds', !settings.sounds)
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
                        value={settings.haptics}
                        onValueChange={() => {
                            saveSetting('haptics', !settings.haptics)
                        }}
                    />
                </View>
            </ScrollView>
        </GraidentBackground>
    );
}
