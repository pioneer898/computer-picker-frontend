import { Injectable } from '@angular/core';
import { ConfigurationRequest } from '../models/configuration-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject, throwError, Observable } from 'rxjs';
import { map, tap, takeUntil, catchError} from 'rxjs/operators';
import { ConfigurationResponse } from '../models/configuration-response';
import { PickerConfiguration } from '../models/picker-configuration';
import { ComponentOption } from '../models/component-option';
import { ConfigurationComponent } from '../models/configuration-component';
import { DefaultPickerConfiguration } from '../default-models/default-picker-configuration';
import { SaveConfigurationRequest } from '../models/save-configuration-request';
import { SaveConfigurationResponse } from '../models/save-configuration-response';
import { BlockCode } from '../models/block-code';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private unsubscribeAll$: Subject<any> = new Subject<any>();
  private configuration: PickerConfiguration = DefaultPickerConfiguration;

  public apiVersion: string = 'v1.0';
  public accessCode: string = '';
  public backToLogin$: Subject<boolean> = new Subject<boolean>;
  public configurationSubject$: Subject<PickerConfiguration> = new Subject<PickerConfiguration>;
  public selectedOptions$: Subject<ComponentOption[]> = new Subject<ComponentOption[]>;
  public price$: Subject<number> = new Subject<number>;
  public saving$: Subject<boolean> = new Subject<boolean>;
  public blockerIds$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private _http: HttpClient
  ) {}
  public getConfiguration(accessCode: string){
    return this._getConfiguration({accessCode:accessCode});
  }
  public selectComponentOption(configurationComponent:ConfigurationComponent,componentOption:ComponentOption){
    let component:ConfigurationComponent | undefined = this.configuration.components.find(e=>e == configurationComponent);
    component?.options.forEach(e=>e.selected = false);
    this.configuration.components
    let option:ComponentOption | undefined = component?.options.find(o=>o == componentOption);
    if(option){
      option.selected = true;
    }
    this._setConfiguration(this.configuration);
  }
  private _getConfiguration(configurationRequest:ConfigurationRequest){
    const params = new HttpParams()
    .set('accessCode', configurationRequest.accessCode);
    const res = this._http.get<ConfigurationResponse>(`/api/${this.apiVersion}/configuration`,{params})
      .pipe(
        takeUntil(this.unsubscribeAll$),
        tap((d:ConfigurationResponse)=>{
          if(d.accessCodeIsValid){
            this._setAccessCode(configurationRequest.accessCode);
            this._setConfiguration(d.pickerConfiguration,false);
          } else {
            this.backToLogin$.next(true);
          }
        })
      ).subscribe()
  }
  private _setAccessCode(accessCode:string){
    this.accessCode = accessCode;
  }
  private _setConfiguration(configuration:PickerConfiguration,save:boolean=true){
    this.selectedOptions$.next(this._getSelectedOptionsFromConfig(configuration));
    this.price$.next(this._getBuildPriceFromConfig(configuration));
    this.configuration = configuration;
    this.configurationSubject$.next(configuration);
    this._updateBlockCodes();
    if(save){
      this._saveConfiguration(configuration);
    }
  }
  private _getSelectedOptionsFromConfig(configuration:PickerConfiguration):ComponentOption[]{
    let selectedOptions: ComponentOption[] = [];
    selectedOptions = configuration.components.map(e=>{
      let selectedOption = e.options.find(o=>o.selected === true);
      return selectedOption!;
    })
    return selectedOptions;
  }
  private _getBuildPriceFromConfig(configuration:PickerConfiguration):number{
    let price:number = 0;
    this._getSelectedOptionsFromConfig(configuration).forEach((e)=>{
      price += e.price;
    });
    return price;
  }
  private _saveConfiguration(configuration:PickerConfiguration){
    this.saving$.next(true);
    const saveConfigurationRequest: SaveConfigurationRequest = {
      accessCode: this.accessCode,
      pickerConfiguration: this.configuration
    }
    const res = this._http.post<SaveConfigurationResponse>(`/api/${this.apiVersion}/configuration`,saveConfigurationRequest)
    .pipe(
      takeUntil(this.unsubscribeAll$),
      tap((d:SaveConfigurationResponse)=>{
        if(d.success){
          this.saving$.next(true);
        } else {
          //Error
        }
      })
    ).subscribe()
  }
  private _updateBlockCodes(){
    this.blockerIds$.next(this._getSelectedOptionsFromConfig(this.configuration).map((e:ComponentOption)=>e.blockerIds).flat());
  }
}
