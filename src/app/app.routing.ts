import { RouterModule } from '@angular/router';
import { HomePage } from './home/home.component';
import { LoginPage } from './login/login.component';
import { RegisterPage } from './register/register.component';
import { ResetPasswordPage } from './reset-password/reset-password.component';

export const routing=RouterModule.forRoot([
    {path:'',component:LoginPage},
    {path:'home', component:HomePage},
    {path:'register',component:RegisterPage},
    {path:'reset',component:ResetPasswordPage}
    // {path:'backToLogin',component:LoginPage}
])