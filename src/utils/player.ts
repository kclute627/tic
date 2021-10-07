import { BoardState } from "./types";
import { isTerminal, getAvailabeMoves } from "./boaed";

export const bestMove = (
    state: BoardState,
    maximizing: boolean,
    depth = 0,
    maxDepth = -1
): number => {
    const childValues: { [key: string]: string } = {};

    const bestMoveResursive = (
        state: BoardState,
        maximizing: boolean,
        depth = 0,
        maxDepth = -1
    ): number => {
        const terminalObj = isTerminal(state);

        if (terminalObj || depth === maxDepth) {
            if (terminalObj && terminalObj.winner === "x") {
                return 100 - depth;
            } else if (terminalObj && terminalObj.winner == "o") {
                return -100 + depth;
            }
            return 0;
        }

        if (maximizing) {
            let best = -100;
            getAvailabeMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = "x";

                const childValue = bestMoveResursive(
                    child,
                    false,
                    depth + 1,
                    maxDepth
                );
                best = Math.max(best, childValue);
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue]
                        ? `${childValues[childValue]}, ${index}`
                        : `${index}`;
                }
            });
            if (depth == 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random()) * arr.length;

                return parseInt(arr[rand]);
            }

            return best;
        } else {
            let best = 100;
            getAvailabeMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = "o";

                const childValue = bestMoveResursive(
                    child,
                    true,
                    depth + 1,
                    maxDepth
                );
                best = Math.min(best, childValue);
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue]
                        ? `${childValues[childValue]}, ${index}`
                        : `${index}`;
                }
            });
            if (depth == 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random()) * arr.length;

                return parseInt(arr[rand]);
            }
            return best;
        }
    };
    return bestMoveResursive(state, maximizing, depth, maxDepth);
};
