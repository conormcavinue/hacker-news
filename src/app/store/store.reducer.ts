import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { AppState } from "./app.state";
import { addNewStory, addTopStory, clearStories, setStoryCount } from "./store.action";

const initialState: AppState =  { 
    top: [],
    new: [],
    storyCount: 0
};

const _storiesReducer = createReducer(
    initialState,
    on(addNewStory, (state, action) => (
        {
            ...state, 
            new: state.new.concat(action.story)
        }
        )
    ),
    on(addTopStory, (state, action) => (
        {
            ...state, 
            top: state.top.concat(action.story)
        }
        )
    ),
    on(clearStories, (state) => (
        {
            ...state,
            new: [],
            top: []
        }
        )
    ),
    on(setStoryCount, (state, action) => (
        {
            ...state,
            storyCount: action.storyCount
        }
        )
    )
)

export function storiesReducer(state: any, action: any) {
    return _storiesReducer(state, action)
}