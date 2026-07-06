/**
 * Dicionário PT/EN — porta 1:1 das strings do design "AHK Talent Bridge"
 * (Claude Design) e serve como fonte única de conteúdo da interface.
 */

export const LANGS = ["pt", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "pt";

export function isLang(v: unknown): v is Lang {
  return typeof v === "string" && (LANGS as readonly string[]).includes(v);
}

export type FieldKind = "text" | "select" | "area";
export interface FormField {
  name: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface Dictionary {
  nav: { how: string; jobs: string; ai: string; gov: string };
  cta: { company: string; talent: string };
  hero: {
    badge: string;
    title: string;
    sub: string;
    ctaCompany: string;
    ctaTalent: string;
    stats: { members: string; since: string; culture: string };
    cardLabel: string;
    cardLive: string;
    talent: string;
    company: string;
    matchName: string;
    matchNote: string;
  };
  trustStrip: string;
  how: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { num: string; title: string; desc: string }[];
  };
  jobs: { eyebrow: string; title: string; count: string; fit: string; details: string };
  diff: {
    eyebrow: string;
    title: string;
    sub: string;
    items: { icon: string; bg: string; title: string; desc: string }[];
  };
  ai: {
    eyebrow: string;
    title: string;
    sub: string;
    panelLabel: string;
    panelName: string;
    score: string;
    summaryLabel: string;
    summary: string;
    functions: { h: string; d: string }[];
    principles: string[];
    scoreBreakdown: { label: string; val: string; pct: string }[];
  };
  gov: {
    badge: string;
    title: string;
    sub: string;
    principles: { title: string; desc: string }[];
  };
  final: { title: string; sub: string };
  footer: {
    about: string;
    col1: string;
    col2: string;
    col3: string;
    pricing: string;
    privacy: string;
    terms: string;
    ai: string;
    legal: string;
    compliance: string;
  };
  vaga: {
    back: string;
    profile: string;
    yourFit: string;
    apply: string;
    applyNote: string;
  };
  company: {
    eyebrow: string;
    title: string;
    sub: string;
    trust: string;
    consent: string;
    submit: string;
    doneTitle: string;
    done: string;
    benefits: { h: string; d: string }[];
    fields: FormField[];
  };
  talent: {
    eyebrow: string;
    title: string;
    sub: string;
    trust: string;
    consentDataLabel: string;
    consentData: string;
    consentComms: string;
    submit: string;
    doneTitle: string;
    done: string;
    benefits: { h: string; d: string }[];
    fields: FormField[];
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    aiTitle: string;
    updated: string;
    /** Blocos de conteúdo (heading + parágrafos) para páginas jurídicas */
    privacy: { h: string; p: string[] }[];
    terms: { h: string; p: string[] }[];
    aiUse: { h: string; p: string[] }[];
  };
  common: { formError: string; submitting: string };
}

export const dict: Record<Lang, Dictionary> = {
  pt: {
    nav: { how: "Como funciona", jobs: "Vagas", ai: "Inteligência Artificial", gov: "Governança" },
    cta: { company: "Sou empresa", talent: "Sou candidato" },
    hero: {
      badge: "Bolsa de empregos oficial da AHK",
      title: "Conectando talentos e empresas alemãs no Brasil",
      sub: "A bolsa de empregos oficial da Câmara Brasil-Alemanha para profissionais com perfil internacional — curadoria institucional apoiada por inteligência artificial.",
      ctaCompany: "Publicar uma vaga",
      ctaTalent: "Entrar no talent pool",
      stats: {
        members: "empresas associadas",
        since: "representando a economia alemã",
        culture: "fit cultural DACH",
      },
      cardLabel: "Matching AHK + IA",
      cardLive: "ao vivo",
      talent: "Talento",
      company: "Empresa",
      matchName: "Perfil sênior · Alemão avançado",
      matchNote: "Score de aderência explicável — sem decisão automatizada final.",
    },
    trustStrip:
      "Serviço institucional exclusivo para empresas associadas · Conforme LGPD e GDPR",
    how: {
      eyebrow: "Simples e sem fricção",
      title: "Como funciona",
      sub: "Três passos, zero complexidade para o usuário final. A AHK cuida da curadoria e do compliance.",
      steps: [
        {
          num: "1",
          title: "A empresa publica a vaga",
          desc: "Empresa associada preenche um formulário simples. A IA padroniza a descrição automaticamente.",
        },
        {
          num: "2",
          title: "Talentos se cadastram",
          desc: "Profissionais entram no talent pool com consentimento explícito e onboarding guiado.",
        },
        {
          num: "3",
          title: "AHK + IA fazem o matching",
          desc: "A IA gera um score explicável; a AHK faz a curadoria e envia a shortlist ao RH.",
        },
      ],
    },
    jobs: {
      eyebrow: "Oportunidades",
      title: "Vagas abertas",
      count: "Atualizado semanalmente",
      fit: "Aderência",
      details: "Ver detalhes",
    },
    diff: {
      eyebrow: "Por que a AHK",
      title: "O diferencial estratégico",
      sub: "A AHK não vira um headhunter. Ela vira a curadora confiável de talentos do ecossistema Alemanha–Brasil.",
      items: [
        {
          icon: "🏛️",
          bg: "#EAF1FA",
          title: "Curadoria institucional",
          desc: "O selo de confiança da AHK, representando a economia alemã no Brasil desde 1916.",
        },
        {
          icon: "🌐",
          bg: "#E8F6F0",
          title: "Foco Alemanha–Brasil",
          desc: "Talentos bilíngues, com experiência internacional e fit cultural DACH.",
        },
        {
          icon: "⚡",
          bg: "#EAF6FC",
          title: "Matching inteligente",
          desc: "IA para padronização, score de aderência e resumos executivos objetivos.",
        },
        {
          icon: "🔐",
          bg: "#FBF3E6",
          title: "Governança de dados",
          desc: "LGPD e GDPR by design: consentimento, minimização e transparência.",
        },
      ],
    },
    ai: {
      eyebrow: "Inteligência Artificial",
      title: "A IA escala a curadoria — não substitui o humano",
      sub: "Usada como apoio à decisão, com critérios transparentes e score explicável. Nenhuma decisão exclusivamente automatizada.",
      panelLabel: "Análise de compatibilidade",
      panelName: "Vaga × Candidato",
      score: "aderência",
      summaryLabel: "Resumo executivo",
      summary:
        "Profissional sênior, alemão avançado, 6 anos em multinacional alemã. Forte aderência cultural. Gap técnico leve em SAP.",
      functions: [
        { h: "Padronização", d: "vagas e perfis estruturados a partir de textos livres." },
        { h: "Matching", d: "score de 0 a 100 com justificativa curta." },
        { h: "Resumo executivo", d: "perfil objetivo para o RH em segundos." },
        { h: "Gaps e riscos", d: "identificação transparente de lacunas." },
        { h: "Redução de viés", d: "critérios objetivos e auditáveis." },
      ],
      principles: ["Apoio à decisão", "Sem decisão automatizada final", "Critérios transparentes"],
      scoreBreakdown: [
        { label: "Idioma (alemão / inglês)", val: "96%", pct: "96%" },
        { label: "Senioridade", val: "92%", pct: "92%" },
        { label: "Experiência internacional", val: "95%", pct: "95%" },
        { label: "Fit cultural DACH", val: "90%", pct: "90%" },
      ],
    },
    gov: {
      badge: "Compliance by design",
      title: "Governança de dados desde o dia 1",
      sub: "LGPD e GDPR respeitados integralmente. Consentimento explícito, finalidade clara e exclusão a qualquer momento.",
      principles: [
        {
          title: "Consentimento explícito",
          desc: "Opt-in claro no cadastro, separado do aceite de comunicações.",
        },
        { title: "Finalidade clara", desc: "Dados usados apenas para intermediação profissional." },
        { title: "Minimização de dados", desc: "Coletamos somente o essencial ao matching." },
        { title: "Direito de exclusão", desc: "Exclusão total do perfil a qualquer momento." },
        { title: "Transparência da IA", desc: "A IA é apoio; sem profiling abusivo ou dados sensíveis." },
        {
          title: "Acesso restrito",
          desc: "Dados armazenados de forma estruturada, com logs de acesso.",
        },
      ],
    },
    final: {
      title: "Pronto para encontrar o match certo?",
      sub: "Empresas associadas publicam vagas gratuitamente na fase piloto. Talentos entram no pool sem custo.",
    },
    footer: {
      about:
        "Bolsa de empregos oficial da Câmara Brasil-Alemanha, conectando talentos com perfil internacional a empresas alemãs e multinacionais.",
      col1: "Para empresas",
      col2: "Para talentos",
      col3: "Legal & dados",
      pricing: "Planos e matching",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
      ai: "Uso de IA",
      legal:
        "© 2026 Câmara Brasil-Alemanha (AHK São Paulo). Logo aplicado conforme manual de identidade.",
      compliance: "Conforme LGPD (Brasil) e GDPR (UE)",
    },
    vaga: {
      back: "Voltar para vagas",
      profile: "Perfil ideal",
      yourFit: "Sua aderência estimada",
      apply: "Candidatar-me a esta vaga",
      applyNote:
        "Ao candidatar-se você entra no talent pool curado da AHK, com consentimento LGPD.",
    },
    company: {
      eyebrow: "Para empresas associadas",
      title: "Publicar uma vaga",
      sub: "Preencha os dados essenciais. A IA padroniza a descrição e a AHK retorna uma shortlist qualificada.",
      trust:
        "Serviço exclusivo para empresas associadas à Câmara Brasil-Alemanha. Dados tratados conforme LGPD/GDPR.",
      consent:
        "Confirmo que somos empresa associada à AHK e aceito os Termos de Uso e a Política de Privacidade do serviço.",
      submit: "Enviar vaga para curadoria",
      doneTitle: "Vaga recebida!",
      done: "Iniciaremos o matching com IA e a curadoria da AHK. Você receberá uma shortlist de perfis qualificados em breve.",
      benefits: [
        { h: "Talentos pré-selecionados", d: "Receba uma shortlist com aderência ao perfil buscado." },
        { h: "Menos tempo e custo", d: "Redução vs. headhunters tradicionais." },
        { h: "Selo de confiança AHK", d: "Curadoria institucional da Câmara Brasil-Alemanha." },
        { h: "Gratuito no piloto", d: "Publicação sem custo para associadas selecionadas." },
      ],
      fields: [
        { name: "companyName", label: "Nome da empresa", kind: "text", placeholder: "Ex.: Grupo Industrial Alemão", required: true },
        { name: "contactEmail", label: "E-mail de contato (RH)", kind: "text", placeholder: "rh@empresa.com", required: true },
        { name: "jobTitle", label: "Cargo da vaga", kind: "text", placeholder: "Ex.: Gerente de Engenharia", required: true },
        { name: "area", label: "Área", kind: "select", options: ["Engenharia", "Comércio Exterior", "Sustentabilidade", "Recursos Humanos", "Tecnologia", "Finanças"], required: true },
        { name: "seniority", label: "Senioridade", kind: "select", options: ["Júnior", "Pleno", "Sênior", "Especialista", "Liderança"], required: true },
        { name: "languages", label: "Idiomas exigidos", kind: "select", options: ["Alemão + Inglês", "Alemão (avançado)", "Inglês (avançado)", "Inglês (intermediário)"], required: true },
        { name: "location", label: "Local e modelo de trabalho", kind: "text", placeholder: "Ex.: São Paulo, SP — Híbrido", required: true },
        { name: "description", label: "Descrição da vaga", kind: "area", placeholder: "Cole a descrição — a IA irá padronizá-la automaticamente.", required: true },
      ],
    },
    talent: {
      eyebrow: "Para talentos",
      title: "Entrar no talent pool",
      sub: "Cadastro curto e transparente. Seu perfil passa a ter visibilidade em vagas de empresas alemãs e multinacionais.",
      trust:
        "A IA é usada apenas como apoio à compatibilidade e sumarização. Nenhuma decisão é exclusivamente automatizada.",
      consentDataLabel: "Consentimento de dados (obrigatório)",
      consentData:
        "autorizo o uso dos meus dados para intermediação profissional e matching com apoio de IA, podendo excluí-los a qualquer momento.",
      consentComms:
        "Aceito receber comunicações e novidades da Câmara Brasil-Alemanha (opcional).",
      submit: "Entrar no talent pool",
      doneTitle: "Perfil incluído!",
      done: "Seu perfil foi incluído no Talent Pool da Câmara Brasil-Alemanha. Avisaremos quando houver vagas com alta aderência.",
      benefits: [
        { h: "Vagas exclusivas", d: "Acesso a empresas alemãs e multinacionais." },
        { h: "Mais visibilidade", d: "Talent pool curado, menos candidaturas manuais." },
        { h: "Matching inteligente", d: "A IA conecta seu perfil às vagas certas." },
        { h: "Sempre gratuito", d: "Candidatos não pagam pelo serviço." },
      ],
      fields: [
        { name: "fullName", label: "Nome completo", kind: "text", placeholder: "Seu nome", required: true },
        { name: "email", label: "E-mail", kind: "text", placeholder: "seu@email.com", required: true },
        { name: "area", label: "Área de interesse", kind: "select", options: ["Engenharia", "Comércio Exterior", "Sustentabilidade", "Recursos Humanos", "Tecnologia", "Finanças"], required: true },
        { name: "seniority", label: "Senioridade", kind: "select", options: ["Júnior", "Pleno", "Sênior", "Especialista", "Liderança"], required: true },
        { name: "languages", label: "Idiomas (autoavaliação)", kind: "select", options: ["Alemão avançado + Inglês fluente", "Alemão intermediário + Inglês avançado", "Inglês avançado", "Inglês intermediário"], required: true },
        { name: "internationalExperience", label: "Experiência internacional", kind: "text", placeholder: "Ex.: 6 anos em multinacional alemã" },
      ],
    },
    legal: {
      privacyTitle: "Política de Privacidade",
      termsTitle: "Termos de Uso",
      aiTitle: "Uso de Inteligência Artificial",
      updated: "Última atualização",
      privacy: [
        {
          h: "1. Finalidade",
          p: [
            "O AHK Talent Bridge trata dados pessoais exclusivamente para a intermediação profissional entre empresas associadas à Câmara Brasil-Alemanha e talentos com perfil internacional.",
            "Os dados não são vendidos, cedidos ou utilizados para qualquer finalidade diversa da aqui declarada.",
          ],
        },
        {
          h: "2. Consentimento",
          p: [
            "O uso dos seus dados ocorre apenas mediante consentimento explícito, coletado de forma separada do aceite de comunicações de marketing.",
            "Você pode revogar o consentimento a qualquer momento, o que implica a exclusão do seu perfil do talent pool.",
          ],
        },
        {
          h: "3. Minimização e retenção",
          p: [
            "Coletamos apenas os dados essenciais ao matching (área, senioridade, idiomas, experiência e contato).",
            "Os dados são mantidos enquanto o perfil estiver ativo e são eliminados mediante solicitação de exclusão.",
          ],
        },
        {
          h: "4. Seus direitos (LGPD / GDPR)",
          p: [
            "Você tem direito de acesso, correção, portabilidade e exclusão dos seus dados, além de informação sobre o tratamento realizado.",
            "Para exercer seus direitos, entre em contato pelos canais indicados na plataforma.",
          ],
        },
        {
          h: "5. Segurança",
          p: [
            "Os dados são armazenados de forma estruturada, com acesso restrito e registro de logs de acesso e uso.",
          ],
        },
      ],
      terms: [
        {
          h: "1. Objeto",
          p: [
            "Os presentes termos regem o uso do AHK Talent Bridge, bolsa de empregos institucional da Câmara Brasil-Alemanha.",
          ],
        },
        {
          h: "2. Elegibilidade",
          p: [
            "A publicação de vagas é exclusiva para empresas associadas à AHK. O cadastro de talentos é gratuito e aberto a profissionais com perfil internacional.",
          ],
        },
        {
          h: "3. Uso responsável",
          p: [
            "As informações fornecidas devem ser verdadeiras e atualizadas. A AHK pode moderar, recusar ou remover conteúdos que violem estes termos.",
          ],
        },
        {
          h: "4. Ausência de garantia de contratação",
          p: [
            "O serviço promove a conexão qualificada entre empresas e talentos, mas não garante contratação. A decisão final é sempre humana e da empresa.",
          ],
        },
      ],
      aiUse: [
        {
          h: "Como usamos IA",
          p: [
            "A inteligência artificial é utilizada como apoio à padronização de vagas e perfis, ao cálculo de um score de aderência explicável e à geração de resumos executivos.",
            "Nenhuma decisão é tomada exclusivamente por automação: a curadoria e a decisão final são sempre humanas.",
          ],
        },
        {
          h: "Transparência e limites",
          p: [
            "Os critérios de matching são objetivos e auditáveis. Não realizamos profiling abusivo nem tratamos dados sensíveis.",
            "Cada resultado de matching registra o modelo e a versão do prompt utilizados, garantindo rastreabilidade.",
          ],
        },
      ],
    },
    common: { formError: "Verifique os campos obrigatórios.", submitting: "Enviando…" },
  },

  en: {
    nav: { how: "How it works", jobs: "Openings", ai: "Artificial Intelligence", gov: "Governance" },
    cta: { company: "For companies", talent: "For talent" },
    hero: {
      badge: "The official AHK job board",
      title: "Connecting talent and German companies in Brazil",
      sub: "The official job board of the German-Brazilian Chamber of Commerce for internationally-minded professionals — institutional curation powered by AI.",
      ctaCompany: "Post a job",
      ctaTalent: "Join the talent pool",
      stats: {
        members: "member companies",
        since: "representing the German economy",
        culture: "DACH cultural fit",
      },
      cardLabel: "AHK + AI matching",
      cardLive: "live",
      talent: "Talent",
      company: "Company",
      matchName: "Senior profile · Advanced German",
      matchNote: "Explainable fit score — no fully automated final decision.",
    },
    trustStrip:
      "Institutional service exclusive to member companies · LGPD & GDPR compliant",
    how: {
      eyebrow: "Simple and frictionless",
      title: "How it works",
      sub: "Three steps, zero complexity for the end user. AHK handles curation and compliance.",
      steps: [
        {
          num: "1",
          title: "The company posts a job",
          desc: "A member company fills a simple form. AI standardizes the description automatically.",
        },
        {
          num: "2",
          title: "Talent signs up",
          desc: "Professionals join the talent pool with explicit consent and guided onboarding.",
        },
        {
          num: "3",
          title: "AHK + AI do the matching",
          desc: "AI produces an explainable score; AHK curates and sends the shortlist to HR.",
        },
      ],
    },
    jobs: {
      eyebrow: "Opportunities",
      title: "Open positions",
      count: "Updated weekly",
      fit: "Fit",
      details: "View details",
    },
    diff: {
      eyebrow: "Why AHK",
      title: "The strategic edge",
      sub: "AHK does not become a headhunter. It becomes the trusted curator of talent in the Germany–Brazil ecosystem.",
      items: [
        {
          icon: "🏛️",
          bg: "#EAF1FA",
          title: "Institutional curation",
          desc: "The AHK seal of trust, representing the German economy in Brazil since 1916.",
        },
        {
          icon: "🌐",
          bg: "#E8F6F0",
          title: "Germany–Brazil focus",
          desc: "Bilingual talent with international experience and DACH cultural fit.",
        },
        {
          icon: "⚡",
          bg: "#EAF6FC",
          title: "Intelligent matching",
          desc: "AI for standardization, fit scoring and objective executive summaries.",
        },
        {
          icon: "🔐",
          bg: "#FBF3E6",
          title: "Data governance",
          desc: "LGPD & GDPR by design: consent, minimization and transparency.",
        },
      ],
    },
    ai: {
      eyebrow: "Artificial Intelligence",
      title: "AI scales curation — it does not replace people",
      sub: "Used as decision support, with transparent criteria and an explainable score. No decision is made solely by automation.",
      panelLabel: "Compatibility analysis",
      panelName: "Job × Candidate",
      score: "fit",
      summaryLabel: "Executive summary",
      summary:
        "Senior professional, advanced German, 6 years in a German multinational. Strong cultural fit. Minor technical gap in SAP.",
      functions: [
        { h: "Standardization", d: "jobs and profiles structured from free text." },
        { h: "Matching", d: "a 0–100 score with a short rationale." },
        { h: "Executive summary", d: "an objective profile for HR in seconds." },
        { h: "Gaps & risks", d: "transparent identification of gaps." },
        { h: "Bias reduction", d: "objective, auditable criteria." },
      ],
      principles: ["Decision support", "No automated final decision", "Transparent criteria"],
      scoreBreakdown: [
        { label: "Language (German / English)", val: "96%", pct: "96%" },
        { label: "Seniority", val: "92%", pct: "92%" },
        { label: "International experience", val: "95%", pct: "95%" },
        { label: "DACH cultural fit", val: "90%", pct: "90%" },
      ],
    },
    gov: {
      badge: "Compliance by design",
      title: "Data governance from day one",
      sub: "Full compliance with LGPD and GDPR. Explicit consent, clear purpose and deletion at any time.",
      principles: [
        {
          title: "Explicit consent",
          desc: "Clear opt-in at sign-up, separate from marketing consent.",
        },
        { title: "Clear purpose", desc: "Data used only for professional intermediation." },
        { title: "Data minimization", desc: "We collect only what the matching requires." },
        { title: "Right to deletion", desc: "Full profile deletion at any time." },
        { title: "AI transparency", desc: "AI is support only; no abusive profiling or sensitive data." },
        {
          title: "Restricted access",
          desc: "Data stored in a structured way, with access logs.",
        },
      ],
    },
    final: {
      title: "Ready to find the right match?",
      sub: "Member companies post jobs for free during the pilot. Talent joins the pool at no cost.",
    },
    footer: {
      about:
        "The official job board of the German-Brazilian Chamber of Commerce, connecting internationally-minded talent with German and multinational companies.",
      col1: "For companies",
      col2: "For talent",
      col3: "Legal & data",
      pricing: "Plans & matching",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      ai: "Use of AI",
      legal:
        "© 2026 German-Brazilian Chamber of Commerce (AHK São Paulo). Logo applied per identity manual.",
      compliance: "Compliant with LGPD (Brazil) & GDPR (EU)",
    },
    vaga: {
      back: "Back to openings",
      profile: "Ideal profile",
      yourFit: "Your estimated fit",
      apply: "Apply to this position",
      applyNote: "By applying you join AHK’s curated talent pool, with LGPD consent.",
    },
    company: {
      eyebrow: "For member companies",
      title: "Post a job",
      sub: "Fill in the essentials. AI standardizes the description and AHK returns a qualified shortlist.",
      trust:
        "Exclusive to companies affiliated with the German-Brazilian Chamber. Data handled per LGPD/GDPR.",
      consent:
        "I confirm we are an AHK member company and accept the Terms of Use and Privacy Policy.",
      submit: "Submit job for curation",
      doneTitle: "Job received!",
      done: "We will start AI matching and AHK curation. You will receive a shortlist of qualified profiles shortly.",
      benefits: [
        { h: "Pre-screened talent", d: "Receive a shortlist matched to the profile you seek." },
        { h: "Less time and cost", d: "Reduction vs. traditional headhunters." },
        { h: "AHK seal of trust", d: "Institutional curation by the German-Brazilian Chamber." },
        { h: "Free during pilot", d: "Free posting for selected member companies." },
      ],
      fields: [
        { name: "companyName", label: "Company name", kind: "text", placeholder: "e.g. German Industrial Group", required: true },
        { name: "contactEmail", label: "Contact email (HR)", kind: "text", placeholder: "hr@company.com", required: true },
        { name: "jobTitle", label: "Job title", kind: "text", placeholder: "e.g. Engineering Manager", required: true },
        { name: "area", label: "Area", kind: "select", options: ["Engineering", "Foreign Trade", "Sustainability", "Human Resources", "Technology", "Finance"], required: true },
        { name: "seniority", label: "Seniority", kind: "select", options: ["Junior", "Mid-level", "Senior", "Specialist", "Leadership"], required: true },
        { name: "languages", label: "Required languages", kind: "select", options: ["German + English", "German (advanced)", "English (advanced)", "English (intermediate)"], required: true },
        { name: "location", label: "Location & work model", kind: "text", placeholder: "e.g. São Paulo, SP — Hybrid", required: true },
        { name: "description", label: "Job description", kind: "area", placeholder: "Paste the description — AI will standardize it automatically.", required: true },
      ],
    },
    talent: {
      eyebrow: "For talent",
      title: "Join the talent pool",
      sub: "A short, transparent sign-up. Your profile becomes visible for jobs at German and multinational companies.",
      trust:
        "AI is used only to support compatibility and summarization. No decision is made solely by automation.",
      consentDataLabel: "Data consent (required)",
      consentData:
        "I authorize the use of my data for professional intermediation and AI-assisted matching, and may delete it at any time.",
      consentComms:
        "I agree to receive news and updates from the German-Brazilian Chamber (optional).",
      submit: "Join the talent pool",
      doneTitle: "Profile added!",
      done: "Your profile has been added to the German-Brazilian Chamber talent pool. We will notify you of high-fit openings.",
      benefits: [
        { h: "Exclusive openings", d: "Access to German and multinational companies." },
        { h: "More visibility", d: "A curated talent pool, fewer manual applications." },
        { h: "Intelligent matching", d: "AI connects your profile to the right jobs." },
        { h: "Always free", d: "Candidates never pay for the service." },
      ],
      fields: [
        { name: "fullName", label: "Full name", kind: "text", placeholder: "Your name", required: true },
        { name: "email", label: "E-mail", kind: "text", placeholder: "you@email.com", required: true },
        { name: "area", label: "Area of interest", kind: "select", options: ["Engineering", "Foreign Trade", "Sustainability", "Human Resources", "Technology", "Finance"], required: true },
        { name: "seniority", label: "Seniority", kind: "select", options: ["Junior", "Mid-level", "Senior", "Specialist", "Leadership"], required: true },
        { name: "languages", label: "Languages (self-assessment)", kind: "select", options: ["Advanced German + fluent English", "Intermediate German + advanced English", "Advanced English", "Intermediate English"], required: true },
        { name: "internationalExperience", label: "International experience", kind: "text", placeholder: "e.g. 6 years in a German multinational" },
      ],
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Use",
      aiTitle: "Use of Artificial Intelligence",
      updated: "Last updated",
      privacy: [
        {
          h: "1. Purpose",
          p: [
            "AHK Talent Bridge processes personal data solely for professional intermediation between companies affiliated with the German-Brazilian Chamber of Commerce and internationally-minded talent.",
            "Data is never sold, transferred, or used for any purpose other than the one declared here.",
          ],
        },
        {
          h: "2. Consent",
          p: [
            "Your data is used only with explicit consent, collected separately from marketing consent.",
            "You may withdraw consent at any time, which entails deletion of your profile from the talent pool.",
          ],
        },
        {
          h: "3. Minimization and retention",
          p: [
            "We collect only the data essential to matching (area, seniority, languages, experience and contact).",
            "Data is kept while the profile is active and deleted upon request.",
          ],
        },
        {
          h: "4. Your rights (LGPD / GDPR)",
          p: [
            "You have the right to access, rectify, port and delete your data, as well as to be informed about the processing carried out.",
            "To exercise your rights, contact us through the channels indicated on the platform.",
          ],
        },
        {
          h: "5. Security",
          p: [
            "Data is stored in a structured way, with restricted access and access/usage logging.",
          ],
        },
      ],
      terms: [
        {
          h: "1. Subject",
          p: [
            "These terms govern the use of AHK Talent Bridge, the institutional job board of the German-Brazilian Chamber of Commerce.",
          ],
        },
        {
          h: "2. Eligibility",
          p: [
            "Job posting is exclusive to AHK member companies. Talent registration is free and open to internationally-minded professionals.",
          ],
        },
        {
          h: "3. Responsible use",
          p: [
            "Information provided must be true and up to date. AHK may moderate, refuse or remove content that violates these terms.",
          ],
        },
        {
          h: "4. No hiring guarantee",
          p: [
            "The service promotes qualified connection between companies and talent but does not guarantee hiring. The final decision is always human and belongs to the company.",
          ],
        },
      ],
      aiUse: [
        {
          h: "How we use AI",
          p: [
            "Artificial intelligence is used to support the standardization of jobs and profiles, the computation of an explainable fit score, and the generation of executive summaries.",
            "No decision is made solely by automation: curation and the final decision are always human.",
          ],
        },
        {
          h: "Transparency and limits",
          p: [
            "Matching criteria are objective and auditable. We do not perform abusive profiling nor process sensitive data.",
            "Each matching result records the model and prompt version used, ensuring traceability.",
          ],
        },
      ],
    },
    common: { formError: "Please check the required fields.", submitting: "Submitting…" },
  },
};

export function getDict(lang: Lang): Dictionary {
  return dict[lang] ?? dict[DEFAULT_LANG];
}
