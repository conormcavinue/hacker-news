import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoryService } from './story/story.service';
import { IStory } from './story/story';
import { Subscription } from 'rxjs';
import { AppState } from './store/app.state';
import { retrievedStories } from './store/store.action';
import { storiesSelector } from './store/stories.selector';

@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'hacker-news';
    private _searchString: string = '';
    sub!: Subscription;
    storyNumbers: Array<number> = [];
    stories: Array<IStory> = [];
    stories$ = this.store.pipe(select(storiesSelector));


    constructor(private storyService: StoryService, private store: Store<AppState>) {}

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
    }

    retrieveStories = () => {
        this.storyService.getStoryIds('topstories').subscribe({
            next: stories => {
                this.storyNumbers = stories;
                this.storyService.getStories(stories).forEach(story => {
                    story.subscribe({
                        next: story => {
                            this.stories = Object.assign([], this.stories);
                            this.stories.push(story)
                        },
                        complete: () => {
                            this.store.dispatch(
                                retrievedStories({ allStories: this.stories as IStory[] })
                            )
                        }
                    })
                })
            }
        });
    }

    ngOnInit(): void {
        this.retrieveStories();
    }
    

}
