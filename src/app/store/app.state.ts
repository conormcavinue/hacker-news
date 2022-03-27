import { IStory } from "../story/story";

export interface AppState {
    top: Array<IStory>;
    new: Array<IStory>;
    storyCount: number;
    stories?: AppState;
}