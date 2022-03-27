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
    private _listLength: number = 30;

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
        this.displayedStories = this.filterStories(value);
    }

    get listLength(): number {
        return this._listLength;
    }

    set listLength(value: number) {
        this._listLength = value;
        this.changeListLength(value);
    }


    storiesLoading: boolean = true;
    pageIndex: number = 0;
    pages!: Array<number>;
    stories: any;
    storyType: string = '';
    displayedStories!: Array<IStory>;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) {}

    filterStories(value: string): Array<IStory> {
        return this.stories[this.storyType].filter((s: IStory) => s.title.toLowerCase().includes(value.toLowerCase()))
    }

    changeListLength(value: number): void {
        this.pages = new Array(Math.round(this.stories[this.storyType].length / this.listLength));
        this.displayedStories = this.stories[this.storyType].slice((this.pageIndex - 1) *  this.listLength, ((this.pageIndex - 1) * this.listLength) + this.listLength) ?? Array<IStory>();
        this.router.navigateByUrl(`stories/${this.storyType}/1`);
    }

    retrieveStories(): void {
        this.store.pipe(select(storiesSelector)).subscribe({
            next: stories => {
                this.stories = stories.stories;
                this.displayedStories = this.stories[this.storyType].slice((this.pageIndex - 1) *  this.listLength, ((this.pageIndex - 1) * this.listLength) + this.listLength) ?? Array<IStory>();
                this.pages = new Array(Math.round(this.stories[this.storyType].length / this.listLength));
                if(this.displayedStories.length >= this.listLength) {
                    this.storiesLoading = false;
                }
            }
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.storyType = String(this.route.snapshot.paramMap.get('type'));
            this.pageIndex = Number(this.route.snapshot.paramMap.get('index'))
            this.retrieveStories();
        })
    }

}
