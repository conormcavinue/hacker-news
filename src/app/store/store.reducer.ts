import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { addNewStory, addTopStory } from "./store.action";

const initialState: AppState =  { 
    topStories: [],
    newStories: []
};

const _storiesReducer = createReducer(
    initialState,
    on(addNewStory, (state, action) => (
        {
            ...state, 
            newStories: state.newStories.concat(action.story)
        }
        )
    ),
    on(addTopStory, (state, action) => (
        {
            ...state, 
            topStories: state.topStories.concat(action.story)
        }
        )
    )
)

export function storiesReducer(state: any, action: any) {
    return _storiesReducer(state, action)
}