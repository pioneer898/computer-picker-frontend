import { ComponentOption } from "./component-option";

export interface ConfigurationComponent {
    acessCode: string,
    name: string,
    description: string,
    selectedOptionId: number,
    options: ComponentOption[]
}
