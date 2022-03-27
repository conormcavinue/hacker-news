import { AppState } from "./app.state";

export const storiesSelector = (state: AppState) => state;

export const storiesFound = (state: AppState) => {
    if(state.stories && state.stories.storyCount !== 0) {
        return (state.stories.top.length === state.stories.new.length) && (state.stories.top.length === state.stories.storyCount);
    } else {
        return false;
    }
}