import { useEffect, useState } from "react";
import { Notification } from "../types";
import { ViewOperation } from "./view-operations";
import { Sort } from "./view-operations/sort.js";
import { Filter } from "./view-operations/filter.js";
import { NotificationCard } from "../components/notification-card.tsx";
import { NotificationHubApi } from "../api/api.js";
import { formatTimestamp } from "../components/notification-card.tsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export interface ActiveOperations {
  sort: NotificationSort;
  filter: NotificationFilter | undefined;
}

export type NotificationSort = "dateSort" | "typeSort" | "dueDateSort";
export type NotificationFilter =
  | "uncompletedFilter"
  | "messageFilter"
  | "emailFilter"
  | "assignmentFilter"
  | "unreadFilter";

type NotificationOperation = NotificationSort | NotificationFilter;

export const viewOperations: Record<
  NotificationOperation,
  ViewOperation<Notification[]>
> = {
  dateSort: new Sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
  typeSort: new Sort((a, b) => a.category.localeCompare(b.category)),
  dueDateSort: new Sort((a, b) => {
    const aDueDate = a.category === "assignment" ? a.dueDate : undefined;
    const bDueDate = b.category === "assignment" ? b.dueDate : undefined;

    if (!aDueDate && !bDueDate) return 0;
    if (!aDueDate) return 1;
    if (!bDueDate) return -1;

    return aDueDate.getTime() - bDueDate.getTime();
  }),
  uncompletedFilter: new Filter(
    (a) =>
      a.category === "assignment" && a.dueDate.getTime() > new Date().getTime(),
  ),
  messageFilter: new Filter((a) => a.category === "message"),
  emailFilter: new Filter((a) => a.category === "email"),
  assignmentFilter: new Filter((a) => a.category === "assignment"),
  unreadFilter: new Filter((a) => !a.read),
};

interface NotificationsPageProps {
  activeOperations: ActiveOperations;
  api: NotificationHubApi;
}

function applyActiveOperations(
  notifications: Notification[],
  activeOperations: ActiveOperations,
) {
  let out: Notification[] = [];
  if (activeOperations.filter) {
    out = viewOperations[activeOperations.filter].apply(notifications);
  }

  if (activeOperations.sort) {
    out = viewOperations[activeOperations.sort].apply(notifications);
  }
  return out;
}

const queryClient = new QueryClient();

function getInfoFromNotification(notification: Notification): string[] {
  let info: string[] = [];
  switch (notification.category) {
    case "assignment":
      info = [
        notification.class,
        notification.dueDate.getTime() > new Date().getTime()
          ? "Due " + formatTimestamp(notification.dueDate)
          : "Completed " + formatTimestamp(notification.dueDate),
      ];
      break;
    case "message":
      let body = notification.body;

      if (body.length > 25) {
        body = body.slice(0, 25) + "...";
      }

      body = body.replace(/<[^>]*>/g, "");

      info = [notification.sender, body];
  }
  return info;
}

export function NotificationsPage({
  activeOperations,
  api,
}: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: api.getNotifications,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1 className="title">Notifications</h1>
      {applyActiveOperations(data, activeOperations).map((notification) => (
        <NotificationCard
          title={notification.title}
          pluginName=""
          category={notification.category}
          info={getInfoFromNotification(notification)}
          timestamp={notification.timestamp}
          read={notification.read}
        />
      ))}
    </>
  );
}
