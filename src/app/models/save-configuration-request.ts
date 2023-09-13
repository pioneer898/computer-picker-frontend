import { PickerConfiguration } from "./picker-configuration";

export interface SaveConfigurationRequest {
  accessCode: string,
  pickerConfiguration: PickerConfiguration
}
