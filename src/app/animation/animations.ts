import { animate, style, transition, trigger, AnimationTriggerMetadata, state } from '@angular/animations';

export function slideInOnRouteChange(): AnimationTriggerMetadata {
  return trigger('slideInOnRouteChange', [
    transition('* <=> *', [
      style({
        transform: 'translateX(-4em)',
      }),
      animate('400ms ease-in-out')
    ])
  ]);
}

export function appearOnActive(): AnimationTriggerMetadata {
  return trigger('appearOnActive', [
    state('void', style({
        transform: 'scale(0)',
        opacity: 0,
        height: 0,
    })),
    state('*', style({
        transform: 'scale(1)',
    })),
    transition('void => *', animate('400ms ease-in-out')),
    transition('* => void', animate('400ms ease-in-out')),
  ]);
}
