import {
  ChatCompletionResponseMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import { IChatMessage } from "../components/IChatMessage";

/*
*  NOTICE - NOT FOR PRODUCTION USE
*  This should be handled in the backend, only here for demo purposes
*  Also note that this is not a secure way to handle API keys
*  See https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/security-considerations
*  Also does work randomly since sometimes can cause a unsafe header error
*/

export default class OpenAIService {
  public async callOpenAI(
    chatHistory: IChatMessage[]
  ): Promise<IChatMessage[]> {
    const configuration = new Configuration({
      apiKey: "{YOUR_API_KEY}",
    });
    const openai = new OpenAIApi(configuration);
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
