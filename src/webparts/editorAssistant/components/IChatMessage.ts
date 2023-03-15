import { ChatCompletionRequestMessageRoleEnum, ChatCompletionResponseMessageRoleEnum } from "openai";


export interface IChatMessage {
    role: ChatCompletionRequestMessageRoleEnum | ChatCompletionResponseMessageRoleEnum;
    content: string;
  }