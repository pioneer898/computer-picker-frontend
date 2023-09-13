import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ConfigurationComponent } from '../../models/configuration-component';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ComponentInfoDialogComponent } from '../component-info-dialog/component-info-dialog.component';
import { SessionService } from '../../services/session.service';
import { DefaultConfigurationComponent } from '../../default-models/default-configuration-component';

@Component({
  selector: 'app-config-component',
  templateUrl: './config-component.component.html',
  styleUrls: ['./config-component.component.scss']
})
export class ConfigComponentComponent {
  @Input() configurationComponent: ConfigurationComponent = DefaultConfigurationComponent;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  selectedIndex:number = 0;
  tabAnimationMs:number = 250;

  constructor(
    public sessionService: SessionService,
    public dialog: MatDialog
  ){
    
  }
  ngOnInit(): void {
    this.selectedIndex = this.configurationComponent.options.findIndex(e=>e.selected == true);
  }
  ngAfterContentInit(){
    this.tabAnimationMs = 200;
  }
  nextTab(){
    const selectedIndex = this.tabGroup.selectedIndex || 0;
    if(selectedIndex < this.tabGroup._tabs.length - 1){
      this.tabGroup.selectedIndex = selectedIndex + 1;
    }
  }
  previousTab(){
    const selectedIndex = this.tabGroup.selectedIndex || 0;
    if(selectedIndex >= 0){
      this.tabGroup.selectedIndex = selectedIndex - 1;
    }
  }
  componentInfo(c:ConfigurationComponent | null): void {
    const dialogRef = this.dialog.open(ComponentInfoDialogComponent, {
      data: c,
    });
  }
}
