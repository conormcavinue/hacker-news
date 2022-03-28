import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculateDatePipe } from '../shared/calculate-date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IStory } from './story';

import { StoryComponent } from './story.component';

describe('StoryComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let mockStory: IStory = {
        "by" : "dhouston",
        "descendants" : 71,
        "id" : 8863,
        "kids" : [ 9224, 8917, 8952, 8958, 8884, 8887, 8869, 8873, 8940, 8908, 9005, 9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876 ],
        "score" : 104,
        "time" : 1175714200,
        "title" : "My YC app: Dropbox - Throw away your USB drive",
        "type" : "story",
        "url" : "http://www.getdropbox.com/u/2/screencast.html"
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryComponent, CalculateDatePipe ],
      imports: [ BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    component.story = mockStory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain story', () => {
    expect('by' in component.story).toBeTrue();
    expect('descendants' in component.story).toBeTrue();
    expect('title' in component.story).toBeTrue();
  })
});
