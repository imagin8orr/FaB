import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { AddEditCardComponent } from './cards/add-edit-card/add-edit-card.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewCardComponent } from './cards/view-card/view-card.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { MyCardsComponent } from './cards/my-cards/my-cards.component';

const routes: Routes = [
  { path: '', component: CardsComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'login', pathMatch: 'full', component: LoginRegisterComponent, canActivate: [AuthenticationGuard] },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'my-cards', component: MyCardsComponent, canActivate: [AuthenticationGuard] },
  { path: 'card/add', component: AddEditCardComponent, canActivate: [AuthenticationGuard] },
  { path: 'card/edit/:id', component: AddEditCardComponent, canActivate: [AuthenticationGuard] },
  { path: 'card/view/:id', component: ViewCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
