import React from "react";
import Cover from "./Cover";
import ProgressBar from "../components/ProgressBar";
import SyntaxHighlighter from "react-syntax-highlighter";
import { FiCopy } from "react-icons/fi";
import { toast, useToast } from "@chakra-ui/react";

function Post({ cover, title, content }) {
  const toast = useToast();

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // map the json content to the markdown
  const renderedContent = content?.map((c, i) => {
    let renderedItems;
    const { primary } = c;
    if (c.slice_type === "text") {
      const { text } = primary;
      renderedItems = text.map((t, i) => {
        const { spans } = t;
        const key = t.text;
        switch (t.type) {
          case "paragraph":
            if (spans.length > 0) {
              return (
                <div key={i}>
                  <a
                    href={spans[0].data.url}
                    className="underline hover:text-gray-600"
                  >
                    {t.text}
                  </a>
                </div>
              );
            }
            return (
              <p key={key} className="text-xl xl:text-2xl leading-10">
                {t.text}
              </p>
            );
          case "heading2":
            return (
              <h2 key={key} className="my-9 text-3xl xl:text-4xl">
                {t.text}
              </h2>
            );
          case "heading3":
            // return <h3 className="my-9 text-xl font-bold xl:text-4xl">{t.text}</h3>;
            return (
              <h3 className="my-9 font-bold text-2xl xl:text-3xl">{t.text}</h3>
            );
          case "heading4":
            return (
              <h4 className="my-9 text-lg font-bold text-xl xl:text-2xl">
                {t.text}
              </h4>
            );
          case "heading5":
            return (
              <h5 key={key} className="my-9 font-bold text-lg xl:text-xl">
                {t.text}
              </h5>
            );
        }
      });
    } else if (c.slice_type === "image") {
      const { image } = primary;
      const { url, alt } = image;
      const key = url;
      renderedItems = (
        <img className="block w-96 my-6" key={key} src={url} alt={alt} />
      );
    } else if (c.slice_type === "code") {
      function handleCopySnippet() {
        try {
          copyTextToClipboard(codeSnippet).then(() => {
            toast({
              position: "top",
              title: "Copied",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          });
        } catch (e) {
          toast({
            title: "Something went wrong",
            status: "failed",
            duration: 2000,
            isClosable: true,
          });
        }
      }
      const { code } = primary;
      const codeSnippet = code
        .map(({ text }) => {
          const key = text;
          return text;
        })
        .join("\n");
      renderedItems = (
        <div key={i} className="relative">
          <button
            onClick={handleCopySnippet}
            className="absolute top-12 right-8 bg-gray-800 hover:bg-gray-600 active:bg-gray-600 active:outline-none focus:outline-none focus:bg-gray-600 p-3 md:p-4 rounded-xl"
          >
            <FiCopy className="text-lg sm:text-2xl" />
          </button>
          <SyntaxHighlighter
            language="javascript"
            className="text-xl my-6 p-8 rounded-xl leading-10"
            customStyle={{
              direction: "ltr",
              background: "rgba(11, 14, 22)",
              color: "#cc640a",
            }}
            showLineNumbers={true}
            lineNumberStyle={{ color: "#c9c7c5", paddingRight: "3rem" }}
          >
            {codeSnippet}
          </SyntaxHighlighter>
        </div>
      );
    } else if (c.slice_type === "orderedlist") {
      const { orderedlist } = primary;
      renderedItems = (
        <ol key={i} className="list-decimal ms-8">
          {orderedlist.map(({ text, type }) => {
            if (type !== "o-list-item") {
              return;
            }
            const key = text;
            return (
              <li key={key} className="leading-10">
                {text}
              </li>
            );
          })}
        </ol>
      );
    } else if (c.slice_type === "unorderedlist") {
      const { unorderedlist } = primary;
      renderedItems = (
        <ul key={i} className="list-disc ms-8">
          {unorderedlist.map(({ text, type }) => {
            if (type !== "list-item") {
              return;
            }
            const key = text;
            return (
              <li key={key} className="leading-10">
                {text}
              </li>
            );
          })}
        </ul>
      );
    }
    return <div className="flex flex-col gap-4">{renderedItems}</div>;
  });
  return (
    <article className="w-full p-8 xl:w-lggg">
      <ProgressBar />
      {/* {cover?.url && <Cover src={cover.url} alt={cover.alt} />} */}
      <h1 className="text-5xl xl:text-6xl font-bold mb-8 mt-10 xl:mt-14">
        {title[0].text}
      </h1>
      <div className="text-gray-200 text-lg leading-10">{renderedContent}</div>
    </article>
  );
}

export default Post;
