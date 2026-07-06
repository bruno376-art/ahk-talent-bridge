/**
 * Dicionário PT/EN — porta 1:1 das strings do design "AHK Talent Bridge"
 * (Claude Design) e serve como fonte única de conteúdo da interface.
 */

export const LANGS = ["pt", "en", "de"] as const;
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
  /** Rótulo da seção (localizado) para agrupar campos no formulário. */
  section?: string;
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
    cv: {
      label: string;
      hint: string;
      button: string;
      uploading: string;
      attached: string;
      remove: string;
      error: string;
    };
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
        // Dados pessoais
        { section: "Dados pessoais", name: "fullName", label: "Nome completo", kind: "text", placeholder: "Seu nome", required: true },
        { section: "Dados pessoais", name: "email", label: "E-mail", kind: "text", placeholder: "seu@email.com", required: true },
        { section: "Dados pessoais", name: "phone", label: "Telefone", kind: "text", placeholder: "+55 11 90000-0000" },
        { section: "Dados pessoais", name: "city", label: "Cidade / UF", kind: "text", placeholder: "Ex.: São Paulo, SP" },
        { section: "Dados pessoais", name: "linkedin", label: "LinkedIn", kind: "text", placeholder: "linkedin.com/in/seu-perfil" },
        // Perfil profissional
        { section: "Perfil profissional", name: "area", label: "Área de interesse", kind: "select", options: ["Engenharia", "Comércio Exterior", "Sustentabilidade", "Recursos Humanos", "Tecnologia", "Finanças"], required: true },
        { section: "Perfil profissional", name: "currentRole", label: "Cargo atual / desejado", kind: "text", placeholder: "Ex.: Gerente de Engenharia" },
        { section: "Perfil profissional", name: "seniority", label: "Senioridade", kind: "select", options: ["Júnior", "Pleno", "Sênior", "Especialista", "Liderança"], required: true },
        { section: "Perfil profissional", name: "yearsExperience", label: "Anos de experiência", kind: "select", options: ["Menos de 1 ano", "1–3 anos", "3–5 anos", "5–10 anos", "Mais de 10 anos"] },
        // Idiomas (CEFR)
        { section: "Idiomas", name: "germanLevel", label: "Alemão (nível CEFR)", kind: "select", options: ["Nenhum", "A1", "A2", "B1", "B2", "C1", "C2 / Nativo"], required: true },
        { section: "Idiomas", name: "englishLevel", label: "Inglês (nível CEFR)", kind: "select", options: ["Nenhum", "A1", "A2", "B1", "B2", "C1", "C2 / Nativo"], required: true },
        // Perfil internacional Brasil–Alemanha
        { section: "Perfil internacional Brasil–Alemanha", name: "germanCompanyExperience", label: "Experiência em empresa alemã / DACH?", kind: "select", options: ["Sim", "Não"] },
        { section: "Perfil internacional Brasil–Alemanha", name: "internationalExperience", label: "Descreva sua experiência internacional", kind: "text", placeholder: "Ex.: 6 anos em multinacional alemã" },
        { section: "Perfil internacional Brasil–Alemanha", name: "relocation", label: "Disponibilidade para mudança", kind: "select", options: ["Brasil", "Alemanha", "Ambos", "Somente remoto"] },
        { section: "Perfil internacional Brasil–Alemanha", name: "workAuthorization", label: "Autorização para trabalhar na UE / Alemanha", kind: "select", options: ["Passaporte UE", "Visto de trabalho", "Em processo", "Não / precisa de patrocínio"] },
        // Currículo
        { section: "Currículo", name: "summary", label: "Resumo profissional", kind: "area", placeholder: "Conte em poucas linhas seu perfil, conquistas e objetivos." },
      ],
      cv: {
        label: "Currículo em PDF",
        hint: "Anexe seu CV em PDF (máx. 5 MB). Opcional — o LinkedIn e o resumo acima também ajudam.",
        button: "Selecionar PDF",
        uploading: "Enviando…",
        attached: "Anexado",
        remove: "Remover",
        error: "Não foi possível anexar. Você pode enviar sem o CV.",
      },
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
        // Personal details
        { section: "Personal details", name: "fullName", label: "Full name", kind: "text", placeholder: "Your name", required: true },
        { section: "Personal details", name: "email", label: "E-mail", kind: "text", placeholder: "you@email.com", required: true },
        { section: "Personal details", name: "phone", label: "Phone", kind: "text", placeholder: "+55 11 90000-0000" },
        { section: "Personal details", name: "city", label: "City / State", kind: "text", placeholder: "e.g. São Paulo, SP" },
        { section: "Personal details", name: "linkedin", label: "LinkedIn", kind: "text", placeholder: "linkedin.com/in/your-profile" },
        // Professional profile
        { section: "Professional profile", name: "area", label: "Area of interest", kind: "select", options: ["Engineering", "Foreign Trade", "Sustainability", "Human Resources", "Technology", "Finance"], required: true },
        { section: "Professional profile", name: "currentRole", label: "Current / desired role", kind: "text", placeholder: "e.g. Engineering Manager" },
        { section: "Professional profile", name: "seniority", label: "Seniority", kind: "select", options: ["Junior", "Mid-level", "Senior", "Specialist", "Leadership"], required: true },
        { section: "Professional profile", name: "yearsExperience", label: "Years of experience", kind: "select", options: ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "More than 10 years"] },
        // Languages (CEFR)
        { section: "Languages", name: "germanLevel", label: "German (CEFR level)", kind: "select", options: ["None", "A1", "A2", "B1", "B2", "C1", "C2 / Native"], required: true },
        { section: "Languages", name: "englishLevel", label: "English (CEFR level)", kind: "select", options: ["None", "A1", "A2", "B1", "B2", "C1", "C2 / Native"], required: true },
        // International profile Brazil–Germany
        { section: "Brazil–Germany international profile", name: "germanCompanyExperience", label: "Experience at a German / DACH company?", kind: "select", options: ["Yes", "No"] },
        { section: "Brazil–Germany international profile", name: "internationalExperience", label: "Describe your international experience", kind: "text", placeholder: "e.g. 6 years in a German multinational" },
        { section: "Brazil–Germany international profile", name: "relocation", label: "Relocation availability", kind: "select", options: ["Brazil", "Germany", "Both", "Remote only"] },
        { section: "Brazil–Germany international profile", name: "workAuthorization", label: "Authorization to work in the EU / Germany", kind: "select", options: ["EU passport", "Work visa", "In process", "No / needs sponsorship"] },
        // Résumé
        { section: "Résumé", name: "summary", label: "Professional summary", kind: "area", placeholder: "Briefly describe your profile, achievements and goals." },
      ],
      cv: {
        label: "Résumé (PDF)",
        hint: "Attach your résumé as a PDF (max 5 MB). Optional — LinkedIn and the summary above also help.",
        button: "Choose PDF",
        uploading: "Uploading…",
        attached: "Attached",
        remove: "Remove",
        error: "Couldn’t attach. You can submit without the résumé.",
      },
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

  de: {
    nav: { how: "So funktioniert es", jobs: "Stellen", ai: "Künstliche Intelligenz", gov: "Governance" },
    cta: { company: "Für Unternehmen", talent: "Für Talente" },
    hero: {
      badge: "Die offizielle Jobbörse der AHK",
      title: "Wir verbinden Talente und deutsche Unternehmen in Brasilien",
      sub: "Die offizielle Jobbörse der Deutsch-Brasilianischen Industrie- und Handelskammer für Fachkräfte mit internationalem Profil — institutionelle Kuratierung, unterstützt durch Künstliche Intelligenz.",
      ctaCompany: "Stelle veröffentlichen",
      ctaTalent: "Zum Talent-Pool",
      stats: {
        members: "Mitgliedsunternehmen",
        since: "Vertretung der deutschen Wirtschaft",
        culture: "kultureller DACH-Fit",
      },
      cardLabel: "AHK + KI Matching",
      cardLive: "live",
      talent: "Talent",
      company: "Unternehmen",
      matchName: "Senior-Profil · Deutsch fortgeschritten",
      matchNote: "Erklärbarer Matching-Score — keine vollautomatisierte Endentscheidung.",
    },
    trustStrip:
      "Institutioneller Service exklusiv für Mitgliedsunternehmen · Konform mit LGPD und DSGVO",
    how: {
      eyebrow: "Einfach und reibungslos",
      title: "So funktioniert es",
      sub: "Drei Schritte, null Komplexität für die Nutzer:innen. Die AHK übernimmt Kuratierung und Compliance.",
      steps: [
        {
          num: "1",
          title: "Das Unternehmen veröffentlicht die Stelle",
          desc: "Ein Mitgliedsunternehmen füllt ein einfaches Formular aus. Die KI standardisiert die Beschreibung automatisch.",
        },
        {
          num: "2",
          title: "Talente registrieren sich",
          desc: "Fachkräfte treten dem Talent-Pool bei — mit ausdrücklicher Einwilligung und geführtem Onboarding.",
        },
        {
          num: "3",
          title: "AHK + KI übernehmen das Matching",
          desc: "Die KI erzeugt einen erklärbaren Score; die AHK kuratiert und sendet die Shortlist an HR.",
        },
      ],
    },
    jobs: {
      eyebrow: "Chancen",
      title: "Offene Stellen",
      count: "Wöchentlich aktualisiert",
      fit: "Passung",
      details: "Details ansehen",
    },
    diff: {
      eyebrow: "Warum die AHK",
      title: "Der strategische Vorteil",
      sub: "Die AHK wird kein Headhunter. Sie wird die vertrauenswürdige Kuratorin für Talente im Ökosystem Deutschland–Brasilien.",
      items: [
        {
          icon: "🏛️",
          bg: "#EAF1FA",
          title: "Institutionelle Kuratierung",
          desc: "Das Vertrauenssiegel der AHK — seit 1916 Vertretung der deutschen Wirtschaft in Brasilien.",
        },
        {
          icon: "🌐",
          bg: "#E8F6F0",
          title: "Fokus Deutschland–Brasilien",
          desc: "Zweisprachige Talente mit internationaler Erfahrung und kulturellem DACH-Fit.",
        },
        {
          icon: "⚡",
          bg: "#EAF6FC",
          title: "Intelligentes Matching",
          desc: "KI für Standardisierung, Matching-Scores und objektive Executive Summaries.",
        },
        {
          icon: "🔐",
          bg: "#FBF3E6",
          title: "Datengovernance",
          desc: "LGPD & DSGVO by design: Einwilligung, Datenminimierung und Transparenz.",
        },
      ],
    },
    ai: {
      eyebrow: "Künstliche Intelligenz",
      title: "KI skaliert die Kuratierung — sie ersetzt keine Menschen",
      sub: "Als Entscheidungsunterstützung eingesetzt, mit transparenten Kriterien und erklärbarem Score. Keine Entscheidung erfolgt ausschließlich automatisiert.",
      panelLabel: "Kompatibilitätsanalyse",
      panelName: "Stelle × Kandidat:in",
      score: "Passung",
      summaryLabel: "Executive Summary",
      summary:
        "Senior-Fachkraft, Deutsch fortgeschritten, 6 Jahre in deutschem Multinational. Starker kultureller Fit. Leichte technische Lücke in SAP.",
      functions: [
        { h: "Standardisierung", d: "Stellen und Profile aus Freitext strukturiert." },
        { h: "Matching", d: "Score von 0 bis 100 mit kurzer Begründung." },
        { h: "Executive Summary", d: "objektives Profil für HR in Sekunden." },
        { h: "Lücken & Risiken", d: "transparente Identifikation von Gaps." },
        { h: "Bias-Reduktion", d: "objektive, prüfbare Kriterien." },
      ],
      principles: ["Entscheidungsunterstützung", "Keine automatisierte Endentscheidung", "Transparente Kriterien"],
      scoreBreakdown: [
        { label: "Sprache (Deutsch / Englisch)", val: "96%", pct: "96%" },
        { label: "Seniorität", val: "92%", pct: "92%" },
        { label: "Internationale Erfahrung", val: "95%", pct: "95%" },
        { label: "Kultureller DACH-Fit", val: "90%", pct: "90%" },
      ],
    },
    gov: {
      badge: "Compliance by design",
      title: "Datengovernance vom ersten Tag an",
      sub: "LGPD und DSGVO werden vollständig eingehalten. Ausdrückliche Einwilligung, klare Zweckbindung und Löschung jederzeit.",
      principles: [
        {
          title: "Ausdrückliche Einwilligung",
          desc: "Klares Opt-in bei der Registrierung, getrennt von der Marketing-Einwilligung.",
        },
        { title: "Klare Zweckbindung", desc: "Daten werden ausschließlich zur beruflichen Vermittlung genutzt." },
        { title: "Datenminimierung", desc: "Wir erheben nur, was für das Matching erforderlich ist." },
        { title: "Recht auf Löschung", desc: "Vollständige Löschung des Profils jederzeit." },
        { title: "KI-Transparenz", desc: "KI ist nur Unterstützung; kein missbräuchliches Profiling, keine sensiblen Daten." },
        {
          title: "Beschränkter Zugriff",
          desc: "Strukturierte Datenspeicherung mit Zugriffsprotokollen.",
        },
      ],
    },
    final: {
      title: "Bereit für das richtige Match?",
      sub: "Mitgliedsunternehmen veröffentlichen Stellen in der Pilotphase kostenlos. Talente treten dem Pool kostenfrei bei.",
    },
    footer: {
      about:
        "Die offizielle Jobbörse der Deutsch-Brasilianischen Industrie- und Handelskammer — sie verbindet Talente mit internationalem Profil mit deutschen und multinationalen Unternehmen.",
      col1: "Für Unternehmen",
      col2: "Für Talente",
      col3: "Recht & Daten",
      pricing: "Pläne & Matching",
      privacy: "Datenschutzerklärung",
      terms: "Nutzungsbedingungen",
      ai: "Einsatz von KI",
      legal:
        "© 2026 Deutsch-Brasilianische Industrie- und Handelskammer (AHK São Paulo). Logo gemäß Corporate-Design-Handbuch.",
      compliance: "Konform mit LGPD (Brasilien) & DSGVO (EU)",
    },
    vaga: {
      back: "Zurück zu den Stellen",
      profile: "Ideales Profil",
      yourFit: "Ihre geschätzte Passung",
      apply: "Auf diese Stelle bewerben",
      applyNote:
        "Mit Ihrer Bewerbung treten Sie dem kuratierten Talent-Pool der AHK bei — mit LGPD-Einwilligung.",
    },
    company: {
      eyebrow: "Für Mitgliedsunternehmen",
      title: "Stelle veröffentlichen",
      sub: "Geben Sie die wichtigsten Daten an. Die KI standardisiert die Beschreibung und die AHK liefert eine qualifizierte Shortlist.",
      trust:
        "Exklusiver Service für Mitgliedsunternehmen der Deutsch-Brasilianischen Industrie- und Handelskammer. Datenverarbeitung gemäß LGPD/DSGVO.",
      consent:
        "Ich bestätige, dass wir Mitgliedsunternehmen der AHK sind, und akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung.",
      submit: "Stelle zur Kuratierung senden",
      doneTitle: "Stelle erhalten!",
      done: "Wir starten das KI-Matching und die AHK-Kuratierung. Sie erhalten in Kürze eine Shortlist qualifizierter Profile.",
      benefits: [
        { h: "Vorselektierte Talente", d: "Erhalten Sie eine Shortlist passender Profile." },
        { h: "Weniger Zeit und Kosten", d: "Ersparnis gegenüber klassischen Headhuntern." },
        { h: "AHK-Vertrauenssiegel", d: "Institutionelle Kuratierung der Deutsch-Brasilianischen Handelskammer." },
        { h: "Kostenlos in der Pilotphase", d: "Kostenlose Veröffentlichung für ausgewählte Mitglieder." },
      ],
      fields: [
        { name: "companyName", label: "Name des Unternehmens", kind: "text", placeholder: "z. B. Deutsche Industriegruppe", required: true },
        { name: "contactEmail", label: "Kontakt-E-Mail (HR)", kind: "text", placeholder: "hr@unternehmen.com", required: true },
        { name: "jobTitle", label: "Stellenbezeichnung", kind: "text", placeholder: "z. B. Engineering Manager", required: true },
        { name: "area", label: "Bereich", kind: "select", options: ["Ingenieurwesen", "Außenhandel", "Nachhaltigkeit", "Personalwesen", "Technologie", "Finanzen"], required: true },
        { name: "seniority", label: "Seniorität", kind: "select", options: ["Junior", "Mid-Level", "Senior", "Spezialist:in", "Führungskraft"], required: true },
        { name: "languages", label: "Erforderliche Sprachen", kind: "select", options: ["Deutsch + Englisch", "Deutsch (fortgeschritten)", "Englisch (fortgeschritten)", "Englisch (Mittelstufe)"], required: true },
        { name: "location", label: "Standort & Arbeitsmodell", kind: "text", placeholder: "z. B. São Paulo, SP — Hybrid", required: true },
        { name: "description", label: "Stellenbeschreibung", kind: "area", placeholder: "Beschreibung einfügen — die KI standardisiert sie automatisch.", required: true },
      ],
    },
    talent: {
      eyebrow: "Für Talente",
      title: "Zum Talent-Pool",
      sub: "Kurze, transparente Registrierung. Ihr Profil wird für Stellen bei deutschen und multinationalen Unternehmen sichtbar.",
      trust:
        "KI wird nur zur Unterstützung von Kompatibilität und Zusammenfassung eingesetzt. Keine Entscheidung erfolgt ausschließlich automatisiert.",
      consentDataLabel: "Dateneinwilligung (erforderlich)",
      consentData:
        "Ich willige in die Nutzung meiner Daten zur beruflichen Vermittlung und zum KI-gestützten Matching ein und kann sie jederzeit löschen lassen.",
      consentComms:
        "Ich möchte Neuigkeiten der Deutsch-Brasilianischen Handelskammer erhalten (optional).",
      submit: "Zum Talent-Pool",
      doneTitle: "Profil aufgenommen!",
      done: "Ihr Profil wurde in den Talent-Pool der Deutsch-Brasilianischen Handelskammer aufgenommen. Wir melden uns bei Stellen mit hoher Passung.",
      benefits: [
        { h: "Exklusive Stellen", d: "Zugang zu deutschen und multinationalen Unternehmen." },
        { h: "Mehr Sichtbarkeit", d: "Kuratierter Talent-Pool, weniger manuelle Bewerbungen." },
        { h: "Intelligentes Matching", d: "Die KI verbindet Ihr Profil mit den richtigen Stellen." },
        { h: "Immer kostenlos", d: "Für Talente ist der Service kostenfrei." },
      ],
      fields: [
        // Persönliche Daten
        { section: "Persönliche Daten", name: "fullName", label: "Vollständiger Name", kind: "text", placeholder: "Ihr Name", required: true },
        { section: "Persönliche Daten", name: "email", label: "E-Mail", kind: "text", placeholder: "sie@email.com", required: true },
        { section: "Persönliche Daten", name: "phone", label: "Telefon", kind: "text", placeholder: "+55 11 90000-0000" },
        { section: "Persönliche Daten", name: "city", label: "Stadt / Bundesstaat", kind: "text", placeholder: "z. B. São Paulo, SP" },
        { section: "Persönliche Daten", name: "linkedin", label: "LinkedIn", kind: "text", placeholder: "linkedin.com/in/ihr-profil" },
        // Berufsprofil
        { section: "Berufsprofil", name: "area", label: "Interessensbereich", kind: "select", options: ["Ingenieurwesen", "Außenhandel", "Nachhaltigkeit", "Personalwesen", "Technologie", "Finanzen"], required: true },
        { section: "Berufsprofil", name: "currentRole", label: "Aktuelle / gewünschte Position", kind: "text", placeholder: "z. B. Engineering Manager" },
        { section: "Berufsprofil", name: "seniority", label: "Seniorität", kind: "select", options: ["Junior", "Mid-Level", "Senior", "Spezialist:in", "Führungskraft"], required: true },
        { section: "Berufsprofil", name: "yearsExperience", label: "Jahre Berufserfahrung", kind: "select", options: ["Weniger als 1 Jahr", "1–3 Jahre", "3–5 Jahre", "5–10 Jahre", "Mehr als 10 Jahre"] },
        // Sprachen (GER/CEFR)
        { section: "Sprachen", name: "germanLevel", label: "Deutsch (GER-Niveau)", kind: "select", options: ["Keine", "A1", "A2", "B1", "B2", "C1", "C2 / Muttersprache"], required: true },
        { section: "Sprachen", name: "englishLevel", label: "Englisch (GER-Niveau)", kind: "select", options: ["Keine", "A1", "A2", "B1", "B2", "C1", "C2 / Muttersprache"], required: true },
        // Internationales Profil Brasilien–Deutschland
        { section: "Internationales Profil Brasilien–Deutschland", name: "germanCompanyExperience", label: "Erfahrung in deutschem / DACH-Unternehmen?", kind: "select", options: ["Ja", "Nein"] },
        { section: "Internationales Profil Brasilien–Deutschland", name: "internationalExperience", label: "Beschreiben Sie Ihre internationale Erfahrung", kind: "text", placeholder: "z. B. 6 Jahre in deutschem Multinational" },
        { section: "Internationales Profil Brasilien–Deutschland", name: "relocation", label: "Umzugsbereitschaft", kind: "select", options: ["Brasilien", "Deutschland", "Beide", "Nur remote"] },
        { section: "Internationales Profil Brasilien–Deutschland", name: "workAuthorization", label: "Arbeitserlaubnis EU / Deutschland", kind: "select", options: ["EU-Pass", "Arbeitsvisum", "In Bearbeitung", "Nein / Sponsoring erforderlich"] },
        // Lebenslauf
        { section: "Lebenslauf", name: "summary", label: "Berufliches Kurzprofil", kind: "area", placeholder: "Beschreiben Sie kurz Profil, Erfolge und Ziele." },
      ],
      cv: {
        label: "Lebenslauf als PDF",
        hint: "PDF anhängen (max. 5 MB). Optional — LinkedIn und Kurzprofil helfen ebenfalls.",
        button: "PDF auswählen",
        uploading: "Wird hochgeladen…",
        attached: "Angehängt",
        remove: "Entfernen",
        error: "Anhang fehlgeschlagen. Sie können auch ohne Lebenslauf absenden.",
      },
    },
    legal: {
      privacyTitle: "Datenschutzerklärung",
      termsTitle: "Nutzungsbedingungen",
      aiTitle: "Einsatz von Künstlicher Intelligenz",
      updated: "Zuletzt aktualisiert",
      privacy: [
        {
          h: "1. Zweck",
          p: [
            "AHK Talent Bridge verarbeitet personenbezogene Daten ausschließlich zur beruflichen Vermittlung zwischen Mitgliedsunternehmen der Deutsch-Brasilianischen Industrie- und Handelskammer und Talenten mit internationalem Profil.",
            "Daten werden niemals verkauft, weitergegeben oder für andere als die hier genannten Zwecke verwendet.",
          ],
        },
        {
          h: "2. Einwilligung",
          p: [
            "Ihre Daten werden nur mit ausdrücklicher Einwilligung genutzt, die getrennt von der Marketing-Einwilligung erhoben wird.",
            "Sie können die Einwilligung jederzeit widerrufen; damit wird Ihr Profil aus dem Talent-Pool gelöscht.",
          ],
        },
        {
          h: "3. Datenminimierung und Speicherung",
          p: [
            "Wir erheben nur die für das Matching wesentlichen Daten (Bereich, Seniorität, Sprachen, Erfahrung und Kontakt).",
            "Die Daten bleiben gespeichert, solange das Profil aktiv ist, und werden auf Anfrage gelöscht.",
          ],
        },
        {
          h: "4. Ihre Rechte (LGPD / DSGVO)",
          p: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung Ihrer Daten sowie auf Information über die durchgeführte Verarbeitung.",
            "Zur Ausübung Ihrer Rechte kontaktieren Sie uns über die auf der Plattform angegebenen Kanäle.",
          ],
        },
        {
          h: "5. Sicherheit",
          p: [
            "Die Daten werden strukturiert gespeichert, mit beschränktem Zugriff und Protokollierung von Zugriff und Nutzung.",
          ],
        },
      ],
      terms: [
        {
          h: "1. Gegenstand",
          p: [
            "Diese Bedingungen regeln die Nutzung von AHK Talent Bridge, der institutionellen Jobbörse der Deutsch-Brasilianischen Industrie- und Handelskammer.",
          ],
        },
        {
          h: "2. Teilnahmeberechtigung",
          p: [
            "Die Veröffentlichung von Stellen ist Mitgliedsunternehmen der AHK vorbehalten. Die Registrierung für Talente ist kostenlos und offen für Fachkräfte mit internationalem Profil.",
          ],
        },
        {
          h: "3. Verantwortungsvolle Nutzung",
          p: [
            "Die angegebenen Informationen müssen wahr und aktuell sein. Die AHK kann Inhalte moderieren, ablehnen oder entfernen, die gegen diese Bedingungen verstoßen.",
          ],
        },
        {
          h: "4. Keine Einstellungsgarantie",
          p: [
            "Der Service fördert die qualifizierte Verbindung zwischen Unternehmen und Talenten, garantiert jedoch keine Einstellung. Die endgültige Entscheidung ist immer menschlich und liegt beim Unternehmen.",
          ],
        },
      ],
      aiUse: [
        {
          h: "Wie wir KI einsetzen",
          p: [
            "Künstliche Intelligenz unterstützt die Standardisierung von Stellen und Profilen, die Berechnung eines erklärbaren Matching-Scores und die Erstellung von Executive Summaries.",
            "Keine Entscheidung erfolgt ausschließlich automatisiert: Kuratierung und Endentscheidung sind immer menschlich.",
          ],
        },
        {
          h: "Transparenz und Grenzen",
          p: [
            "Die Matching-Kriterien sind objektiv und prüfbar. Wir betreiben kein missbräuchliches Profiling und verarbeiten keine sensiblen Daten.",
            "Jedes Matching-Ergebnis dokumentiert das verwendete Modell und die Prompt-Version und ist damit nachvollziehbar.",
          ],
        },
      ],
    },
    common: { formError: "Bitte prüfen Sie die Pflichtfelder.", submitting: "Wird gesendet…" },
  },
};

export function getDict(lang: Lang): Dictionary {
  return dict[lang] ?? dict[DEFAULT_LANG];
}
