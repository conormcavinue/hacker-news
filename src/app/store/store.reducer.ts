import { createReducer, on } from "@ngrx/store";
import { IStory } from "../story/story";
import { retrievedStories } from "./store.action";

export const initialState: Array<IStory> = [];

const _storiesReducer = createReducer(
    initialState,
    on(retrievedStories, (state, {allStories}) => {
        return [...allStories];
    })
)

export function storiesReducer(state: any, action: any) {
    return _storiesReducer(state, action)
}