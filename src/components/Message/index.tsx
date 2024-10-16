import React, { useEffect, useState, KeyboardEvent } from "react";
import chatService from "@/utils/chatService";
import { Markdown } from "../Markdown";
import { Voice } from "../Voice";
import {
  ActionIcon,
  Loader,
  Textarea,
  useMantineColorScheme,
  Button,
  Popover,
} from "@mantine/core";
import Link from "next/link";
import * as chatStorage from "@/utils/chatStorage";
import { ThemeSwitch } from "../ThemeSwitch";
import { USERMAP } from "@/utils/constant";
import { AssistantSelect } from "../AssistantSelect";
import apiClient from "../hooks/apiClient";
import toast, { Toaster } from "react-hot-toast";

import {
  IconSend,
  IconSendOff,
  IconEraser,
  IconDotsVertical,
  IconHeadphones,
  IconHeadphonesOff,
} from "@tabler/icons-react";
import { Assistant, MessageList } from "@/types/chat";
import clsx from "clsx";

type Props = {
  sessionId: string;
  showAIAssistant?: boolean;
  showAssistantManagement?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  showVoiceToggle?: boolean;
};

export const Message = ({
  sessionId,
  showAIAssistant = true,
  showAssistantManagement = true,
  showHeader = true,
  showFooter = true,
  showVoiceToggle = true,
}: Props) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageList>([]);
  const [assistant, setAssistant] = useState<Assistant>();
  const [mode, setMode] = useState<"text" | "voice">("text");
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const session = chatStorage.getSession(sessionId);
    setAssistant(session?.assistant);
    const msg = chatStorage.getMessage(sessionId);
    setMessage(msg);
    if (loading) {
      chatService.cancel();
    }
  }, [sessionId, mode]);

  const updateMessage = (msg: MessageList) => {
    setMessage(msg);
    chatStorage.updateMessage(sessionId, msg);
  };
  chatService.actions = {
    onCompleting: (sug) => setSuggestion(sug),
    onCompleted: () => {
      setLoading(false);
    },
  };

  const onAssistantChange = (assistant: Assistant) => {
    setAssistant(assistant);
    chatStorage.updateSession(sessionId, {
      assistant: assistant.id,
    });
  };

  const onClear = () => {
    updateMessage([]);
  };

  const onKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.keyCode === 13 && !evt.shiftKey) {
      evt.preventDefault();
      onSubmit();
    }
  };

  const setSuggestion = (suggestion: string) => {
    // 检查是否包含特殊的错误模式
    if (
      suggestion.startsWith("<!DOCTYPE html>") &&
      suggestion.includes('data-next-hide-fouc="true"')
    ) {
      suggestion = "Error: 当前服务连接失败，请稍后重试！！！";
    }
    if (suggestion === "") return;
    const len = message.length;
    const lastMessage = len ? message[len - 1] : null;
    let newList: MessageList = [];
    if (lastMessage?.role === "assistant") {
      newList = [
        ...message.slice(0, len - 1),
        {
          ...lastMessage,
          content: suggestion,
        },
      ];
    } else {
      newList = [
        ...message,
        {
          role: "assistant",
          content: suggestion,
        },
      ];
    }
    setMessages(newList);
  };

  const setMessages = (msg: MessageList) => {
    setMessage(msg);
    chatStorage.updateMessage(sessionId, msg);
  };

  const onSubmit = async () => {
    if (loading) {
      return chatService.cancel();
    }
    if (!prompt.trim()) return;
    const isCompliant = await checkPromptCompliance(prompt);
    console.log("isCompliant", isCompliant);
    if (isCompliant) {
      toast.error("内容不合规，请重新输入！！！", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }
    let list: MessageList = [
      ...message,
      {
        role: "user",
        content: prompt,
      },
    ];
    setMessages(list);
    setLoading(true);
    chatService.getStream({
      prompt,
      options: assistant,
      history: list.slice(-assistant?.max_log!),
    });
    setPrompt("");
  };

  const checkPromptCompliance = async (prompt: string) => {
    try {
      const response = await apiClient.post(
        "/sensitive/check-word-compliance",
        {
          prompt,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("合规性检查失败:", error);
      return false;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {showHeader && (
        <div
          className={clsx([
            "flex",
            "justify-between",
            "items-center",
            "p-4",
            "shadow-sm",
            "h-[6rem]",
          ])}
        >
          {showAIAssistant && (
            <Popover width={100} position="bottom" withArrow shadow="sm">
              <Popover.Target>
                <Button
                  size="sm"
                  variant="subtle"
                  className="px-1"
                  rightIcon={<IconDotsVertical size="1rem"></IconDotsVertical>}
                >
                  AI 助理
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Link href="/assistant" className="no-underline text-green-600">
                  助理管理
                </Link>
              </Popover.Dropdown>
            </Popover>
          )}
          <div className="flex items-center">
            {showAssistantManagement && (
              <AssistantSelect
                value={assistant?.id!}
                onChange={onAssistantChange}
              ></AssistantSelect>
            )}
            {showVoiceToggle && (
              <ActionIcon
                size="sm"
                onClick={() => setMode(mode === "text" ? "voice" : "text")}
              >
                {mode === "text" ? (
                  <IconHeadphones color="green" size="1rem"></IconHeadphones>
                ) : (
                  <IconHeadphonesOff
                    color="gray"
                    size="1rem"
                  ></IconHeadphonesOff>
                )}
              </ActionIcon>
            )}
          </div>
          <ThemeSwitch></ThemeSwitch>
        </div>
      )}
      {mode === "text" ? (
        <>
          <div
            className={clsx([
              "flex-col",
              "h-[calc(100vh-10rem)]",
              "w-full",
              "overflow-y-auto",
              "rounded-sm",
              "px-8",
            ])}
          >
            {message.map((item, idx) => {
              const isUser = item.role === "user";

              return (
                <div
                  key={`${item.role}-${idx}`}
                  className={clsx(
                    {
                      flex: item.role === "user",
                      "flex-col": item.role === "user",
                      "items-end": item.role === "user",
                    },
                    "mt-4"
                  )}
                >
                  <div>
                    {USERMAP[item.role]}
                    {!isUser && idx === message.length - 1 && loading && (
                      <Loader size="sm" variant="dots" className="ml-2" />
                    )}
                  </div>
                  <div
                    className={clsx(
                      {
                        "bg-gray-100": colorScheme === "light",
                        "bg-zinc-700/40": colorScheme === "dark",
                        "whitespace-break-spaces": isUser,
                      },
                      "rounded-md",
                      "shadow-md",
                      "px-4",
                      "py-2",
                      "mt-1",
                      "w-full",
                      "max-w-4xl",
                      "min-h-[3rem]"
                    )}
                  >
                    {isUser ? (
                      <div>{item.content}</div>
                    ) : (
                      <Markdown markdownText={item.content}></Markdown>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {showFooter && (
            <div
              className={clsx(
                "flex",
                "items-center",
                "justify-center",
                "self-end",
                "my-4",
                "w-full"
              )}
            >
              <ActionIcon
                className="mr-2"
                disabled={loading}
                onClick={() => onClear()}
              >
                <IconEraser></IconEraser>
              </ActionIcon>
              <Textarea
                placeholder="Enter 发送消息；Shift + Enter 换行；"
                className="w-3/5"
                value={prompt}
                disabled={loading}
                onKeyDown={(evt) => onKeyDown(evt)}
                onChange={(evt) => setPrompt(evt.target.value)}
              ></Textarea>
              <ActionIcon
                color="green"
                className="ml-2"
                onClick={() => onSubmit()}
              >
                {loading ? <IconSendOff /> : <IconSend />}
              </ActionIcon>
            </div>
          )}
        </>
      ) : (
        <div className="h-[calc(100vh-6rem)] w-full">
          <Voice sessionId={sessionId} assistant={assistant!}></Voice>
        </div>
      )}
    </div>
  );
};
