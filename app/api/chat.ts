// Vercel Function: POST /api/chat
// Keeps your Anthropic API key on the server (never in the browser).

const MODEL = "claude-haiku-5-5";
const MAX_MESSAGES = 8;
const MAX_CHARS = 500;

const SYSTEM = `You are the AI assistant on Samar Laajili's portfolio website. Visitors (recruiters, clients) ask about Samar.
Answer ONLY with the facts below. If something is not in the facts, say you don't know and suggest contacting Samar by email.
Never invent facts. Reply in the visitor's language (English, French, Arabic or Tunisian Arabic). Keep answers short and friendly (max 4 sentences).

FACTS
- Samar Laajili: information systems developer and software engineering master's student in Sousse, Tunisia. Passionate about web and mobile development and UI/UX design. Motivated, autonomous, good team player.
- Contact: samarlaajilisl@gmail.com, +216 23 371 646, Hay Riath, Sousse. GitHub/LinkedIn/Behance: laajilisamar.
- Education: Master in Software Engineering & Rapid Application Development, ISET Sousse (2025-present); Bachelor in Information Technology (Information Systems Development), ISET Sousse (2020-2024); Baccalaureate in Economics & Management, Lycee Abdelaziz Belkhodja, Kelibia (2020).
- Experience: Science teacher at Way To Success and Enfant Intelligent academies (Oct 2025-Mar 2026); freelance software engineer and remote instructor (Nov 2024); graduation internship at Sweet Touch building the Iqraa e-learning platform with PHP/Laravel/MySQL (Feb-Jun 2024); internship at Designet Web Agency building Vibracom with Laravel (Jul-Sep 2023); advanced internship at Bus Software building an after-sales service web app with PHP and MongoDB (Jan-Feb 2022); election operations volunteer at ISIE Nabeul (Jan-Feb 2022).
- Skills: Python, JavaScript (React), HTML/CSS, SQL, MySQL, MongoDB; Laravel, Spring Boot, Flutter, Angular, WordPress; Figma, Canva, Linux, Notion, VS Code, Android Studio, Xampp, Postman, GitHub, IntelliJ IDEA; Word, PowerPoint, Excel.
- UI/UX designs (Figma): Power-Up (sports and workout mobile app), Fashion Store (boys' fashion e-commerce website), Book Store.
- Workshops: IoT at EPI Sousse (25 April 2026); DevOps & Cloud at Job Gate Sousse (3 Nov 2024).
- Languages: Arabic (native), French (intermediate), English (intermediate).
- Interests: UI/UX design, drawing and Arabic calligraphy, intellectual games, teamwork, fast learning.
- CV: downloadable in French and English from the top of the page.`;

type Message = { role: "user" | "assistant"; content: string };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const clean = (input: unknown): Message[] => {
  if (!Array.isArray(input)) return [];
  const messages = input
    .filter(
      (m): m is Message =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim() !== "",
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  while (messages.length > 0 && messages[0].role !== "user") messages.shift(); // must start with the visitor
  return messages;
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: "Server is missing ANTHROPIC_API_KEY" }, 500);

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const messages = clean(body.messages);
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return json({ error: "No question" }, 400);
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM, messages }),
  });

  if (!upstream.ok) return json({ error: "AI unavailable" }, 502);

  const data = (await upstream.json()) as { content?: { type: string; text?: string }[] };
  const reply = (data.content ?? [])
    .filter((block) => block.type === "text" && block.text)
    .map((block) => block.text)
    .join("\n")
    .trim();

  return reply ? json({ reply }) : json({ error: "Empty reply" }, 502);
}