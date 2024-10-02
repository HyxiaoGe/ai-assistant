import { AssistantList, EditAssistant } from "@/types";
import assistantStore from "@/utils/assistantStore";
import { ASSISTANT_INIT } from "@/utils/constant";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { NextPage } from "next";
import { AssistantConfig } from "@/components/AssistantConfig";
import Link from "next/link";
import { ActionIcon, Card, Text, Group, Drawer, Badge } from "@mantine/core";
import { IconChevronLeft, IconUserPlus, IconPencil } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";

const showNotification = (message: string) => {
    notifications.show({
        id: "Success",
        title: "Success",
        message,
        color: "green",
        autoClose: 3000,
    })
}

const Assistant: NextPage = () => {
    const [assistantList, setAssistantList] = useState<AssistantList>([]);
    const [editAssistant, setEditAssistant] = useState<EditAssistant>();
    const [opened, drawerHandler] = useDisclosure(false);

    useEffect(() => {
        const list = assistantStore.getList();
        setAssistantList(list);
    }, []);

    const saveAssistant = (data: EditAssistant) => {
        if (data.id) {
            let newAssistantList = assistantStore.updateAssistant(data.id, data);
            setAssistantList(newAssistantList);
        } else {
            const newAssistant = {
                ...data,
                id: Date.now().toString(),
            };
            let newAssistantList = assistantStore.addAssistant(newAssistant);
            setAssistantList(newAssistantList);
        }
        showNotification("保存成功");
        drawerHandler.close();
    };

    const removeAssistant = (id: string) => {
        let newAssistantList = assistantStore.removeAssistant(id);
        setAssistantList(newAssistantList);
        showNotification("删除成功");
        drawerHandler.close();
    }

    const onEditAssistant = (data: EditAssistant) => {
        setEditAssistant(data);
        drawerHandler.open();
    }

    const onAddAssistant = () => {
        const newAssistant = {
            ...ASSISTANT_INIT[0],
            name: `助手 ${assistantList.length + 1} 号`,
        };
        setEditAssistant(newAssistant);
        drawerHandler.open();
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="flex justify-between p-4 shadow-sm">
                <Link href="/">
                    <ActionIcon>
                        <IconChevronLeft />
                    </ActionIcon>
                </Link>
                <Text weight={500} size="lg">
                    助手
                </Text>
                <ActionIcon onClick={() => onAddAssistant()}>
                    <IconUserPlus />
                </ActionIcon>
            </div>
            
            <div className="flex gap-8 flex-wrap p-4 overflow-y-auto">
                {assistantList.map((assistant) => (
                    <Card
                        key={assistant.id}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        className="w-full max-w-sm group transition-all duration-300"
                    >
                        <Text weight={500} className="line-clamp-1">
                            {assistant.name}
                        </Text>
                        <Text size="sm" color="dimmed" className="line-clamp-3 mt-2">
                            {assistant.prompt}
                        </Text>
                        <Group className="mt-4 flex items-center">
                            <Group>
                                <Badge size="md" color="green" radius="sm">
                                    TOKEN: {assistant.max_tokens}
                                </Badge>
                                <Badge size="md" color="blue" radius="sm">
                                    TOKEN: {assistant.temperature}
                                </Badge>
                                <Badge size="md" color="cyan" radius="sm">
                                    TOKEN: {assistant.max_log}
                                </Badge>
                            </Group>
                            <Group className="w-full flex justify-end items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                                <ActionIcon size="sm" onClick={() => onEditAssistant(assistant)}>
                                    <IconPencil />
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Card>
                    ))}
            </div>
            <Drawer size="lg" position="right" opened={opened} onClose={drawerHandler.close}>
                <AssistantConfig assistant={editAssistant!} save={saveAssistant} remove={removeAssistant} />
            </Drawer>
        </div>
    )
}

export default Assistant;