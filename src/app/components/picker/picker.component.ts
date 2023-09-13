import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { PickerConfiguration } from '../../models/picker-configuration';
import { ComponentOption } from '../../models/component-option';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent {
  private unsubscribeAll$: Subject<any> = new Subject<any>();

  public accessCode: string = '';
  public isLoading: boolean = true;
  public configuration: PickerConfiguration = {
    clientName: 'Test',
    basePrice: 0,
    components: []
  };
  public selectedOptions: ComponentOption[] = [];
  public price: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
  ){
      
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const accessCode = params['accessCode'];
      if(accessCode == ''){
          this.router.navigate(['/login']);
      } else {
        this.sessionService.getConfiguration(accessCode || '');
      }
    });

    this.sessionService.configurationSubject$
    .pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:PickerConfiguration)=>{
          this.configuration = d;
          this.isLoading = false
      }),
    ).subscribe()

    this.sessionService.selectedOptions$
    .pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:ComponentOption[])=>{
          this.selectedOptions = d;
      }),
    ).subscribe()
    
    this.sessionService.price$
    .pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:number)=>{
          this.price = d;
      }),
    ).subscribe()
      
    this.sessionService.backToLogin$
    .pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:boolean)=>{
        this.router.navigate(['/login']);
      }),
    ).subscribe()
  }

  ngOnDestroy(){
    this.unsubscribeAll$.next(true);
  }

}
