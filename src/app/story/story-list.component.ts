import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StoryService } from './story.service';
import { IStory } from './story';
import { newStoriesSelector, topStoriesSelector } from '../store/stories.selector';
import { AppState } from '../store/app.state';

@Component({
  selector: 'hn-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

    private _searchString: string = '';
    
    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
        // this.displayedStories = this.filterStories(value);
    }

    listLength: number = 30;
    sub!: Subscription;
    storyNumbers: Array<number> = [];
    stories: Map<string, Array<IStory>> = new Map();
    displayedStories!: Array<IStory>;
    constructor(private store: Store<AppState>) {}

    // filterStories(value: string): Array<IStory> {
    //     // return this.stories.filter((s: IStory) => s.title.toLowerCase().includes(value.toLowerCase()))
    // }

    retrieveStories(type: string): void {
        this.store.pipe(select(newStoriesSelector)).subscribe({
            next: stories => {
                this.stories.set(type, stories);
                this.displayedStories = this.stories.get(type) ?? Array<IStory>();
                console.log(this.stories);
            }
        });
    }

    retrieveAllStories(): void {
        this.retrieveStories('top');
        this.retrieveStories('new');
    }
    
    ngOnInit(): void {
        this.retrieveAllStories();
    }

}
