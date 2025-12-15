import {NextRequest} from "next/server";
import {promises as fs} from "fs";
import path from "path";

type RegistrationRecord = {
  eventTitle?: string | null;
  teammates?: string[];
  createdAt: string; // ISO string
  ip?: string | null;
  userAgent?: string | null;
};

const registrationsFile = path.join(process.cwd(), "app", "api", "events", "registrations.json");
// Ensure Node.js runtime so we can use the filesystem
export const runtime = 'nodejs';

async function readRegistrations(): Promise<RegistrationRecord[]> {
  try {
    const data = await fs.readFile(registrationsFile, "utf8");
    return JSON.parse(data);
  } catch (err: any) {
    if (err && (err.code === "ENOENT" || err.code === "EISDIR")) {
      // If file doesn't exist, start with empty array
      return [];
    }
    throw err;
  }
}

async function writeRegistrations(list: RegistrationRecord[]) {
  // Ensure directory exists (it does in repo), just write prettified JSON
  const json = JSON.stringify(list, null, 2);
  await fs.writeFile(registrationsFile, json, "utf8");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { eventTitle = null, teammates } = body || {};

    // Basic normalization
    const cleanedTeammates: string[] | undefined = Array.isArray(teammates)
      ? teammates.filter((e) => typeof e === "string" && e.trim() !== "")
      : undefined;

    const record: RegistrationRecord = {
      eventTitle,
      teammates: cleanedTeammates,
      createdAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? req.ip ?? null,
      userAgent: req.headers.get("user-agent"),
    };

    const list = await readRegistrations();
    list.push(record);
    await writeRegistrations(list);

    return new Response(
      JSON.stringify({ success: true, count: list.length }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to register" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
