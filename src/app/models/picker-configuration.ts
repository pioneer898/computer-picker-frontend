import { ConfigurationComponent } from "./configuration-component";

export interface PickerConfiguration {
  clientName: string,
  basePrice: number,
  components: ConfigurationComponent[]
}
