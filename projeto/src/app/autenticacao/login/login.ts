/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from '../Services/autenticacao-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  /**
   *
   */
  constructor(private formBuilder: FormBuilder, private authService: AutenticacaoService, private router: Router) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });

     const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/auth/dashboard']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.authService.autenticar(email).subscribe({
        next: (value) => {
          console.log('Autenticado com sucesso', value);
          this.router.navigateByUrl('/auth/dashboard');
          this.loginForm.reset();
        },
        error: (err) => {
          console.log('Problema na autenticação', err);
        },
      });
    }
  }

}
