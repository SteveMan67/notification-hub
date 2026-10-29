export function formatTimestamp(date: Date): string {
  const now = new Date();

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateDay = new Date(date);
  dateDay.setHours(0, 0, 0, 0);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (dateDay.getTime() === today.getTime()) {
    return time;
  }

  if (dateDay.getTime() === yesterday.getTime()) {
    return `Yesterday, ${time}`;
  }

  const daysAgo = Math.floor(
    (today.getTime() - dateDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysAgo >= 0 && daysAgo < 7) {
    return `${date.toLocaleDateString([], {
      weekday: "long",
    })}, ${time}`;
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

interface NotificationCardProps {
  title: string;
  pluginName: string;
  category: string;
  info: string[];
  timestamp: Date;
  read: boolean;
}

function NotificationCard({
  title,
  pluginName,
  category,
  info,
  timestamp,
  read,
}: NotificationCardProps) {
  <div className={`notification-card ${read ? "read" : ""}`}>
    <div className="info">
      <div className="top">
        <p className="notification-category">{category}</p>
        <p className="plugin-name">{pluginName}</p>
      </div>
      <div className="main">
        <p className="notification-title">{title}</p>
      </div>
      <div className="info-container">
        <p className="assignment-info">{info.join(" · ")}</p>
      </div>
    </div>
    <p className="timestamp">{formatTimestamp(timestamp)}</p>
  </div>;
}
