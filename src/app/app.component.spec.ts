import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { storiesReducer } from './store/store.reducer';
import { StoryListComponent } from './story/story-list.component';

describe('AppComponent', () => {
    
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot(
            storiesReducer
        ) 
      ],
      declarations: [
        AppComponent,
        StoryListComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'hacker-news'`, () => {
    expect(component.title).toEqual('hacker-news');
  });

  it('should send request to fetch initial top stories', () => {
        let spy = spyOn(component, 'initialFetchStories');
        component.initialFetchStories('top');
        expect(spy).toHaveBeenCalled();
  })

  it('should send request to fetch initial new stories', () => {
        let spy = spyOn(component, 'initialFetchStories');
        component.initialFetchStories('new');
        expect(spy).toHaveBeenCalled();
    })
});
