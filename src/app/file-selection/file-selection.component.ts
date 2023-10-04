
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY, Observable, from, map, of, startWith, switchMap } from 'rxjs';
import { FormulaireService } from 'src/services/FormService';
import { Boxing } from 'src/types/Boxing';
import { Transporteur } from 'src/types/Transporteur';
import { fadeOut } from '../animations/fadeOut';
import { move } from '../animations/move';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'my-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.css'],
  animations: [fadeOut, move]
})
export class FileSelectionComponent {

  isSmallScreen = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  isEditable = false;

  transporteurs : Transporteur[] = [];

  currentTransporteur!: Transporteur;
  currentBoxing! : Boxing;
  currentTracking : string = "";
  currentTXID : string = "";

  userTelegram : string = "";

  fichier : File | null = null;

  imageLink : string = "../assets/";

  constructor(private formulaireService : FormulaireService, private _formBuilder: FormBuilder, private breakpointObserver : BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });

    //create boxing
    this.transporteurs = [];
    
    let colissimo : Transporteur = {nom: "COLISSIMO",boxings: [], image: this.imageLink+"/colissimo.png"} 
    colissimo.boxings = [{nom: "LIT", prix: 40},{nom: "LIT ERREUR", prix: 45},{nom: "LIT TRANSIT", prix: 45},{nom: "FTID", prix: 40},{nom: "RTS", prix: 60},{nom: "RTS LIVRÉ", prix: 70}, {nom: "REROUTE", prix: 50}]
    this.transporteurs.push(colissimo);

    let chronopost : Transporteur = {nom: "CHRONOPOST",boxings: [], image: this.imageLink+"/chronopost.png"} 
    chronopost.boxings = [{nom: "LIT", prix: 40},{nom: "LIT TRANSIT", prix: 50},{nom: "FTID", prix: 60},{nom: "RTS", prix: 60},{nom: "RTS LIVRÉ", prix: 90},{nom: "REROUTE", prix: 70}]
    this.transporteurs.push(chronopost);

    let mondialRelay : Transporteur = {nom: "MONDIAL RELAY",boxings: [], image: this.imageLink+"/mondial_relay.png"} 
    mondialRelay.boxings = [{nom: "LIT", prix: 40},{nom: "LIT QR", prix: 45},{nom: "FTID", prix: 60},{nom: "REROUTE", prix: 80}]
    this.transporteurs.push(mondialRelay);

    let ups : Transporteur = {nom: "UPS",boxings: [], image: this.imageLink+"/ups.png"} 
    ups.boxings = [{nom: "LIT PICKUP", prix: 70},{nom: "LIT TRANSIT", prix: 90},{nom: "FTID", prix: 100},{nom: "INVESTIGATION", prix: 150}]
    this.transporteurs.push(ups);

    let dhl : Transporteur = {nom: "DHL",boxings: [], image: this.imageLink+"/dhl.png"} 
    dhl.boxings = [{nom: "LIT", prix: 100},{nom: "LIT TRANSIT", prix: 150}]
    this.transporteurs.push(dhl);

    let dpd : Transporteur = {nom: "DPD",boxings: [], image: this.imageLink+"/dpd.png"} 
    dpd.boxings = [{nom: "LIT", prix:40}]
    this.transporteurs.push(dpd);
  }

  chooseTransporteur(transporteur : Transporteur) {
    this.currentTransporteur = (this.currentTransporteur == transporteur) ? this.currentTransporteur! : transporteur;
  }

  chooseBoxing(boxing : Boxing) {
    this.currentBoxing = (this.currentBoxing == boxing) ? this.currentBoxing! : boxing;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      console.log(inputElement.files[0]);
    }
  }

  onSubmit(): void {
    console.log("submiititt")
    if (!this.fichier) {
      // Gérez le cas où aucun fichier n'a été sélectionné
      return;
    }

    const formData = new FormData();
    formData.append('username', this.userTelegram);
    formData.append('transporteur', this.currentTransporteur.nom)
    formData.append('boxing', this.currentBoxing.nom)
    formData.append('numeroSuivi', this.currentTracking);
    formData.append('numeroTransaction', this.currentTXID);
    formData.append('fichier', this.fichier);

    this.formulaireService.envoyerFormulaire(formData).subscribe(
      (response) => {
        // Gérez la réponse de votre serveur (par exemple, affichez un message de confirmation)
        console.log('Formulaire envoyé avec succès', response);
      },
      (error) => {
        // Gérez les erreurs (par exemple, affichez un message d'erreur)
        console.error('Erreur lors de l\'envoi du formulaire', error);
      }
    );
  }

}

