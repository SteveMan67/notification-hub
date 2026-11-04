import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ActiveOperations, NotificationsPage } from "./pages/notifications";
import { api } from "./api/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./pages/sidebar";

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
        <Sidebar
          page={page}
          setPage={setPage}
          filters={[
            "messageFilter",
            "emailFilter",
            "assignmentFilter",
            "unreadFilter",
          ]}
          activeOperations={activeOperations}
          setActiveOperations={setActiveOperations}
        ></Sidebar>
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
