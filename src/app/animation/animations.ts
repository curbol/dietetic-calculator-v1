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
    state('0', style({
        transform: 'scale(0)',
        opacity: 0
    })),
    state('1', style({
        transform: 'scale(1)',
    })),
    transition('0 => 1', animate('200ms ease-in-out')),
    transition('1 => 0', animate('200ms ease-in-out')),
  ]);
}
