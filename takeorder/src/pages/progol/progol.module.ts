import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgolPage } from './progol';

@NgModule({
  declarations: [
    ProgolPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgolPage),
  ],
})
export class ProgolPageModule {}
