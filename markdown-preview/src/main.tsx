
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MarkdownEditor from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  
    <QueryClientProvider client={queryClient}>
      <MarkdownEditor />
    </QueryClientProvider>
  
);
