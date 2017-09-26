import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const slideInOnRouteChange = () =>
trigger('slideInOnRouteChange', [
  transition('* <=> *', [
    style({
      transform: 'translateX(-4em)',
      opacity: 0
    }),
    animate('400ms ease-in-out')
  ])
]);
