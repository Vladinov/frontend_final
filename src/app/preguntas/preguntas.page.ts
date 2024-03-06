import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  public preguntas: any;
  public user: any;
  public random: any;
  public oba: any;
  public respuestas: any= [];
  public respuestacorrecta: any;
  public respuestaSeleccionada: string = '';
  public respuesta_seleccionada = '';
  public tema: any;
  public resultado: any;


  constructor(public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private router : Router) { }

  ngOnInit() {

    this.auth.user$.subscribe((data) =>{
      this.user = data
      console.log(this.user);})
      

    this.route.queryParams.subscribe(params => {
      this.tema = JSON.parse(params['tema']);
      console.log(this.tema)


      this.http.get('http://localhost:3000/preguntas/' + this.tema.id).subscribe((response) => {
        console.log(response);
        this.preguntas = response;

        this.random = Math.floor(Math.random() * this.preguntas.length);
        console.log(this.random)
        this.oba = this.preguntas[this.random];

        this.http.get('http://localhost:3000/respuestas/' + this.oba.id).subscribe((response:any) => {
          console.log(response);
          console.log("Respuesta correcta")
        this.respuestacorrecta = response[0].respuesta_correcta;
        console.log(this.respuestacorrecta)
          this.respuestas = [];
          this.respuestas.push(response[0].respuesta_correcta);
          this.respuestas.push(response[0].respuesta_incorrecta_1);
          this.respuestas.push(response[0].respuesta_incorrecta_2);
          this.respuestas.push(response[0].respuesta_incorrecta_3);
          this.sortAnswers();
        })
      })

    });
  }

  sortAnswers() {
    this.respuestas = this.respuestas.sort(() => 0.5 - Math.random());
  }

 VoF( respuestaSeleccionada: string){

    if(this.respuesta_seleccionada != ''){
      if( respuestaSeleccionada == this.respuestacorrecta ){
        return "verde"
      }
      else {
        return "rojo"
      }
    }
    return '';
  }

  responderPregunta(respuesta: string){
    this.respuesta_seleccionada = respuesta;

    if(this.respuestacorrecta == this.respuesta_seleccionada ){
        if( this.tema.dificultad == 'facil'){
            this.resultado = 3
        } else if( this.tema.dificultad == 'medio'){
          this.resultado = 5
        }else{
          this.resultado = 10
        }
        console.log(this.resultado)
    }
    this.http.get('http://localhost:3000/usuarios3/' + this.user.email + '/' + this.resultado).subscribe((response) => {
      console.log(response);
      this.resultado = response;
    })
  }

 



  goInicio() {
    
    this.router.navigate(
      ['/home'],
    );
  }

  goRuleta() {
    this.router.navigate(
      ['/ruleta'],
    );
  }
 
}
