import { BoardResult, colors } from "@utils";
import React, {useRef, useEffect} from "react";
import { ReactElement } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

type BoardLineProps = {
    size: number;
    gameResult?: BoardResult | false;
};

export default function BoardLine({
    size,
    gameResult,
}: BoardLineProps): ReactElement {

    const dLineHeight = Math.sqrt(Math.pow(size,2) + Math.pow(size,2))

  

    const animationRef = useRef<Animated.Value>(new Animated.Value(0))

    useEffect(() => {
       Animated.timing(animationRef.current, {
           toValue: 1,
           duration: 700,
           useNativeDriver: false
       }).start()
    }, [])

    return (
        <>
            {gameResult && gameResult.column && gameResult.direction == "V" && (
                <Animated.View
                    style={[
                        styles.line,
                        styles.vLine,
                        {
                            left: `${33.3333 * gameResult.column - 16.6666}%`,
                            height: animationRef.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0%", "100%"],
                            }),
                        },
                    ]}
                ></Animated.View>
            )}
            {gameResult && gameResult.row && gameResult.direction == "H" && (
                <Animated.View
                    style={[
                        styles.line,
                        styles.hLine,
                        {
                            top: `${33.3333 * gameResult.row - 16.6666}%`,
                            width: animationRef.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0%", "100%"],
                            }),
                        },
                    ]}
                ></Animated.View>
            )}
            {gameResult && gameResult.diagonal && gameResult.direction == "D" && (
                <Animated.View
                    style={[
                        styles.line,
                        styles.dLine,
                        {
                            height: animationRef.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, dLineHeight],
                            }),
                            transform: [
                                {
                                    translateY:
                                        animationRef.current.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [size/2,  -(dLineHeight - size) / 2],
                                        }),
                                },
                                {
                                    rotateZ:
                                        gameResult.diagonal == "MAIN"
                                            ? "-45deg"
                                            : "45deg",
                                },
                            ],
                        },
                    ]}
                ></Animated.View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    line: {
        position: "absolute",
        backgroundColor: colors.lightPurple,
    },
    vLine: {
        width: 4,
        // height: "100%",
    },
    hLine: {
        height: 4,
        // width: "100%",
    },
    dLine:{
        width: 4,
        // height: "100%",
        top: 0,
        left: '50%'

    }
});
