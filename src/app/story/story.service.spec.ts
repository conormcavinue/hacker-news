import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { IStory } from './story';

import { StoryService } from './story.service';

describe('StoryService', () => {
    let service: StoryService;

    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientModule ]
    });
    service = TestBed.inject(StoryService);
    
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('Should get Story', waitForAsync(() => {
        let stories = service.getStories([1]);
        for(let story of stories) {
            story.subscribe(data => {
                expect('by' in data).toBeTrue();
                expect('descendants' in data).toBeTrue();
                expect('title' in data).toBeTrue();
            });
        }
    }))
});
