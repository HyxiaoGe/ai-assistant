import { useState } from "react";
import { getCompletion } from "../../utils/getCompletion";
import { Textarea, Button } from "@mantine/core";

export const Chat = () => {
  const [prompt, setPrompt] = useState("");

  const [completion, setCompletion] = useState<string>("");

  const getAIResp = async () => {
    const resp = await getCompletion({
      prompt: prompt,
    });
    setCompletion(resp.choices[0].message.content);
  };

  return (
    <div className="flex items-center h-screen">
      <div>{completion}</div>
      <div className="flex items-center w-3/5">
        <Textarea
          placeholder="Enter your prompt here"
          className="w-full"
          value={prompt}
          onChange={(evt) => setPrompt(evt.target.value)}
        ></Textarea>
        <Button onClick={() => getAIResp()}>Send</Button>
      </div>
    </div>
  );
};
