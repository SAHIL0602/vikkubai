import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { CalenderComponent } from './calender/calender.component';

const routes: Routes = [

{
  path:"",
  component: LoginComponent ,
  
},
{
  path:"signup",
  component: SignupComponent,

},
{
  path:"dashboard",
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children:[
    {
      path:'chat',
      component: ChatComponent
    },
    { path:"calender",
    component: CalenderComponent 
  }
  ]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
