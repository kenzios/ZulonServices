import { Component, OnInit } from '@angular/core';
import { Transporteur } from 'src/types/Transporteur';
import { Boxing } from 'src/types/Boxing';

import { FormsModule } from '@angular/forms'
import { FormulaireService } from 'src/services/FormService';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fadeOut } from './animations/fadeOut';
import { move } from './animations/move';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeOut, move],
})
export class AppComponent {
}
