import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { storiesReducer } from '../store/store.reducer';

import { StoryListComponent } from './story-list.component';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ StoryListComponent ],
        imports: [ 
            RouterTestingModule,
            StoreModule.forRoot(
                storiesReducer
            ) 
        ],
        providers: [ 
            provideMockStore()
        ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.pageIndex = 1;
    component.storyType = 'new';
    component.stories = { 'new': [
        {
            "by" : "karaokeyoga",
            "descendants" : 88,
            "id" : 30831485,
            "kids" : [ 30831827, 30832044, 30832428, 30831956, 30832003, 30832317, 30831855, 30831860, 30832196, 30831820, 30831844 ],
            "score" : 212,
            "time" : 1648481065,
            "title" : "Majority in Japan backs nuclear power for first time since Fukushima",
            "type" : "story",
            "url" : "https://www.japantimes.co.jp/news/2022/03/28/national/nuke-power-poll/"
          },
          {
            "by" : "webmaven",
            "descendants" : 39,
            "id" : 30831688,
            "kids" : [ 30832104, 30832293, 30832173, 30832425, 30831927, 30832015, 30832050, 30831957, 30832225, 30831951, 30831917, 30832238, 30832226, 30832125, 30831888, 30832206, 30832322, 30832151, 30831902, 30832192, 30832101 ],
            "score" : 84,
            "time" : 1648482112,
            "title" : "I wasted $40k on a fantastic startup idea",
            "type" : "story",
            "url" : "https://blog.tjcx.me/p/40k-fantastic-startup-idea"
          },
          {
            "by" : "raybb",
            "descendants" : 30,
            "id" : 30831386,
            "kids" : [ 30832078, 30832277, 30831982, 30831834, 30832152, 30832384 ],
            "score" : 106,
            "time" : 1648480649,
            "title" : "‘This Game Is So Realistic It Feels Just Like Working Overtime’",
            "type" : "story",
            "url" : "https://www.sixthtone.com/news/1009982/this-game-is-so-realistic%21-it-feels-just-like-working-overtime"
          },
          {
            "by" : "m_sahaf",
            "descendants" : 34,
            "id" : 30830749,
            "kids" : [ 30831856, 30830982, 30830821, 30831298, 30831141, 30831955, 30832145, 30832049 ],
            "score" : 108,
            "time" : 1648477190,
            "title" : "Show HN: Introducing Caddy-SSH",
            "type" : "story",
            "url" : "https://www.caffeinatedwonders.com/2022/03/28/new-ssh-server/"
          },
          {
            "by" : "yarapavan",
            "descendants" : 109,
            "id" : 30829593,
            "kids" : [ 30830884, 30832144, 30830019, 30830337, 30830028, 30831130, 30829982, 30829944, 30832122, 30830959, 30830489, 30831118, 30831637, 30830155, 30831468, 30830110, 30829796, 30831018, 30830212, 30830840, 30831068, 30831012, 30831420, 30830826 ],
            "score" : 188,
            "time" : 1648469250,
            "title" : "The popular electronics chain that nuclear scammed America",
            "type" : "story",
            "url" : "https://thehustle.co/the-popular-electronics-chain-that-scammed-america/"
          }
    ],
    'top': [
        {
            "by" : "karaokeyoga",
            "descendants" : 88,
            "id" : 30831485,
            "kids" : [ 30831827, 30832044, 30832428, 30831956, 30832003, 30832317, 30831855, 30831860, 30832196, 30831820, 30831844 ],
            "score" : 212,
            "time" : 1648481065,
            "title" : "Majority in Japan backs nuclear power for first time since Fukushima",
            "type" : "story",
            "url" : "https://www.japantimes.co.jp/news/2022/03/28/national/nuke-power-poll/"
        },
        {
            "by" : "webmaven",
            "descendants" : 39,
            "id" : 30831688,
            "kids" : [ 30832104, 30832293, 30832173, 30832425, 30831927, 30832015, 30832050, 30831957, 30832225, 30831951, 30831917, 30832238, 30832226, 30832125, 30831888, 30832206, 30832322, 30832151, 30831902, 30832192, 30832101 ],
            "score" : 84,
            "time" : 1648482112,
            "title" : "I wasted $40k on a fantastic startup idea",
            "type" : "story",
            "url" : "https://blog.tjcx.me/p/40k-fantastic-startup-idea"
        },
        {
            "by" : "raybb",
            "descendants" : 30,
            "id" : 30831386,
            "kids" : [ 30832078, 30832277, 30831982, 30831834, 30832152, 30832384 ],
            "score" : 106,
            "time" : 1648480649,
            "title" : "‘This Game Is So Realistic It Feels Just Like Working Overtime’",
            "type" : "story",
            "url" : "https://www.sixthtone.com/news/1009982/this-game-is-so-realistic%21-it-feels-just-like-working-overtime"
        },
        {
            "by" : "m_sahaf",
            "descendants" : 34,
            "id" : 30830749,
            "kids" : [ 30831856, 30830982, 30830821, 30831298, 30831141, 30831955, 30832145, 30832049 ],
            "score" : 108,
            "time" : 1648477190,
            "title" : "Show HN: Introducing Caddy-SSH",
            "type" : "story",
            "url" : "https://www.caffeinatedwonders.com/2022/03/28/new-ssh-server/"
        },
        {
            "by" : "yarapavan",
            "descendants" : 109,
            "id" : 30829593,
            "kids" : [ 30830884, 30832144, 30830019, 30830337, 30830028, 30831130, 30829982, 30829944, 30832122, 30830959, 30830489, 30831118, 30831637, 30830155, 30831468, 30830110, 30829796, 30831018, 30830212, 30830840, 30831068, 30831012, 30831420, 30830826 ],
            "score" : 188,
            "time" : 1648469250,
            "title" : "The popular electronics chain that scammed America",
            "type" : "story",
            "url" : "https://thehustle.co/the-popular-electronics-chain-that-scammed-america/"
        }
    ]
}
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the number of pages correctly', () => {
    component.listLength = 2;
    expect(component.pages.length).toBe(3);
  })

  it('should filter stories', () => {
    component.searchString = 'nuclear';
    expect(component.displayedStories.length).toBe(2);
    component.searchString = '';
    expect(component.displayedStories.length).toBe(5);
  })

  it('should change story type', () => {
      component.storyType = 'top';
      expect(component.filterStories('nuclear').length).toBe(1);
  })
});
