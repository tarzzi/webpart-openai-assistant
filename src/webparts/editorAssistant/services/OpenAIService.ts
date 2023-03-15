import {
  ChatCompletionResponseMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import { IChatMessage } from "../components/IChatMessage";

export default class OpenAIService {
  public async callOpenAI(
    chatHistory: IChatMessage[]
  ): Promise<IChatMessage[]> {
    const configuration = new Configuration({
      apiKey: "{YOUR_API_KEY}",
    });
    const openai = new OpenAIApi(configuration);
    // Cannot define max_tokens with a parameter since causes unsafe header error due to being in frontend
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });
    const responseMessage = completion.data.choices[0].message.content;
    const message = this._createMessage(responseMessage);
    chatHistory.push(message);
    return chatHistory;
  }

  private _createMessage(responseMessage: string): IChatMessage {
    return {
      role: ChatCompletionResponseMessageRoleEnum.Assistant,
      content: responseMessage,
    };
  }
}
