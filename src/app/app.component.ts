import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoryService } from './story/story.service';
import { IStory } from './story/story';
import { AppState } from './store/app.state';
import { addNewStory, addTopStory, clearStories, setStoryCount } from './store/store.action';
import { ActivatedRoute } from '@angular/router';
import { StoryListComponent } from './story/story-list.component';
import { storiesFound } from './store/stories.selector';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('animation', [
        transition(":enter", [
            style({ opacity: 0 }),
            animate('200ms', style({ opacity: 1 }))
        ]),
        transition(":leave", [
            style({ opacity: 1 }),
            animate('200ms', style({ opacity: 0 }))
        ]),
    ])
  ]
})
export class AppComponent implements OnInit {
    title = 'hacker-news';
    storyType: string = '';
    stateLoading: boolean = true;

    constructor(private route: ActivatedRoute, private storyService: StoryService, private store: Store<AppState>) {}


    initialFetchStories = (type: string) => {
        this.storyService.getStoryIds(`${type}stories`).subscribe({
            next: stories => {
                this.store.dispatch(
                    setStoryCount({storyCount: stories.length})
                );
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

    subscribeToEmitter(componentRef: StoryListComponent) {
        if(!(componentRef instanceof StoryListComponent)) {
            return;
        }
        const child: StoryListComponent = componentRef;
        child.typeChanged.subscribe( (type) => {
            this.storyType = type;
        });
    }

    refreshStories(): void {
        this.store.dispatch(
            clearStories()
        );
        this.fetchAllStories();
    }

    fetchAllStories(): void {
        this.initialFetchStories('top');
        this.initialFetchStories('new');
        this.subsequentFetchStories('top');
        this.subsequentFetchStories('new');
        
    }

    ngOnInit(): void {
        this.fetchAllStories();
        this.store.pipe(select(storiesFound)).subscribe({
            next: state => {
                if( state ) {
                    this.stateLoading = false;
                } else {
                    this.stateLoading = true;
                }
            }
        })
    }
    

}
