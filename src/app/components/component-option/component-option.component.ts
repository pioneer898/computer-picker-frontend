import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentOption } from '../../models/component-option';
import { DefaultComponentOption } from '../../default-models/default-component-option';
import { ConfigurationComponent } from '../../models/configuration-component';
import { DefaultConfigurationComponent } from '../../default-models/default-configuration-component';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-component-option',
  templateUrl: './component-option.component.html',
  styleUrls: ['./component-option.component.scss']
})
export class ComponentOptionComponent {
  @Input() componentOption: ComponentOption = DefaultComponentOption;
  @Input() configurationComponent: ConfigurationComponent = DefaultConfigurationComponent;

  constructor(
    public sessionService: SessionService,
  ){
    
  }
  
  priceDifference():string{
    const diff:number = this.componentOption.price - (this.configurationComponent.options.find(e=>e.selected === true)?.price || 0)
    let symbol:string = '+';
    if(diff < 0){
      symbol = '-';
    }
    return (diff === 0)?'':`(${symbol}$${diff.toString().replace('-','')})`;
  }
  selectComponentOption(componentOption:ComponentOption){
    this.sessionService.selectComponentOption(this.configurationComponent,componentOption);
  }
}
