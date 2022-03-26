import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IStory } from './story';
import { storiesSelector } from '../store/stories.selector';
import { AppState } from '../store/app.state';
import { ActivatedRoute, Router } from '@angular/router';

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
    storiesLoading: boolean = true;
    startIndex: number = 0;
    stories: any;
    storyType: string = '';
    displayedStories!: Array<IStory>;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) {}

    filterStories(value: string): Array<IStory> {
        let currentStories = this.stories;
        return currentStories[this.storyType].filter((s: IStory) => s.title.toLowerCase().includes(value.toLowerCase()))
    }

    retrieveStories(): void {
        this.store.pipe(select(storiesSelector)).subscribe({
            next: stories => {
                this.stories = stories.stories;
                this.displayedStories = this.stories[this.storyType].slice(this.startIndex - 1, this.startIndex + 30) ?? Array<IStory>();
                if(this.displayedStories.length >= 29) {
                    this.storiesLoading = false;
                }
            }
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.storyType = String(this.route.snapshot.paramMap.get('type'));
            this.startIndex = Number(this.route.snapshot.paramMap.get('index'))
            this.retrieveStories();
        })
        
    }

}
