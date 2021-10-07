import { BoardState, moves, BoardResult } from "@utils";

export const printFormatedBoard = (state: BoardState): void => {
    let formattedString = "";
    state.forEach((cell, i) => {
        formattedString += cell ? ` ${cell} |` : "   |";
        if ((i + 1) % 3 == 0) {
            formattedString = formattedString.slice(0, -1);

            if (i < 8) {
                formattedString +=
                    "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
            }
        }
    });
    console.log(formattedString);
};

export const isEmpty = (state: BoardState): boolean => {
    return state.every(cell => cell === null);
};
export const isFull = (state: BoardState): boolean => {
    return state.every(cell => cell);
};

export const getAvailabeMoves = (state: BoardState): moves[] => {
    const moves: moves[] = [];

    state.forEach((cur, i) => cur === null && moves.push(i as moves));

    return moves;
};

export const isTerminal = (state: BoardState): BoardResult | false => {
    if (isEmpty(state)) return false;

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
        const line = winningLines[i];

        const [cell1, cell2, cell3] = line;

        if (
            state[cell1] &&
            state[cell1] === state[cell2] &&
            state[cell1] === state[cell3]
        ) {
            const results: BoardResult = {
                winner: state[cell1],
            };
            if (i < 3) {
                (results.direction = "H"),
                    (results.row = i === 0 ? 1 : i === 1 ? 2 : 3);
            }
            if (i >= 3 && i <= 5) {
                results.direction = "V";
                results.column = i === 3 ? 1 : i === 4 ? 2 : 3;
            }
            if (i > 5) {
                results.direction = "D";
                results.diagonal = i === 6 ? "MAIN" : "COUNTER";
            }
            return results;
        }
    }
    if (isFull(state)) {
        return {
            winner: null,
        };
    }
    return false;
};
