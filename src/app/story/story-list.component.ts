import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StoryService } from './story.service';
import { IStory } from './story';
import { storiesSelector } from '../store/stories.selector';
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
        this.displayedStories = this.filterStories(value);
    }

    listLength: number = 30;
    sub!: Subscription;
    storyNumbers: Array<number> = [];
    stories: Array<IStory> = [];
    displayedStories: Array<IStory> = [];
    constructor(private store: Store<AppState>) {}

    filterStories(value: string): Array<IStory> {
        return this.stories.filter((s: IStory) => s.title.toLowerCase().includes(value.toLowerCase()))
    }

    retrieveStateStories(): void {
        this.store.pipe(select(storiesSelector)).subscribe({
            next: stories => {
                this.stories = stories;
                this.displayedStories = this.stories;
            }
        });
    }
    
    ngOnInit(): void {
        this.retrieveStateStories();
    }

}
