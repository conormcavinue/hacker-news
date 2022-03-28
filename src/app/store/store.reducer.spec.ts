import { IStory } from "../story/story";
import { AppState } from "./app.state";
import {
  addNewStory,
  clearStories,
  setStoryCount
} from './store.action';
import { initialState, storiesReducer } from './store.reducer';

describe('Story Reducer', () => {
    let story: IStory = {
        "by" : "dhouston",
        "descendants" : 71,
        "id" : 8863,
        "kids" : [ 9224, 8917, 8952, 8958, 8884, 8887, 8869, 8873, 8940, 8908, 9005, 9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876 ],
        "score" : 104,
        "time" : 1175714200,
        "title" : "My YC app: Dropbox - Throw away your USB drive",
        "type" : "story",
        "url" : "http://www.getdropbox.com/u/2/screencast.html"
    };

    it('Add New Story', () => {
        let action = { type: "Add New Story", story: story };
        const result = storiesReducer(initialState, action);
        expect(result.new.length).toBe(1);
    });

    it('Add Top Story', () => {
        let action = { type: "Add Top Story", story: story };
        const result = storiesReducer(initialState, action);
        expect(result.top.length).toBe(1);
    });

    it('Clear Stories', () => {
        let createAction = { type: "Add Top Story", story: story };
        let clearAction = { type: "Clear Stories"};
        let result = storiesReducer(initialState, createAction);
        expect(result.top.length).toBe(1);
        result = storiesReducer(initialState, clearAction);
        expect(result.top.length).toBe(0);
    });

    it('Set Story Count', () => {
        let action = { type: "Set Story Count", storyCount: 50 };
        let result = storiesReducer(initialState, action);
        expect(result.storyCount).toBe(50);
    });
});