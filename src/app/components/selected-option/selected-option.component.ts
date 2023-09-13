import { Component, Input } from '@angular/core';
import { ComponentOption } from '../../models/component-option';
import { ConfigurationComponent } from '../../models/configuration-component';
import { DefaultComponentOption } from '../../default-models/default-component-option';
import { DefaultConfigurationComponent } from '../../default-models/default-configuration-component';
import { SessionService } from '../../services/session.service';
import { BlockCode } from '../../models/block-code';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-selected-option',
  templateUrl: './selected-option.component.html',
  styleUrls: ['./selected-option.component.scss']
})
export class SelectedOptionComponent {
  @Input() componentOption: ComponentOption = DefaultComponentOption;
  @Input() configurationComponent: ConfigurationComponent = DefaultConfigurationComponent;

  private unsubscribeAll$: Subject<any> = new Subject<any>();
  public blockerIds: string[] = [];
  public blockCodes: BlockCode[] = [];

  constructor(
    public sessionService: SessionService,
  ){
    
  }
  ngOnInit(): void {
    this.sessionService.blockerIds$
    .pipe(
      takeUntil(this.unsubscribeAll$),
      tap((blockerIds:string[])=>{
          let blockCodes: BlockCode[] = [];
          this.componentOption.blockedBy.forEach((e:BlockCode)=>{
            if(blockerIds.includes(e.blockerId)){
              blockCodes.push(e);
            }
          });
          this.blockCodes = blockCodes;
      }),
    ).subscribe()
  }
  
  ngOnDestroy(){
    this.unsubscribeAll$.next(true);
  }
}
