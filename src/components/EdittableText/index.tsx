import React, { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  text: string;
  onSave: (name: string) => void;
};

export const EdittableText = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);
  const originalText = useRef(props.text);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const saveText = useCallback(() => {
    if (text.trim() !== "") {
      setIsEditing(false);
      props.onSave(text);
      originalText.current = text;
    } else {
      setText(originalText.current);
      setIsEditing(false);
      toast.error("Tab名称不能为空，请重新设置！！！", {
        duration: 3000,
        position: "top-center",
      });
    }
  }, [text, props]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveText();
    } else if (e.key === "Escape") {
      setText(originalText.current);
      setIsEditing(false);
    }
  };

  const onBlur = () => {
    // 如果触发失焦事件，将初始化状态和原始数据
    if (isEditing) {
      saveText();
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          className={clsx([
            "w-[10rem]",
            "flex",
            "items-center",
            "h-[2rem]",
            "outline-none",
            "border-0",
          ])}
          type="text"
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          autoFocus
        />
      ) : (
        <div
          className={clsx([
            "leading-9",
            "w-[10rem]",
            "h-[2rem]",
            "overflow-hidden",
            "text-ellipsis",
            "white-space-nowrap",
          ])}
          onDoubleClick={() => setIsEditing(true)}
        >
          {text}
        </div>
      )}
      <Toaster />
    </>
  );
};
