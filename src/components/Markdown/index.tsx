import React, { useEffect, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import styles from "./index.module.css";

type IProps = {
  markdownText: string;
};

export const Markdown = (props: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderer = new marked.Renderer();
  renderer.code = (code, language: string) => {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    const highlightedCode = hljs.highlight(validLanguage, code).value;
    return `<div class="${styles.codeWrapper}"><pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre></div>`;
  };

  const markdownText = props.markdownText;
  marked.setOptions({
    renderer,
  });
  const html = marked(markdownText);

  useEffect(() => {
    const addCopyButtons = () => {
      if (containerRef.current) {
        const codeWrappers = containerRef.current.querySelectorAll(
          `.${styles.codeWrapper}`
        );
        codeWrappers.forEach((wrapper) => {
          const copyButton = document.createElement("button");
          copyButton.innerHTML =
            '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>';
          copyButton.className = styles.copyButton;
          copyButton.onclick = () => {
            const codeElement = wrapper.querySelector("code");
            navigator.clipboard
              .writeText(codeElement?.textContent || "")
              .then(() => {
                copyButton.classList.add(styles.copied);
                copyButton.innerHTML =
                  '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>';

                // 添加提示信息
                const tooltip = document.createElement("div");
                tooltip.className = styles.tooltip;
                tooltip.textContent = "复制成功！";
                wrapper.appendChild(tooltip);

                setTimeout(() => {
                  copyButton.classList.remove(styles.copied);
                  copyButton.innerHTML =
                    '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>';
                  wrapper.removeChild(tooltip);
                }, 2000);
              })
              .catch((err) => {
                console.error("Failed to copy: ", err);
              });
          };
          wrapper.appendChild(copyButton);
        });
      }
    };

    addCopyButtons();
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
      className={styles.mark}
    ></div>
  );
};
