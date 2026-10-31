import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ActiveOperations, NotificationsPage } from "./pages/notifications.tsx";
import { api } from "./api/api.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type PageName = "notifications" | "plugins" | "plugin";

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState<PageName>("notifications");
  const [activeOperations, setActiveOperations] = useState<ActiveOperations>({
    sort: "dateSort",
    filter: undefined,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid">
        <aside className="sidebar">
          <div className="category-list"></div>
        </aside>
        <main className="main-content">
          {page === "notifications" && (
            <NotificationsPage api={api} activeOperations={activeOperations} />
          )}
        </main>
      </div>
    </QueryClientProvider>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element not defined");
}

createRoot(root).render(<App />);
