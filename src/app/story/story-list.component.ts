import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IStory } from './story';
import { storiesFound, storiesSelector } from '../store/stories.selector';
import { AppState } from '../store/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'hn-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
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
export class StoryListComponent implements OnInit, OnDestroy {

    private _searchString: string = '';
    private _listLength: number = 30;
    private _displayedStories!: Array<IStory>;
    private _stories: any;
    private _pages: Array<number> = [];

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
        this.displayedStories = this.filterStories(value);
        this.pages = this.filterStories(value);
    }

    get listLength(): number {
        return this._listLength;
    }

    set listLength(value: number) {
        this._listLength = value;
        this.changeListLength(value);
    }

    get displayedStories(): Array<IStory> {
        return this._displayedStories;
    }

    set displayedStories(stories: any) {
        if (this.searchString !== '') {
            this._displayedStories = stories.slice((this.pageIndex - 1) *  this.listLength, ((this.pageIndex - 1) * this.listLength) + this.listLength) ?? Array<IStory>();
        } else {
            this._displayedStories = stories[this.storyType].slice((this.pageIndex - 1) *  this.listLength, ((this.pageIndex - 1) * this.listLength) + this.listLength) ?? Array<IStory>();
        }
        if(this.displayedStories.length >= this.listLength) {
            this.storiesLoading = false;
        } else {
            this.storiesLoading = true;
        }
    }

    get stories(): any {
        return this._stories
    }

    set stories(value: any) {
        this._stories = value;
        this.displayedStories = value;
    }

    get pages(): Array<number> {
        return this._pages
    }

    set pages(stories: any) {
        if (this.searchString !== '') {
            this._pages = new Array(Math.round(stories.length / this.listLength));
        } else {
            this._pages = new Array(Math.round(this.stories[this.storyType].length / this.listLength));
        }
    }


    storiesLoading: boolean = true;
    filtered: boolean = false;
    pageIndex: number = 0;
    storyType: string = '';
    sub!: Subscription;
    stateLoading: boolean = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) {}

    filterStories(value: string): Array<IStory> {
        if (value === '') {
            return this.stories[this.storyType]
        } else {
            return this.stories[this.storyType].filter((s: IStory) => s.title.toLowerCase().includes(value.toLowerCase()))
        }
    }

    changeListLength(value: number): void {
        this.pages = this.stories;
        this.router.navigateByUrl(`stories/${this.storyType}/1`);
    }

    retrieveStories(): void {
        this.sub = this.store.pipe(select(storiesSelector)).subscribe({
            next: stories => {
                this.stories = stories.stories;
                this.pages = stories.stories;
            }
        });
    }

    @Output()
    typeChanged: EventEmitter<string> = new EventEmitter();

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.storyType = String(this.route.snapshot.paramMap.get('type'));
            this.typeChanged.emit(this.storyType);
            this.pageIndex = Number(this.route.snapshot.paramMap.get('index'))
            this.retrieveStories();
            this.store.pipe(select(storiesFound)).subscribe({
                next: state => {
                    if( state ) {
                        this.stateLoading = false;
                    } else {
                        this.stateLoading = true;
                    }
                }
            })
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
