import React, {useState, useEffect} from "react";
import { Select } from "@mantine/core";
import { Assistant, AssistantList } from "@/types";
import assistantStore from "@/utils/assistantStore";

type Props = {
    value: string;
    loading?: boolean;
    onChange: (value: Assistant) => void;
};

export const AssistantSelect = ({ value, loading, onChange }: Props) => {

    const [list, setList] = useState<AssistantList>([]);
    useEffect(() => {
        const store = assistantStore.getList();
        setList(store);
    }, []);

    const onAssistantChange = (value: string) => {
        const assistant = list.find((item) => item.id === value);
        if (assistant) {
            onChange(assistant);
        }
    };

    return (
        <Select
            className="w-32 mx-2"
            size="sm"
            placeholder="选择助理"
            onChange={onAssistantChange}
            value={value}
            disabled={loading}
            data={list.map((item) => ({
                value: item.id,
                label: item.name,
            }))}
        >
        </Select>
    );
};