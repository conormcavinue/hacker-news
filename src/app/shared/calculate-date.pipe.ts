import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateDate'
})
export class CalculateDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const now = Date.now()/1000;
    const storyAge = now - value;
    const years = Math.floor(storyAge / 31536000);
    const days = Math.floor((storyAge % 31536000) / 86400);
    const hours =  Math.floor((storyAge % 86400) / 3600);
    const minutes = Math.floor((storyAge % 3600) / 60);
    return `
        ${years ? years + ` year${years > 1 ? 's' : ''}, ` : ''} 
        ${days ? days + ` day${days > 1 ? 's' : ''}, `: ''} 
        ${hours ? hours + ` hour${hours > 1 ? 's' : ''}, `: ''} 
        ${minutes} minutes ago`;
  }

}
