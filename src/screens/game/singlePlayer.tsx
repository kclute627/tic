import React, { ReactElement, useState, useEffect } from "react";
import styles from "./singlePlayer_styles";
import { GraidentBackground } from "@components";
import { SafeAreaView } from "react-native";
import { Board } from "@components";
import {
    BoardState,
    isEmpty,
    isTerminal,
    bestMove,
    Cell,
    useSounds,
} from "@utils";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

export default function SinglePlayer(): ReactElement {
    //prettier-ignore
    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,  
        null, null, null 
    ])

    const [turn, setTurn] = useState<"HUMAN" | "BOT">(
        Math.random() < 0.05 ? "HUMAN" : "BOT"
    );
    const [isHumanMax, setIsHumanMax] = useState<boolean>(true);
    const gameResult = isTerminal(state);

    const insertCell = (cell: number, symb: "x" | "o"): void => {
        const stateCopy: BoardState = [...state];

        if (stateCopy[cell] || isTerminal(stateCopy)) return;

        stateCopy[cell] = symb;

        setState(stateCopy);
        try {
            if (symb === "x") {
                playSound("pop1");
            } else {
                playSound("pop2");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const playSound = useSounds();

    const handleOnCellPressed = (cell: number): void => {
        if (turn !== "HUMAN") return;

        insertCell(cell, isHumanMax ? "x" : "o");
        setTurn("BOT");
    };

    const getWinner = (winnerSymb: Cell): "HUMAN" | "BOT" | "DRAW" => {
        if (winnerSymb === "x") {
            return isHumanMax ? "HUMAN" : "BOT";
        }
        if (winnerSymb === "o") {
            return !isHumanMax ? "HUMAN" : "BOT";
        }
        return "DRAW";
    };

    useEffect(() => {
        if (gameResult) {
            //handle game finished

            const winner = getWinner(gameResult.winner);
            if (winner == "HUMAN") {
                playSound('win')
            }
            if (winner == "BOT") {
                playSound('loss')
            }
            if (winner == "DRAW") {
              playSound('draw')
            }

            alert("Game is Done");
        } else {
            if (turn === "BOT") {
                if (isEmpty(state)) {
                    const centerAndCorners = [0, 2, 6, 8, 4];
                    const firstMove =
                        centerAndCorners[
                            Math.floor(Math.random() * centerAndCorners.length)
                        ];
                    insertCell(firstMove, "x");
                    setIsHumanMax(false);
                    setTurn("HUMAN");
                } else {
                    const best = bestMove(state, !isHumanMax, 0, 1);
                    insertCell(best, isHumanMax ? "o" : "x");
                    setTurn("HUMAN");
                }
            }
        }
    }, [state, turn]);

    // printFormatedBoard(b);
    // console.log(isTerminal(b));
    // console.log(isEmpty(b));
    // console.log(isFull(b));
    // console.log(getAvailabeMoves(b));
    return (
        <GraidentBackground>
            <SafeAreaView style={styles.container}>
                <Board
                    disabled={Boolean(isTerminal(state) || turn !== "HUMAN")}
                    state={state}
                    size={300}
                    onCellPressed={(cell: number) => {
                        handleOnCellPressed(cell);
                    }}
                    gameResult={gameResult}
                />
            </SafeAreaView>
        </GraidentBackground>
    );
}
