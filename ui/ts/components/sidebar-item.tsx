export interface sidebarItemProps {
  text: string;
  selected?: boolean;
  notifications?: number;
  onclick(): void;
}

export function SidebarItem({
  text,
  selected = false,
  notifications = 0,
  onclick,
}: sidebarItemProps) {
  return (
    <div
      className={`sidebar-item ${selected ? "selected" : ""}`}
      onClick={onclick}
    >
      <span className="text">{text}</span>
      <span className="notifications">
        {notifications > 1 ? notifications : ""}
      </span>
    </div>
  );
}
