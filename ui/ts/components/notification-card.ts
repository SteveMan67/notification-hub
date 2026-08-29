import { Component } from "./component.js";

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

  if (daysAgo < 7) {
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
}

export class NotificationCard extends Component<NotificationCardProps> {
  declare title: string;
  declare pluginName: string;
  declare category: string;
  declare info: string[];
  declare timestamp: Date;

  constructor() {
    super({
      title: "",
      pluginName: "",
      category: "",
      info: [],
      timestamp: new Date(),
    });
  }

  connectedCallback() {
    this.render();
    this.update();
  }

  private render() {
    this.innerHTML = `
    <div class="notification-card">
      <div class="info">
        <div class="top">
          <p class="notification-category"></p>
          <p class="plugin-name"></p>
        </div>
        <div class="main">
          <p class="notification-title"></p>
        </div>
        <div class="info-container"></div>
      </div>
      <p class="timestamp"></p>
    </div>
    `;
  }

  protected update() {
    const item = this.querySelector(".notification-card");

    if (!item) return;

    const title = item.querySelector(".notification-title");
    const category = item.querySelector(".notification-category");
    const pluginName = item.querySelector(".plugin-name");
    const infoContainer = item.querySelector(".info-container");
    const timestamp = item.querySelector(".timestamp");

    if (title) {
      title.textContent = this.title;
    }

    if (category) {
      category.textContent = this.category;
    }

    if (pluginName) {
      pluginName.textContent = this.pluginName;
    }

    if (timestamp) {
      timestamp.textContent = formatTimestamp(this.timestamp);
    }

    if (!infoContainer) return;

    infoContainer.innerHTML = "";

    for (let i = 0; i < this.info.length; i++) {
      const item = this.info[i];
      const p = document.createElement("p");
      p.classList.add("assignment-info");

      p.innerHTML = item;

      infoContainer.appendChild(p);

      if (i + 1 !== this.info.length) {
        const spacer = document.createElement("p");
        spacer.innerText = "·";

        if (infoContainer) {
          infoContainer.appendChild(spacer);
        }
      }
    }
  }
}

customElements.define("notification-card", NotificationCard);

declare global {
  interface HTMLElementTagNameMap {
    "notification-card": NotificationCard;
  }
}
