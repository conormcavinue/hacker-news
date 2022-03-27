import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { IStory } from './story';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
    private baseUrl = 'https://hacker-news.firebaseio.com/v0/';
    storyNumbers!: Array<number>;
    stories!: Promise<IStory>;
    constructor(private http: HttpClient) { }

    getStories(storyIds: Array<number>): Observable<IStory>[] {
        var stories: Observable<IStory>[] = [];
        storyIds.forEach(storyId => {
            stories.push(this.http.get<IStory>(`${this.baseUrl}item/${storyId}.json?print=pretty`))
        })
        return stories;
    };

    getStoryIds(type: string): Observable<number[]> {
        return this.http.get<number[]>(`${this.baseUrl}${type}.json?print=pretty`)
    }
}
