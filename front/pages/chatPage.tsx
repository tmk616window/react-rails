import { Box, Container, Grid } from "@material-ui/core";
import { getMessage } from "../src/api/chat/message/GetMessage";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

//サーバーサイドレンダリング
export async function getServerSideProps(context: any) {
  const id = context.query.id;
  const message = (await getMessage(id)).data;
  return {
    props: {
      id: id,
      message: message,
    },
  };
}

const ChatPage = (props: any) => {
  const id = props.id;
  const messages = props.message.messages;
  const currentId = Number(Cookies.get("id"));

  const chatMessages = messages.filter((m: any, index: number) => {
    const cm: any = [];
    if (!m.user_id == id) {
      cm.append(m);
    }
    return cm;
  });

  // console.log(chatMessages);

  useEffect(() => {
    console.log(id, currentId);
    messages.filter((m: any) => {
      if (
        (m.chat_id == currentId && m.user_id == id) ||
        (m.chat_id == id && m.user_id == currentId)
      ) {
        console.log(m);
      }
    });
  }, []);

  return (
    <>
      {props.message.messages.map((message: any, index: number) => (
        <div key={index}>
          <p>{message.text}</p>
          <p>{message.user_id}</p>
          <p>{message.chat_id}</p>
        </div>
      ))}
    </>
  );
};

export default ChatPage;
