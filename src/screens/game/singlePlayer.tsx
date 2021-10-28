import React, { ReactElement, useState, useEffect } from "react";
import styles from "./singlePlayer_styles";
import { GraidentBackground, Text, Button } from "@components";
import { SafeAreaView, Dimensions, View } from "react-native";
import {useSettings, difficulty} from '@context/Settings-context'
import { Board } from "@components";
import {
    BoardState,
    isEmpty,
    isTerminal,
    bestMove,
    Cell,
    useSounds,
} from "@utils";


const { height, width } = Dimensions.get("screen");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

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
    const [gamesCount, setGamesCount] = useState({
        wins: 0,
        losses: 0,
        draw: 0,
    });

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

    const {settings} = useSettings()

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
                playSound("win");
                setGamesCount({...gamesCount, wins: gamesCount.wins+ 1})
            }
            if (winner == "BOT") {
                playSound("loss");
                  setGamesCount({ ...gamesCount, losses: gamesCount.losses+ 1 });
            }
            if (winner == "DRAW") {
                playSound("draw");
                  setGamesCount({ ...gamesCount, draw: gamesCount.draw+ 1 });
            }
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
                    const best = bestMove(state, !isHumanMax, 0, parseInt( settings ? settings.difficulty : '-1'));
                    insertCell(best, isHumanMax ? "o" : "x");
                    setTurn("HUMAN");
                }
            }
        }
    }, [state, turn]);

    function newGame() {
        setState([null, null, null, null, null, null, null, null, null]);
        setTurn(Math.random() < 0.05 ? "HUMAN" : "BOT");
    }

    return (
        <GraidentBackground>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.difficulty}>Difficulty: {settings ? difficulty[settings?.difficulty] : 'Hard'}</Text>
                    <View style={styles.results}>
                        <View style={styles.resultsBox}>
                            <Text style={styles.resultsTitle}>Wins</Text>
                            <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
                        </View>
                        <View style={styles.resultsBox}>
                            <Text style={styles.resultsTitle}>Draws</Text>
                            <Text style={styles.resultsCount}>{gamesCount.draw}</Text>
                        </View>
                        <View style={styles.resultsBox}>
                            <Text style={styles.resultsTitle}>Losses</Text>
                            <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
                        </View>
                    </View>
                </View>
                <Board
                    disabled={Boolean(isTerminal(state) || turn !== "HUMAN")}
                    state={state}
                    size={SCREEN_WIDTH - 60}
                    onCellPressed={(cell: number) => {
                        handleOnCellPressed(cell);
                    }}
                    gameResult={gameResult}
                />
                {gameResult && (
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>
                            {getWinner(gameResult.winner) === "HUMAN" &&
                                "You Won"}
                            {getWinner(gameResult.winner) === "BOT" &&
                                "You Lost"}
                            {getWinner(gameResult.winner) === "DRAW" && "Draw"}
                        </Text>
                        <Button
                            btnText="Play Again"
                            onPress={() => newGame()}
                        />
                    </View>
                )}
            </SafeAreaView>
        </GraidentBackground>
    );
}
