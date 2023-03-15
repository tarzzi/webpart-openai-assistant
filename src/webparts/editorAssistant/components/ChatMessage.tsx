import { Icon } from "office-ui-fabric-react";
import * as React from "react";
import styles from "./EditorAssistant.module.scss";
import { IChatMessage } from "./IChatMessage";

interface IChatMessageProps {
  message: IChatMessage;
}

export default class ChatMessage extends React.Component<
  IChatMessageProps,
  {}
> {
  constructor(props: IChatMessageProps) {
    super(props);
  }

  public render(): React.ReactElement<IChatMessageProps> {
    const message = this.props.message;
    if (message.role !== "system") {
      return (
        <div className={styles.messageContainer}>
          <div
            className={
              message.role === "user"
                ? styles.userMessage
                : styles.assistantMessage
            }
          >
            <p>{message.content}</p>
            <Icon
              iconName={message.role === "user" ? "Speech" : "Robot"}
              className={
                message.role === "user" ? styles.humanIcon : styles.botIcon
              }
            />
          </div>
        </div>
      );
    }
    return null;
  }
}
