import { Component, OnInit } from '@angular/core';
import { StoryService } from './story/story.service';
import { IStory } from './story/story';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'hacker-news';
    private _searchString: string = '';
    sub!: Subscription;
    storyNumbers: Array<number> = [];
    stories: Array<IStory> = [];

    constructor(private storyService: StoryService) {}

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
    }

}
