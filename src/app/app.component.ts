import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoryService } from './story/story.service';
import { IStory } from './story/story';
import { Subscription } from 'rxjs';
import { AppState } from './store/app.state';
import { addNewStory, addTopStory } from './store/store.action';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'hacker-news';
    private _searchString: string = '';

    constructor(private route: ActivatedRoute, private storyService: StoryService, private store: Store<AppState>) {}

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
    }

    initialFetchStories = (type: string) => {
        this.storyService.getStoryIds(`${type}stories`).subscribe({
            next: stories => {
                this.storyService.getStories(stories).slice(0,30).forEach(story => {
                    story.subscribe({
                        next: story => {
                            switch (type) {
                                case 'new':
                                    this.store.dispatch(
                                        addNewStory({story: story as IStory})
                                    );
                                    break;
                                case 'top':
                                    this.store.dispatch(
                                        addTopStory({story: story as IStory})
                                    );
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                })
            }
        });
    }

    subsequentFetchStories = (type: string) => {
        this.storyService.getStoryIds(`${type}stories`).subscribe({
            next: stories => {
                this.storyService.getStories(stories).slice(30).forEach(story => {
                    story.subscribe({
                        next: story => {
                            switch (type) {
                                case 'new':
                                    this.store.dispatch(
                                        addNewStory({story: story as IStory})
                                    );
                                    break;
                                case 'top':
                                    this.store.dispatch(
                                        addTopStory({story: story as IStory})
                                    );
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                })
            }
        });
    }
    
    

    fetchAllStories(): void {
        this.initialFetchStories('top');
        this.initialFetchStories('new');
        this.subsequentFetchStories('top');
        this.subsequentFetchStories('new');
        
    }

    ngOnInit(): void {
        this.fetchAllStories();
    }
    

}
