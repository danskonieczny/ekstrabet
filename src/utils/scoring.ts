export interface ScoreResult {
    winnerPoints: number;
    accuracyPoints: number;
    total: number;
    isNitro: boolean;
}

export function calculatePoints(
    predictedHome: number,
    predictedAway: number,
    actualHome: number,
    actualAway: number,
    isNitro = false,
): ScoreResult {
    const predictedWinner = Math.sign(predictedHome - predictedAway);
    const actualWinner = Math.sign(actualHome - actualAway);

    let winnerPoints = 0;
    if (predictedWinner === actualWinner) {
        winnerPoints = actualWinner === 0 ? 4 : 2;
    }

    const totalDiff = Math.abs(predictedHome - actualHome) + Math.abs(predictedAway - actualAway);

    let accuracyPoints = 0;
    if (totalDiff === 0) accuracyPoints = 10;
    else if (totalDiff <= 2) accuracyPoints = 6;
    else if (totalDiff <= 4) accuracyPoints = 4;
    else if (totalDiff <= 6) accuracyPoints = 2;

    const base = winnerPoints + accuracyPoints;

    return {
        winnerPoints,
        accuracyPoints,
        total: isNitro ? base * 2 : base,
        isNitro,
    };
}
