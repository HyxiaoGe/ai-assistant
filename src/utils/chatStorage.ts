// 存储 chatLogs
import type { MessageList, ChatLogsStorageType, SessionList, Session } from "@/types";
import { getLocalStorage, setLocalStorage } from "./storage";
import { SESSION_STORE, MESSAGE_STORE } from "./constant";
import assistantStore from "./assistantStore";

export const getMessageStore = () => {
    let list = getLocalStorage<ChatLogsStorageType>(MESSAGE_STORE);

    if (!list) {
        list = {};
        setLocalStorage(MESSAGE_STORE, list);
    }
    return list;
};

export const getMessage = (key: string) => {
    const list = getMessageStore();
    return list[key] || [];
};

export const updateMessage = (key: string, logs: MessageList) => {
    const list = getMessageStore();
    list[key] = logs;
    setLocalStorage(MESSAGE_STORE, list);
}

export const removeMessage = (key: string) => {
    const list = getMessageStore();
    delete list[key];
    setLocalStorage(MESSAGE_STORE, list);
}

/**
 * Session
 */
export const getSessionStore = (): SessionList => {
    let list = getLocalStorage<SessionList>(SESSION_STORE)
    const assistants = assistantStore.getList()[0];
    if (!list) {
        const session = {
            name: "chat",
            assistant: assistants.id,
            id: Date.now().toString(),
        };
        list = [session];
        updateMessage(session.id, []);
        setLocalStorage(SESSION_STORE, list);
        }
    return list;
};

const updateSessionStore = (list: SessionList) => {
    setLocalStorage(SESSION_STORE, list);
}

export const addSession = (session: Session):SessionList => {
    const list = getSessionStore();
    list.push(session);
    updateSessionStore(list);
    return list;
}

export const getSession = (id: string) => {
    const list = getSessionStore();
    const session = list.find((item) => item.id === id);
    if (!session) return null;

    const { assistant } = session;
    let assistantInfo = assistantStore.getAssistant(assistant);
    if (!assistantInfo) {
        assistantInfo = assistantStore.getList()[0];
        updateSession(session.id, { assistant: assistantInfo.id })
    }
    return {
        ...session,
        assistant: assistantInfo,
    }
};

export const updateSession = (
    id: string,
    data: Partial<Omit<Session, "id">>,
) => {
    const list = getSessionStore();
    const index = list.findIndex((session) => session.id === id);
    if (index > -1) {
        list[index] = {
            ...list[index],
            ...data,
        };
        updateSessionStore(list);
    }
    return list;
}

export const removeSession = (id: string):SessionList => {
    const list = getSessionStore();
    const newList = list.filter((session) => session.id !== id);
    updateSessionStore(newList);
    return newList;
}