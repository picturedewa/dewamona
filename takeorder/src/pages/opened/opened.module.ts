import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenedPage } from './opened';

@NgModule({
  declarations: [
    OpenedPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenedPage),
  ],
})
export class OpenedPageModule {}
