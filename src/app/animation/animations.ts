import { animate, style, transition, trigger, AnimationTriggerMetadata, state } from '@angular/animations';

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

export function appearOnActive(): AnimationTriggerMetadata {
  return trigger('appearOnActive', [
    state('false', style({
        transform: 'scale(1)',
        backgroundColor: '#eee'
    })),
    state('true', style({
        transform: 'scale(1.1)',
        backgroundColor: '#cfd8dc'
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('100ms ease-out'))
  ]);
}
