import { createSelector } from "@ngrx/store";
import { IStory } from "../story/story";

import { AppState } from "./app.state";

export const storiesSelector = (state: AppState) => state.stories;

