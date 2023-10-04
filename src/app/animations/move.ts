import { trigger, state, style, animate, transition } from '@angular/animations';

// Créez une animation de disparition
export const move = trigger('move', [
    state('start', style({ transform: 'translateX(0)' })),
    state('end', style({ transform: 'translateX(100%)' })),
    transition('start => end', animate('300ms ease-out')),
    transition('end => start', animate('300ms ease-in')),
])