import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonCol, IonRow, IonItem, IonLabel, IonList, IonInput, IonText, IonIcon } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonInput, IonList, IonLabel, IonItem, IonRow, IonCol, IonGrid, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class LoginPage {
  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController) {}

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value.correo!, this.form.value.clave!)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home')
              .then(() => this.form.reset());
          },
          error: (err) => {
            this.openErrorToast('Complete el formulario con datos válidos')
              .then(() => this.form.markAsTouched());
          }
        });
    } else {
      this.openErrorToast('Complete el formulario con datos válidos')
        .then(() => this.form.markAsTouched());
    }
  }

  correo_getError() {
    if (this.form.controls.correo.hasError('required')) {
      return 'El correo electrónico es requerido';
    }
    if (this.form.controls.correo.hasError('email')) {
      return 'El correo electrónico no es válido';
    }
    return '';
  }

  clave_getError() {
    if (this.form.controls.clave.hasError('required')) {
      return 'La clave es requerida';
    }
    if (this.form.controls.clave.hasError('minlength')) {
      return 'La clave debe contener al menos 8 caracteres';
    }
    return '';
  }

  fillTestData(correo: string, clave: string) {
    this.form.get('correo')?.setValue(correo);
    this.form.get('clave')?.setValue(clave);
  }

  async openErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: 'Complete el formulario con datos válidos',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    return toast.present();
  }
}
