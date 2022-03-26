import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoryService } from './story/story.service';
import { IStory } from './story/story';
import { Subscription } from 'rxjs';
import { AppState } from './store/app.state';
import { addNewStory, addTopStory } from './store/store.action';

@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'hacker-news';
    private _searchString: string = '';
    sub!: Subscription;

    constructor(private storyService: StoryService, private store: Store<AppState>) {}

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
    }

    fetchStories = (type: string) => {
        this.storyService.getStoryIds(`${type}stories`).subscribe({
            next: stories => {
                this.storyService.getStories(stories).slice(0, 30).forEach(story => {
                    story.subscribe({
                        next: story => {
                            if(type === 'new') {
                                this.store.dispatch(
                                    addNewStory({story: story as IStory})
                                )
                            }
                            if(type === 'top') {
                                this.store.dispatch(
                                    addTopStory({story: story as IStory})
                                )
                            }
                        }
                    })
                })
            }
        });
    }

    fetchAllStories(): void {
        this.fetchStories('top');
        this.fetchStories('new');
    }

    ngOnInit(): void {
        this.fetchAllStories();
    }
    

}
