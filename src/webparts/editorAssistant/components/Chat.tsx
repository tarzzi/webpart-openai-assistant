import * as React from "react";
import styles from "./EditorAssistant.module.scss";
import { IChatMessage } from "./IChatMessage";
import ChatMessage from "./ChatMessage";
import { IChatProps } from "./IChat";
import { Spinner } from "office-ui-fabric-react";

export default class Chat extends React.Component<IChatProps, {}> {
  constructor(props: IChatProps) {
    super(props);
  }

  public render(): React.ReactElement<IChatProps> {
    return (
      <div className={styles.chat}>
        <div className={styles.chatContainer}>
          {this.props.conversation.map((message: IChatMessage, key: number) => {
            return <ChatMessage key={key} message={message} />;
          })}
          {this.props.waitingForResponse && (
            <div className={styles.chatContainer}>
              <div className={styles.messageContainer}>
                <div className={styles.waitingResponse}>
                  <Spinner
                    label="Thinking..."
                    ariaLive="assertive"
                    labelPosition="left"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
