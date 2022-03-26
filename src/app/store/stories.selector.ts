import { AppState } from "./app.state";

export const newStoriesSelector = (state: AppState) => state.newStories;
export const topStoriesSelector = (state: AppState) => state.topStories;

