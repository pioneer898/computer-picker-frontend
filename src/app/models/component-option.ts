import { BlockCode } from "./block-code"

export interface ComponentOption {
  name: string
  description: string,
  link: string,
  price: number,
  imageFileType: string,
  imageId: string,
  selected: boolean,
  blockerIds: string[],
  blockedBy: BlockCode[]
}
