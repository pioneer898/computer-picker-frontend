import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private unsubscribeAll$: Subject<any> = new Subject<any>();
  accessCode = new FormControl('',[Validators.required]);

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
  }

  startSession(){
    if(!this.accessCode.valid || !this.accessCode.valid){
      this.accessCode.markAllAsTouched();
      return;
    }
    
    const accessCode = this.accessCode.value
    this.router.navigate(['/picker'],{queryParams: { accessCode }});
    // this.sessionService.getConfiguration(this.accessCode.value || '');
    // this.sessionService.configurationSubject$
    //   .pipe(
    //     takeUntil(this.unsubscribeAll$),
    //     tap((d:PickerConfiguration)=>{
    //       if(d){
    //         this.router.navigate(['/picker']);
    //       } else {
    //         //Show alert
    //       }
    //     }),
    //   ).subscribe()
  }
  ngOnDestroy(){
    this.unsubscribeAll$.next(true);
  }

}
