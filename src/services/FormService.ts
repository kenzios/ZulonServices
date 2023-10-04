import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormulaireService {
  private baseUrl = 'https://encouraging-fog-pram.glitch.me/zulonservices'; // Remplacez par l'URL de votre serveur Node.js

  constructor(private http: HttpClient) {}

  envoyerFormulaire(data: FormData) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'https://encouraging-fog-pram.glitch.me/zulonservices', // Remplacez par le domaine de votre application Angular
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    return this.http.post(`${this.baseUrl}/traiter-formulaire`, data, {headers: headers});
  }
}