import { Component, Input } from '@angular/core';
import { IStory } from './story';

@Component({
  selector: 'hn-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
    @Input()
    story!: IStory;

}
