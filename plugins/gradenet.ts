import type { Plugin, Notification } from "../types/index.ts";
import { definePlugin } from "../sdk/plugin.ts";
import { password } from "bun";
import type { PluginContext } from "../sdk/context.ts";

let sessionId: string = "";

interface ApiResponse {
  data: {
    assignment_id: string;
    name: string;
    due_date: string;
    assignment_description: string;
    class_name: string;
    due_time: string;
    css_class: string;
  }[];
}

interface MessageResponse {
  data: {
    id: string;
    msg_subject: string;
    msg: string;
    sender_name: string;
    created_at: string;
    is_read: boolean;
  }[];
}

async function login(ctx: PluginContext) {
  const uid = ctx.settings.get("uid");
  const password = ctx.settings.get("password");

  if (!uid || !password) {
    ctx.logger.warn("Failed to login, no credentials set.");
    return;
  }

  const response = await fetch(
    "https://aca.gradenet.net/api/v1/session/login",
    {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:153.0) Gecko/20100101 Firefox/153.0",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/json",
        Referer: "https://aca.gradenet.net/login",
        Origin: "https://aca.gradenet.net",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Priority: "u=0",
      },
      body: JSON.stringify({
        uid: "460-10-1361",
        password: process.env.GRADENET_PASSWORD,
      }),
    },
  );

  sessionId = response.headers.get("set-cookie")?.split(";")[0] as string;

  return;
}

export default definePlugin({
  id: "gradenet",
  name: "GradeNet",
  version: "1.0",

  settings: {
    uid: {
      type: "text",
      label: "Student Id",
      required: true,
    },
    password: {
      type: "password",
      label: "Password",
      required: true,
    },
  },

  async initialize(ctx) {
    await login(ctx);
    return;
  },

  async getNotifications(ctx): Promise<Notification[]> {
    const assignmentResponse = await fetch(
      "https://aca.gradenet.net/api/v1/student-records/assignments?uid=460101361",
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:153.0) Gecko/20100101 Firefox/153.0",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/json",
          Referer: "https://aca.gradenet.net/login",
          Origin: "https://aca.gradenet.net",
          "Sec-GPC": "1",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Priority: "u=0",
          Cookie: sessionId,
        },
      },
    );

    const messagingResponses = await fetch(
      "https://aca.gradenet.net/api/v1/messaging/inbox",
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:153.0) Gecko/20100101 Firefox/153.0",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/json",
          Referer: "https://aca.gradenet.net/login",
          Origin: "https://aca.gradenet.net",
          "Sec-GPC": "1",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          Priority: "u=0",
          Cookie: sessionId,
        },
      },
    );

    const assignments: ApiResponse =
      (await assignmentResponse.json()) as ApiResponse;

    if (assignmentResponse.ok) {
      await login(ctx);
    }

    const messages: MessageResponse =
      (await messagingResponses.json()) as MessageResponse;

    let notifications = [];

    if (!assignments || !messages) {
      return [];
    }

    for (const assignment of assignments.data) {
      const notification: Notification = {
        sourceNotificationId: assignment.assignment_id,
        title: assignment.name,
        body: assignment.assignment_description,
        timestamp: new Date(),
        dueDate: new Date(`${assignment.due_date}T${assignment.due_time}`),
        read: false,
        class: assignment.class_name,
        sourceId: "gradenet",
        category: "assignment",
        link: `https://aca.gradenet.net/student-records/assignment/${assignment.assignment_id}`,
      };

      notifications.push(notification);
    }

    for (const message of messages.data) {
      const notification: Notification = {
        sourceNotificationId: message.id,
        title: message.msg_subject,
        body: message.msg,
        timestamp: new Date(message.created_at),
        read: message.is_read,
        sourceId: "gradenet",
        category: "message",
        sender: message.sender_name,
        link: `https://aca.gradenet.net/messaging/inbox/${message.id}`,
      };

      notifications.push(notification);
    }

    return notifications;
  },
});
