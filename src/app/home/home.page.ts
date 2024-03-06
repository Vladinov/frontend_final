import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any;
  public usuarios: any;
  public level: any;
  public nombre: any;

  constructor(public auth: AuthService, private router : Router,  private http: HttpClient) { }

  ngOnInit() {

    this.auth.user$.subscribe((data) =>{
    this.user = data
    console.log(this.user);

    this.http.get('http://localhost:3000/usuarios/'+ this.user.email).subscribe((response:any) => {
      console.log(response);
    });

    //to do: post user to backend

    this.http.get('http://localhost:3000/usuarios1/' + this.user.email).subscribe((response) => {
      console.log(response);
      this.usuarios = response;
      
    });
  });
    
  }
  goRuleta1() {
    this.router.navigate(
      ['/ruleta'],
    );
  }

}
