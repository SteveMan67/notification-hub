export interface sidebarItemProps {
  text: string;
  selected: boolean;
  notifications: number;
  onclick(): void;
}

export function SidebarItem({
  text,
  selected,
  notifications,
  onclick,
}: sidebarItemProps) {
  return (
    <div
      className={`sidebar-item ${selected ? "selected" : ""}`}
      onClick={onclick}
    >
      <span className="text">{text}</span>
      <span className="notifications">{notifications}</span>
    </div>
  );
}
