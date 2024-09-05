import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class LoginPage {
  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]]
  });
  trigger = false;
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {}

  onSubmit() {
    this.trigger = true;
    if (this.form.valid) {
      this.authService.login(this.form.value.correo!, this.form.value.clave!)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home');
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
      console.log("Formulario no válido");
    }
  }
}
