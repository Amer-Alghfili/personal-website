import React from "react";
import Cover from "./Cover";
import ProgressBar from "../components/ProgressBar";

function Post({ cover, title, content }) {
  // map the json content to the markdown
  const renderedContent = content?.map((c) => {
    let renderedItems;
    const { primary } = c;
    if (c.slice_type === "text") {
      const { text } = primary;
      renderedItems = text.map((t) => {
        const { spans } = t;
        const key = t.text;
        switch (t.type) {
          case "paragraph":
            if (spans.length > 0) {
              return (
                <div>
                  <a
                    href={spans[0].data.url}
                    className="underline hover:text-gray-600"
                  >
                    {t.text}
                  </a>
                </div>
              );
            }
            return <p key={key}>{t.text}</p>;
          case "list-item":
            return <div className="ms-8">&nbsp;{t.text}</div>;
          case "o-list-item":
            return <div className="ms-8">&nbsp;{t.text}</div>;
          case "heading2":
            return (
              <h2 key={key} className="my-9 text-2xl xl:text-4xl">
                {t.text}
              </h2>
            );
          case "heading3":
            return <h3 className="my-9 text-xl xl:text-3xl">{t.text}</h3>;
          case "heading4":
            return <h4 className="my-9 text-lg xl:text-2xl">{t.text}</h4>;
          case "heading5":
            return (
              <h5 key={key} className="my-9 text-md xl:text-xl">
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
    }
    return <div key={title[0].text}>{renderedItems}</div>;
  });
  return (
    <article className="w-full p-8 xl:w-lggg">
      <ProgressBar />
      {/* {cover?.url && <Cover src={cover.url} alt={cover.alt} />} */}
      <h1 className="text-3xl xl:text-6xl  font-bold mb-8 mt-10 xl:mt-14">
        {title[0].text}
      </h1>
      <div className="text-gray-200  text-lg leading-10">{renderedContent}</div>
    </article>
  );
}

export default Post;
