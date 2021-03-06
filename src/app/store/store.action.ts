import { createAction, props } from "@ngrx/store";
import { IStory } from "../story/story";

export const addNewStory = createAction(
    "Add New Story",
    props<{story:IStory}>()
);

export const addTopStory = createAction(
    "Add Top Story",
    props<{story:IStory}>()
);

export const clearStories = createAction(
    "Clear Stories"
);

export const setStoryCount = createAction(
    "Set Story Count",
    props<{storyCount:number}>()
);