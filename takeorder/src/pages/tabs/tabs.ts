import { Component  } from '@angular/core';
import { AvaliablePage } from '../avaliable/avaliable';
import { OpenedPage } from '../opened/opened';
// import { MenulistPage } from '../menulist/menulist';
import { ProgolPage } from '../progol/progol';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AvaliablePage;
  tab2Root = OpenedPage;
  tab3Root = ProgolPage;
  
  constructor() {
   
  }
}
