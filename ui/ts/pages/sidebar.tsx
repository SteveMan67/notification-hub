import type { PageName } from "../main.tsx";
import { SidebarItem } from "../components/sidebar-item";
import type {
  NotificationSort,
  NotificationFilter,
  ActiveOperations,
} from "./notifications.tsx";

export type SortType = NotificationSort;
export type FilterType = NotificationFilter | undefined;

type sidebarProps = {
  page: PageName;
  filters?: FilterType[];
  setPage(page: PageName): void;
  activeOperations: ActiveOperations;
  setActiveOperations(activeOperations: ActiveOperations): void;
};

const filterNames: Record<NonNullable<FilterType>, string> = {
  assignmentFilter: "Assignments",
  emailFilter: "Emails",
  messageFilter: "Messages",
  unreadFilter: "Unread",
  uncompletedFilter: "Uncompleted",
};

export function Sidebar({
  page,
  filters = [],
  setPage,
  activeOperations,
  setActiveOperations,
}: sidebarProps) {
  return (
    <aside className="sidebar">
      <div className="category-list">
        <SidebarItem
          text="Overview"
          onclick={() => {
            setPage("notifications");
            setActiveOperations({
              ...activeOperations,
              filter: undefined,
            });
          }}
        ></SidebarItem>
        {filters.map((filter) => {
          return (
            <SidebarItem
              text={filter ? filterNames[filter] : ""}
              onclick={() => {
                setPage("notifications");
                setActiveOperations({
                  ...activeOperations,
                  filter: filter,
                });
              }}
            ></SidebarItem>
          );
        })}
      </div>

      <div className="settings-list">
        <SidebarItem text="Settings" onclick={() => {}}></SidebarItem>
      </div>
    </aside>
  );
}
