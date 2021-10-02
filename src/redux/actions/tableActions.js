export const LOAD_HIGH_SCORES = 'LOAD_HIGH_SCORES';

export const loadHighScores = (loadedHighScoresData) => ({
    type: LOAD_HIGH_SCORES,
    payload: { loadedHighScoresData }
});