import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

export default function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <p> Loading.. </p>
    );
}