import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitersPage } from './waiters';

@NgModule({
  declarations: [
    WaitersPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitersPage),
  ],
})
export class WaitersPageModule {}
