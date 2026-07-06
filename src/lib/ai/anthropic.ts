import Anthropic from "@anthropic-ai/sdk";

/**
 * Modelo padrão. Mantido igual ao que a plataforma EU-Mercosul já usa em
 * produção com a chave atual. Pode ser promovido a um modelo mais novo.
 */
export const AI_MODEL = "claude-sonnet-4-6";

/** Versão dos prompts — gravada em cada Match para rastreabilidade/auditoria. */
export const PROMPT_VERSION = "tb-2026-07-01";

let client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export function isAIConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/**
 * Chamada com SAÍDA ESTRUTURADA via tool_use (JSON validado no nível da API).
 * Não usamos prefill de assistant — modelos Claude 4.5+ rejeitam prefill (400).
 *
 * @param system  Instrução de sistema (papel).
 * @param prompt  Conteúdo do usuário.
 * @param toolName Nome da ferramenta (semântico).
 * @param schema  JSON Schema do input da ferramenta = formato de saída desejado.
 */
export async function structuredCall<T>(opts: {
  system: string;
  prompt: string;
  toolName: string;
  toolDescription: string;
  schema: Record<string, unknown>;
  maxTokens?: number;
}): Promise<T> {
  const anthropic = getAnthropic();

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: opts.maxTokens ?? 1024,
    temperature: 0,
    system: opts.system,
    tools: [
      {
        name: opts.toolName,
        description: opts.toolDescription,
        input_schema: opts.schema as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: opts.toolName },
    messages: [{ role: "user", content: opts.prompt }],
  });

  const toolUse = response.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Resposta da IA não retornou tool_use estruturado.");
  }
  return toolUse.input as T;
}
