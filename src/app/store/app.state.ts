import { IStory } from "../story/story";

export interface AppState {
    topStories: Array<IStory>;
    newStories: Array<IStory>;
}