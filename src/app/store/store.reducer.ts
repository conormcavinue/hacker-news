import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { addNewStory, addTopStory } from "./store.action";

const initialState: AppState =  { 
    top: [],
    new: []
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
    )
)

export function storiesReducer(state: any, action: any) {
    return _storiesReducer(state, action)
}