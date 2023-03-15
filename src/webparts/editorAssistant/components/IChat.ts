import { IChatMessage } from "./IChatMessage";

export interface IChatProps {
  conversation: IChatMessage[];
  waitingForResponse: boolean;
}
