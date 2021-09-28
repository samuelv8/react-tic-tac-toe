import { createStore } from "redux";
import { gameReducer } from "./reducers/gameReducer";

export default createStore(gameReducer);

// TODO: connect component with store