import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private platform: Platform,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.platform.ready()
      .then(() => {
        SplashScreen.hide();
        this.authService.user$.subscribe(user => {
          if (user) {
            this.authService.currentUserSignal.set({
              email: user.email!
            });
          } else {
            this.authService.currentUserSignal.set(null);
          }
        });
      });
  }
}
