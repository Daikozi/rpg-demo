import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../App";
import { ChatMessage, ChatMessageProps } from "../chatMessage/ChatMessage";

export const ChatRoom = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q, { idField });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!auth.currentUser) {
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp(),
    });
    setFormValue("");

    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg, index) => {
            return <ChatMessage key={index} {...(msg as ChatMessageProps)} />;
          })}
        <div ref={dummy} />
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          type="text"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
