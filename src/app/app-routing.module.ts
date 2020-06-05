import { FurnituresComponent } from './furnitures/furnitures.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WinComponent } from './win/win.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { LivingRoomComponent } from './living-room/living-room.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // FULL TELL IF FULL URL IS EMPTY GO TO HOMECOMPONENT
  { path:'https://tablewoodfs.netlify.app/home',redirectTo : 'https://tablewoodfs.netlify.app/home',pathMatch : 'full' },
  { path:'',redirectTo : '/home',pathMatch : 'full' },
  { path:'home' , component :WinComponent },
  { path:'living', component  : LivingRoomComponent},
  { path:'kitchen',  component :  KitchenComponent},
  { path:'furnitures',  component :  FurnituresComponent},
  { path: "**" ,  component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [FurnituresComponent,
                                  LivingRoomComponent,
                                  KitchenComponent,
                                  WinComponent,
                                  PageNotFoundComponent]