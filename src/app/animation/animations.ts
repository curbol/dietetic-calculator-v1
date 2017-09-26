import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const slideInOnLoad = () => trigger('slideInOnLoad', [
    transition('* <=> *', [
        style({
            transform: 'translateX(-5%)',
            opacity: 0
        }),
        animate('400ms ease-in-out')
    ])
])

export const dropDownOnLoad = () => trigger('dropDownOnLoad', [
    transition('* <=> *', [
        style({
            transform: 'translateY(-40%)',
            opacity: .75
        }),
        animate('500ms ease-in-out')
    ])
])