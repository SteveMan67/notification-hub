import { dirname } from "node:path";

// Resolve plugins, UI files, and SQLite beside the executable.
process.chdir(dirname(process.execPath));

try {
  const url = "http://127.0.0.1:3000";

  try {
    const opener = Bun.spawn(["cmd.exe", "/c", "start", "", url], {
      stdout: "ignore",
      stderr: "ignore",
    });

    if ((await opener.exited) !== 0) {
      console.warn(`Open ${url} manually.`);
    }
  } catch {
    console.warn(`Open ${url} manually.`);
  }
  await import("./index.ts");

  console.log("Open http://127.0.0.1:3000");
  console.log("Keep this window open. Press Ctrl+C to stop.");
} catch (error) {
  console.error("Notification Hub could not start:", error);
  console.error("Press Enter to close.");
  await Bun.stdin.stream().getReader().read();
  process.exitCode = 1;
}
