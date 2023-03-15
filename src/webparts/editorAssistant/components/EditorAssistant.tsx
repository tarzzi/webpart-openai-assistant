import * as React from "react";
import styles from "./EditorAssistant.module.scss";
import { IEditorAssistantProps } from "./IEditorAssistantProps";
import {
  TextField,
  DefaultButton,
  Stack,
  StackItem,
  PrimaryButton,
  VerticalDivider,
} from "office-ui-fabric-react";
import OpenAIService from "../services/OpenAIService";
import { IChatMessage } from "./IChatMessage";
import Chat from "./Chat";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import * as strings from "EditorAssistantWebPartStrings";

interface IEditorAssistantState {
  prompt: string;
  conversation: IChatMessage[];
  waitingForResponse: boolean;
  apiError: boolean;
}

export default class EditorAssistant extends React.Component<
  IEditorAssistantProps,
  IEditorAssistantState
> {
  private _openAiService: OpenAIService;

  constructor(props: IEditorAssistantProps) {
    super(props);
    const conversation: IChatMessage[] = [];

    const initialPrompt = this.props.initialPrompt;
    if (initialPrompt !== "") {
      const initialMessage: IChatMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: initialPrompt,
      };
      conversation.push(initialMessage);
    }
    this.state = {
      prompt: "",
      conversation: conversation,
      waitingForResponse: false,
      apiError: false,
    };

    this._sendMessage = this._sendMessage.bind(this);
    this._onPromptChange = this._onPromptChange.bind(this);
    this._resetChatHistory = this._resetChatHistory.bind(this);
    this._openAiService = new OpenAIService();
  }

  private _appendMessageToConversation(message: IChatMessage): void {
    const conversation = this.state.conversation;
    conversation.push(message);
    this.setState({
      conversation: conversation,
    });
  }

  private async _sendMessage(): Promise<void> {
    this.setState({
      prompt: "",
      waitingForResponse: true,
    });
    const request: IChatMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: this.state.prompt,
    };
    this._appendMessageToConversation(request);

    const response: IChatMessage[] = await this._openAiService
      .callOpenAI(this.state.conversation)
      .then((response: IChatMessage[]) => {
        return response;
      })
      .catch((error: Error) => {
        console.log(error.message);
        const errorResponse: IChatMessage = {
          role: "assistant",
          content:strings.ApiErrorMessage,
        };
        const conversation = this.state.conversation;
        this.setState({
          apiError: true,
        });
        conversation.push(errorResponse);

        return conversation;
      });

    this.setState({
      conversation: response,
      waitingForResponse: false,
    });
  }

  private async _resetChatHistory(): Promise<void> {
    const conversation: IChatMessage[] = [];
    const initialPrompt = this.props.initialPrompt;
    if (initialPrompt !== "") {
      const initialMessage: IChatMessage = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: initialPrompt,
      };
      conversation.push(initialMessage);
    }
    this.setState({
      prompt: "",
      conversation: conversation,
      apiError: false,
      waitingForResponse: false,
    });
  }

  private _onPromptChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    this.setState({
      prompt: newValue,
    });
  };

  public render(): React.ReactElement<IEditorAssistantProps> {
    const { title } = this.props;
    const stackTokens = { childrenGap: 5, padding: 10, align: "center" };

    const handleButtonDisabled = (): boolean => {
      if (
        this.state.prompt.length < 5 ||
        this.state.waitingForResponse ||
        this.state.apiError
      ) {
        return true;
      }
      return false;
    };

    return (
      <section
        className={styles.editorAssistant}
      >
        <h1>{title}</h1>
        <div className={styles.inputPart}>
          <Stack horizontal tokens={stackTokens} wrap>
            <StackItem grow={4}>
              <TextField
                multiline
                autoAdjustHeight
                id="prompt"
                onChange={this._onPromptChange}
                value={this.state.prompt}
                placeholder={strings.PromptPlaceholder}
              />
            </StackItem>
            <StackItem shrink={1}>
              <PrimaryButton
                text={strings.SubmitButtonLabel}
                disabled={handleButtonDisabled()}
                onClick={this._sendMessage}
              />
            </StackItem>
            <StackItem shrink={1}>
              <DefaultButton
                text={strings.ClearButtonLabel}
                onClick={this._resetChatHistory}
              />
            </StackItem>
          </Stack>
        </div>
        {this.state.conversation.length > 1 && (
          <>
            <VerticalDivider />
            <Chat
              conversation={this.state.conversation}
              waitingForResponse={this.state.waitingForResponse}
            />
          </>
        )}
      </section>
    );
  }
}
