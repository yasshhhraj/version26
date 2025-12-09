import events from "./events.json";
export async function GET() {
    return new Response(JSON.stringify(events), {headers: {'Content-Type': 'application/json'}});
}