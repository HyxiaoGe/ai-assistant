import React, { useState, useEffect } from "react";
import type { Session as ISession, SessionList } from "@/types/chat";
import * as chatStorage from "@/utils/chatStorage";
import { IconTrash, IconMessagePlus } from "@tabler/icons-react";
import clsx from "clsx";
import { EdittableText } from "../EdittableText";
import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import assistantStore from "@/utils/assistantStore";

type Props = {
  sessionId: string;
  onChange: (arg: string) => void;
  onGoBack: () => void;
  className?: string;
};

const itemBaseClasses =
  "flex cursor-pointer h-[2.4rem] items-center justify-around group px-4 rounded-md";

const generateItemClasses = (
  id: string,
  sessionId: string,
  colorScheme: string
) => {
  return clsx([
    itemBaseClasses,
    {
      "hover:bg-gray-300/60": colorScheme === "light",
      "bg-gray-200/60": id !== sessionId && colorScheme === "light",
      "bg-gray-300": id === sessionId && colorScheme === "light",
      "hover:bg-zinc-800/50": colorScheme === "dark",
      "bg-zinc-800/20": id !== sessionId && colorScheme === "dark",
      "bg-zinc-800/90": id === sessionId && colorScheme === "dark",
    },
  ]);
};

export const Session = ({
  sessionId,
  onChange,
  onGoBack,
  className,
}: Props) => {
  const [sessionList, setSessionList] = useState<SessionList>([]);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const list = chatStorage.getSessionStore();
    setSessionList(list);
  }, []);

  const createSession = () => {
    const assistantList = assistantStore.getList();
    const newSession: ISession = {
      name: `新会话-${sessionList.length + 1}`,
      assistant: assistantList[0].id,
      id: Date.now().toString(),
    };
    onChange(newSession.id);
    let list = chatStorage.addSession(newSession);
    setSessionList(list);
  };

  const updateSession = (name: string) => {
    let newSessionList = chatStorage.updateSession(sessionId, { name });
    setSessionList(newSessionList);
  };

  const removeSession = (id: string) => {
    let list = chatStorage.removeSession(id);
    if (sessionId === id) {
      onChange(list[0]?.id);
    }
    setSessionList(list);
  };

  return (
    <div
      className={clsx(
        {
          "bg-black/10": colorScheme === "dark",
          "bg-gray-100": colorScheme === "light",
        },
        "h-screen",
        "w-64",
        "flex",
        "flex-col",
        "px-2",
        className
      )}
    >
      <div className="flex justify-between py-2 w-full">
        <ActionIcon onClick={() => createSession()} color="green" size="sm">
          <IconMessagePlus size="1.2rem"></IconMessagePlus>
        </ActionIcon>
      </div>
      <div
        className={clsx([
          "pb-4",
          "overflow-y-auto",
          "scrollbar-none",
          "flex",
          "flex-col",
          "gap-y-2",
        ])}
      >
        {sessionList.map(({ id, name }) => (
          <div
            key={id}
            className={generateItemClasses(id, sessionId, colorScheme)}
            onClick={() => onChange(id)}
          >
            <EdittableText
              text={name}
              onSave={(name) => updateSession(name)}
            ></EdittableText>
            {sessionList.length > 1 ? (
              <IconTrash
                size=".8rem"
                color="gray"
                onClick={(evt) => {
                  evt.stopPropagation();
                  removeSession(id);
                }}
                className="mx-1 invisible group-hover:visible"
              ></IconTrash>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-auto pb-4 px-2">
        <button
          onClick={onGoBack}
          className={clsx(
            "w-full",
            "py-2",
            "px-4",
            "flex",
            "items-center",
            "justify-center",
            "transition-all",
            "rounded-md",
            "text-sm",
            "font-medium",
            "bg-transparent",
            {
              "text-gray-700 hover:bg-gray-200/50 active:bg-gray-300/50":
                colorScheme === "light",
              "text-gray-200 hover:bg-zinc-700/50 active:bg-zinc-600/50":
                colorScheme === "dark",
            },
            "border",
            {
              "border-gray-300": colorScheme === "light",
              "border-zinc-600": colorScheme === "dark",
            },
            "hover:border-opacity-100",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-offset-2",
            {
              "focus:ring-gray-400": colorScheme === "light",
              "focus:ring-zinc-500": colorScheme === "dark",
            }
          )}
        >
          返回主页
        </button>
      </div>
    </div>
  );
};
