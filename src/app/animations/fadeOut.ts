import { trigger, state, style, animate, transition } from '@angular/animations';

// Créez une animation de disparition
export const fadeOut = trigger('fadeOut', [
  state('visible', style({ opacity: 1 })),
  state('hidden', style({ opacity: 0 })),
  transition('visible => hidden', animate('300ms ease-out')),
  transition('hidden => visible', animate('300ms ease-in')),
]);
