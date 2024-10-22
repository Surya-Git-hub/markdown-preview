import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

// Define the interface for the conversion result
interface ConvertResponse {
  html: string;
}

const convertMarkdownToHtml = async (
  markdown: string
): Promise<ConvertResponse> => {
  const response = await axios.post<ConvertResponse>(
    "http://localhost:5000/api/convert",
    { text: markdown }
  );
  return response.data;
};

const MarkdownEditor: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");

  const [debouncedMarkdownText] = useDebounce(markdownText, 500);


  const {
    mutate: fetchHtml,
    isPending,
    isError,
  } = useMutation<ConvertResponse, Error, string>({
    mutationFn: (markdown: string) => convertMarkdownToHtml(markdown),
    onSuccess: (data) => {
      setHtmlContent(data.html);
    },
    onError: (error) => {
      console.error("Error converting markdown:", error);
    },
  });

  useEffect(() => {
    if (debouncedMarkdownText) {
      fetchHtml(debouncedMarkdownText);
    }
  }, [debouncedMarkdownText]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Markdown Preview App
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          flex: 1,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "auto",
          }}
        >
          <CodeMirror
            value={markdownText}
            height="100%"
            width="100%"
            theme={vscodeDark}
            maxWidth="50svw"
            extensions={[langs.markdown()]}
            onChange={(value) => setMarkdownText(value)}
            style={{
              flexGrow: 1,
              overflow: "hidden",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "20px",
            flexGrow: 1,
            height: "100%",
            boxSizing: "border-box",
            overflow: "auto",
            backgroundColor: "#1e1e1e",
          }}
        >
          {isPending ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching HTML</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;

