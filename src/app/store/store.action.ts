import { createAction, props } from "@ngrx/store";
import { IStory } from "../story/story";

export const retrievedStories = createAction(
    "[Hackernews API] Stories Retrieved",
    props<{allStories:IStory[]}>()
);