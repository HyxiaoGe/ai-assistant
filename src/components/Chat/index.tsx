import React, {useState, useEffect} from "react";
import * as chatStorage from "@/utils/chatStorage";
import { Message } from "@/components/Message";
import { Session } from "@/components/Session";
import { MediaQuery } from "@mantine/core";

export const Chat = () => {
    const [sessionId, setSessionId] = useState<string>("")
    useEffect(() => {
        const init = async () => {
            const list = await chatStorage.getSessionStore();
            const id = list[0]?.id;
            setSessionId(id);
        };
        init();
    }, []);

    return (
        <div className="h-screen flex w-screen">
        <MediaQuery
            smallerThan="md"
            styles={{
            width: "0 !important",
            padding: "0 !important",
            overflow: "hidden",
            }}
        >
            <Session sessionId={sessionId} onChange={setSessionId}></Session>
        </MediaQuery>
        <Message sessionId={sessionId}></Message>
    </div>
    );
};