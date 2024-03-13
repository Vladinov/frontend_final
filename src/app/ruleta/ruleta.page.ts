import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.page.html',
  styleUrls: ['./ruleta.page.scss'],
  
})
export class RuletaPage implements OnInit {
  public ruleta : any;
  public primerboton: boolean = false;
  

  constructor(private router : Router, private http: HttpClient) { }

  ngOnInit() {
 
}
 tirada(){ 
 this.http.get('https://backend-final-k4mq.onrender.com/temas').subscribe((response) => {
    console.log(response);
    this.ruleta = response;
    this.primerboton = true 
    
  });
}

goPreguntas() {


  this.router.navigate(
    ['/preguntas'],
    { queryParams: { tema: JSON.stringify(this.ruleta) } }
  );
}
}



