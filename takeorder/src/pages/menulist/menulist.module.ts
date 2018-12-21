import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenulistPage } from './menulist';

@NgModule({
  declarations: [
    MenulistPage,
  ],
  imports: [
    IonicPageModule.forChild(MenulistPage),
  ],
})
export class MenulistPageModule {}
