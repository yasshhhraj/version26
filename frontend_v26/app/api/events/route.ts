import * as fs from "node:fs";
import {join} from "pathe";

export async function GET() {

    const path = join(process.cwd(), 'events.json');
    const data = fs.readFileSync(path, "utf-8");
    const events = JSON.parse(data);
    return new Response(JSON.stringify(events), {headers: {'Content-Type': 'application/json'}});
}