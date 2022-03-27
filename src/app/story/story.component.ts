import { Component, Input, OnDestroy } from '@angular/core';
import { IStory } from './story';
import { transition, style, animate, trigger } from '@angular/animations'

@Component({
  selector: 'hn-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
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
export class StoryComponent {
    @Input()
    story!: IStory;
}
