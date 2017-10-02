import { animate, style, group, animateChild, query, stagger, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

export function slideInOnRouteChange(): AnimationTriggerMetadata {
  return trigger('slideInOnRouteChange', [
    transition('* <=> *', [
      style({
        transform: 'translateX(-4em)',
        opacity: 0
      }),
      animate('400ms ease-in-out')
    ])
  ]);
}
