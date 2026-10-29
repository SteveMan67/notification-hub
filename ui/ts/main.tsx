import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="grid">
      <aside className="sidebar">
        <div className="category-list"></div>
      </aside>
      <main className="main-content">
        <h1 className="title">Notifications</h1>
        <p>React is running!</p>
      </main>
    </div>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element not defined");
}

createRoot(root).render(<App />);
