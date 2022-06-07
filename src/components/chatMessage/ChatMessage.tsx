import React, { FC } from "react";
import { auth } from "../../firebase/firebaseConfig";

export type ChatMessageProps = {
  text: string;
  uid: string;
  photoURL: string;
  id: string;
  createdAt: Date;
};

export const ChatMessage: FC<ChatMessageProps> = ({ text, uid, photoURL }) => {
  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
};
