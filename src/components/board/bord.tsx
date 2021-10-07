import React from "react";
import { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import { BoardState, BoardResult } from "@utils";
import BoardLine from "./board_line";
import Text from "../text/newtext";

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    onCellPressed?: (i: number) => void;
    gameResult?: BoardResult | false;
};

export default function Board({
    state,
    size,
    disabled,
    gameResult,
    onCellPressed,
}: BoardProps): ReactElement {
    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: "green",
                flexDirection: "row",
                flexWrap: "wrap",
            }}
        >
            {state.map((cell, i) => (
                <TouchableOpacity
                    disabled={cell !== null || disabled}
                    onPress={() => onCellPressed && onCellPressed(i)}
                    style={{
                        width: "33.33%",
                        height: "33.33%",
                        backgroundColor: "#fff",
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    key={i}
                >
                    <Text style={{ fontSize: size / 8 }}>{cell}</Text>
                </TouchableOpacity>
            ))}
           {gameResult && <BoardLine size={size} gameResult={gameResult} />}
           
        </View>
    );
}
