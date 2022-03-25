import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoryService } from './story.service';
import { IStory } from './story';

@Component({
  selector: 'hn-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
    sub!: Subscription;
    storyNumbers: Array<number> = [];
    stories: Array<IStory> = [];
    constructor(private storyService: StoryService) {}

    ngOnInit(): void {
        this.storyService.getStoryIds('topstories').subscribe({
            next: stories => {
                this.storyNumbers = stories;
                this.storyService.getStories(stories).splice(0, 30).forEach(story => {
                    story.subscribe({
                        next: story => {
                            this.stories.push(story)
                        }
                    })
                })
            }
        });
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    };

}
