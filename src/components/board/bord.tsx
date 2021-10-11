import React from "react";
import { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import { BoardState, BoardResult } from "@utils";
import { styles } from "./board-styles";
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
        <View style={[styles.container, { width: size, height: size }]}>
            {state.map((cell, i) => (
                <TouchableOpacity
                    disabled={cell !== null || disabled}
                    onPress={() => onCellPressed && onCellPressed(i)}
                    style={[styles.cell, styles[`cell${i}`as 'cell']]}
                    key={i}
                >
                    <Text style={[styles.text, {fontSize: size / 8} ]}>{cell}</Text>
                </TouchableOpacity>
            ))}
            {gameResult && <BoardLine size={size} gameResult={gameResult} />}
        </View>
    );
}
