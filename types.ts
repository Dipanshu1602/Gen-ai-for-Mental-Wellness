
export enum MessageSender {
  User,
  AI,
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
}
