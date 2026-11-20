// i18n da interface da app (o conteúdo dos relatórios não é traduzido — é dado do utilizador).
export type Locale = "pt-PT" | "pt-BR" | "en" | "fr" | "es";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "pt-PT", label: "PT-PT" },
  { code: "pt-BR", label: "PT-BR" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];
export const DEFAULT_LOCALE: Locale = "pt-PT";

type Row = Record<Locale, string>;
const T: Record<string, Row> = {
  brand_sub: { "pt-PT": "Estúdio de relatórios", "pt-BR": "Estúdio de relatórios", en: "Report studio", fr: "Studio de rapports", es: "Estudio de informes" },
  // login
  login_in: { "pt-PT": "Iniciar sessão", "pt-BR": "Entrar", en: "Sign in", fr: "Se connecter", es: "Iniciar sesión" },
  login_up: { "pt-PT": "Criar conta", "pt-BR": "Criar conta", en: "Create account", fr: "Créer un compte", es: "Crear cuenta" },
  email: { "pt-PT": "Email", "pt-BR": "E-mail", en: "Email", fr: "E-mail", es: "Correo" },
  password: { "pt-PT": "Palavra-passe", "pt-BR": "Senha", en: "Password", fr: "Mot de passe", es: "Contraseña" },
  btn_enter: { "pt-PT": "Entrar", "pt-BR": "Entrar", en: "Sign in", fr: "Se connecter", es: "Entrar" },
  btn_register: { "pt-PT": "Registar", "pt-BR": "Cadastrar", en: "Sign up", fr: "S'inscrire", es: "Registrarse" },
  processing: { "pt-PT": "A processar…", "pt-BR": "Processando…", en: "Processing…", fr: "Traitement…", es: "Procesando…" },
  no_account: { "pt-PT": "Ainda não tens conta? ", "pt-BR": "Ainda não tem conta? ", en: "No account yet? ", fr: "Pas encore de compte ? ", es: "¿Aún no tienes cuenta? " },
  have_account: { "pt-PT": "Já tens conta? ", "pt-BR": "Já tem conta? ", en: "Already have an account? ", fr: "Vous avez déjà un compte ? ", es: "¿Ya tienes cuenta? " },
  signup_done: {
    "pt-PT": "Conta criada. Se a confirmação por email estiver ativa, confirma e depois inicia sessão.",
    "pt-BR": "Conta criada. Se a confirmação por e-mail estiver ativa, confirme e depois faça login.",
    en: "Account created. If email confirmation is on, confirm it and then sign in.",
    fr: "Compte créé. Si la confirmation par e-mail est active, confirmez-la puis connectez-vous.",
    es: "Cuenta creada. Si la confirmación por correo está activa, confírmala y luego inicia sesión.",
  },
  not_configured: {
    "pt-PT": "Supabase ainda não configurado. Define NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local, corre a migração e reinicia o servidor.",
    "pt-BR": "Supabase ainda não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local, rode a migração e reinicie o servidor.",
    en: "Supabase not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, run the migration and restart the server.",
    fr: "Supabase n'est pas encore configuré. Définissez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local, lancez la migration et redémarrez le serveur.",
    es: "Supabase aún no está configurado. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local, ejecuta la migración y reinicia el servidor.",
  },
  // dashboard
  my_reports: { "pt-PT": "Os meus relatórios", "pt-BR": "Meus relatórios", en: "My reports", fr: "Mes rapports", es: "Mis informes" },
  reports: { "pt-PT": "Relatórios", "pt-BR": "Relatórios", en: "Reports", fr: "Rapports", es: "Informes" },
  new_report: { "pt-PT": "+ Novo relatório", "pt-BR": "+ Novo relatório", en: "+ New report", fr: "+ Nouveau rapport", es: "+ Nuevo informe" },
  logout: { "pt-PT": "Sair", "pt-BR": "Sair", en: "Sign out", fr: "Déconnexion", es: "Salir" },
  empty_reports: {
    "pt-PT": "Ainda não tens relatórios. Cria o primeiro.", "pt-BR": "Você ainda não tem relatórios. Crie o primeiro.",
    en: "No reports yet. Create your first one.", fr: "Aucun rapport pour l'instant. Créez le premier.", es: "Aún no tienes informes. Crea el primero.",
  },
  updated: { "pt-PT": "Atualizado", "pt-BR": "Atualizado", en: "Updated", fr: "Mis à jour", es: "Actualizado" },
  public_tag: { "pt-PT": "público", "pt-BR": "público", en: "public", fr: "public", es: "público" },
  view: { "pt-PT": "Ver", "pt-BR": "Ver", en: "View", fr: "Voir", es: "Ver" },
  edit: { "pt-PT": "Editar", "pt-BR": "Editar", en: "Edit", fr: "Modifier", es: "Editar" },
  del: { "pt-PT": "Apagar", "pt-BR": "Excluir", en: "Delete", fr: "Supprimer", es: "Eliminar" },
  // editor chrome
  back_reports: { "pt-PT": "Relatórios", "pt-BR": "Relatórios", en: "Reports", fr: "Rapports", es: "Informes" },
  collapse: { "pt-PT": "Recolher", "pt-BR": "Recolher", en: "Collapse", fr: "Réduire", es: "Contraer" },
  expand: { "pt-PT": "Editar", "pt-BR": "Editar", en: "Edit", fr: "Éditer", es: "Editar" },
  saving: { "pt-PT": "a guardar…", "pt-BR": "salvando…", en: "saving…", fr: "enregistrement…", es: "guardando…" },
  saved: { "pt-PT": "guardado ✓", "pt-BR": "salvo ✓", en: "saved ✓", fr: "enregistré ✓", es: "guardado ✓" },
  save_error: { "pt-PT": "erro ao guardar", "pt-BR": "erro ao salvar", en: "save error", fr: "erreur d'enregistrement", es: "error al guardar" },
  public_toggle: { "pt-PT": "Público", "pt-BR": "Público", en: "Public", fr: "Public", es: "Público" },
  open_public: { "pt-PT": "Abrir link público ↗", "pt-BR": "Abrir link público ↗", en: "Open public link ↗", fr: "Ouvrir le lien public ↗", es: "Abrir enlace público ↗" },
  mode_form: { "pt-PT": "Formulário", "pt-BR": "Formulário", en: "Form", fr: "Formulaire", es: "Formulario" },
  mode_json: { "pt-PT": "JSON", "pt-BR": "JSON", en: "JSON", fr: "JSON", es: "JSON" },
  claude_btn: { "pt-PT": "Instruções p/ Claude", "pt-BR": "Instruções p/ Claude", en: "Claude instructions", fr: "Instructions pour Claude", es: "Instrucciones para Claude" },
  copied: { "pt-PT": "copiado ✓", "pt-BR": "copiado ✓", en: "copied ✓", fr: "copié ✓", es: "copiado ✓" },
  json_valid: { "pt-PT": "✓ JSON válido — guardado automaticamente", "pt-BR": "✓ JSON válido — salvo automaticamente", en: "✓ Valid JSON — autosaved", fr: "✓ JSON valide — enregistré automatiquement", es: "✓ JSON válido — guardado automáticamente" },
  json_invalid: { "pt-PT": "⚠ JSON inválido: ", "pt-BR": "⚠ JSON inválido: ", en: "⚠ Invalid JSON: ", fr: "⚠ JSON invalide : ", es: "⚠ JSON inválido: " },
  add_remove_hint: {
    "pt-PT": "Para adicionar/remover abas ou blocos novos, usa o modo JSON (ou pede ao Claude com o botão acima).",
    "pt-BR": "Para adicionar/remover abas ou blocos novos, use o modo JSON (ou peça ao Claude com o botão acima).",
    en: "To add/remove tabs or new blocks, use JSON mode (or ask Claude with the button above).",
    fr: "Pour ajouter/supprimer des onglets ou de nouveaux blocs, utilisez le mode JSON (ou demandez à Claude avec le bouton ci-dessus).",
    es: "Para añadir/quitar pestañas o bloques nuevos, usa el modo JSON (o pídeselo a Claude con el botón de arriba).",
  },
  // editor: secções e campos
  sec_header: { "pt-PT": "Cabeçalho", "pt-BR": "Cabeçalho", en: "Header", fr: "En-tête", es: "Encabezado" },
  f_theme: { "pt-PT": "Tema", "pt-BR": "Tema", en: "Theme", fr: "Thème", es: "Tema" },
  f_period: { "pt-PT": "Período", "pt-BR": "Período", en: "Period", fr: "Période", es: "Período" },
  f_brand: { "pt-PT": "Marca / cliente (eyebrow)", "pt-BR": "Marca / cliente (eyebrow)", en: "Brand / client (eyebrow)", fr: "Marque / client (eyebrow)", es: "Marca / cliente (eyebrow)" },
  f_title: { "pt-PT": "Título", "pt-BR": "Título", en: "Title", fr: "Titre", es: "Título" },
  f_intro: { "pt-PT": "Intro", "pt-BR": "Intro", en: "Intro", fr: "Intro", es: "Intro" },
  f_footer: { "pt-PT": "Rodapé (sidebar)", "pt-BR": "Rodapé (sidebar)", en: "Footer (sidebar)", fr: "Pied de page (sidebar)", es: "Pie de página (sidebar)" },
  f_notes: { "pt-PT": "Notas de leitura", "pt-BR": "Notas de leitura", en: "Reading notes", fr: "Notes de lecture", es: "Notas de lectura" },
  tab_name: { "pt-PT": "Nome da aba", "pt-BR": "Nome da aba", en: "Tab name", fr: "Nom de l'onglet", es: "Nombre de la pestaña" },
  tab_word: { "pt-PT": "Aba", "pt-BR": "Aba", en: "Tab", fr: "Onglet", es: "Pestaña" },
  blocks_word: { "pt-PT": "blocos", "pt-BR": "blocos", en: "blocks", fr: "blocs", es: "bloques" },
  no_blocks: { "pt-PT": "Esta aba não tem blocos.", "pt-BR": "Esta aba não tem blocos.", en: "This tab has no blocks.", fr: "Cet onglet n'a aucun bloc.", es: "Esta pestaña no tiene bloques." },
  theme_default: { "pt-PT": "— (padrão)", "pt-BR": "— (padrão)", en: "— (default)", fr: "— (défaut)", es: "— (predeterminado)" },
  // campos de blocos
  b_eyebrow: { "pt-PT": "Eyebrow", "pt-BR": "Eyebrow", en: "Eyebrow", fr: "Eyebrow", es: "Eyebrow" },
  b_value: { "pt-PT": "Valor", "pt-BR": "Valor", en: "Value", fr: "Valeur", es: "Valor" },
  b_sub: { "pt-PT": "Sub", "pt-BR": "Sub", en: "Sub", fr: "Sous-texte", es: "Sub" },
  b_accent: { "pt-PT": "Acento", "pt-BR": "Destaque", en: "Accent", fr: "Accent", es: "Acento" },
  b_hero: { "pt-PT": "Destaque (escuro)", "pt-BR": "Destaque (escuro)", en: "Hero (dark)", fr: "Vedette (sombre)", es: "Destacado (oscuro)" },
  b_footnote: { "pt-PT": "Rodapé (footnote)", "pt-BR": "Rodapé (footnote)", en: "Footnote", fr: "Note de bas", es: "Nota al pie" },
  b_title: { "pt-PT": "Título", "pt-BR": "Título", en: "Title", fr: "Titre", es: "Título" },
  b_card_title: { "pt-PT": "Título do cartão", "pt-BR": "Título do cartão", en: "Card title", fr: "Titre de la carte", es: "Título de la tarjeta" },
  b_subtitle: { "pt-PT": "Subtítulo", "pt-BR": "Subtítulo", en: "Subtitle", fr: "Sous-titre", es: "Subtítulo" },
  b_text: { "pt-PT": "Texto (**negrito**)", "pt-BR": "Texto (**negrito**)", en: "Text (**bold**)", fr: "Texte (**gras**)", es: "Texto (**negrita**)" },
  b_paragraph: { "pt-PT": "Parágrafo (**negrito**)", "pt-BR": "Parágrafo (**negrito**)", en: "Paragraph (**bold**)", fr: "Paragraphe (**gras**)", es: "Párrafo (**negrita**)" },
  b_lead: { "pt-PT": "Lead (negrito)", "pt-BR": "Lead (negrito)", en: "Lead (bold)", fr: "Accroche (gras)", es: "Entrada (negrita)" },
  b_tone: { "pt-PT": "Tom", "pt-BR": "Tom", en: "Tone", fr: "Ton", es: "Tono" },
  b_label: { "pt-PT": "Rótulo", "pt-BR": "Rótulo", en: "Label", fr: "Libellé", es: "Etiqueta" },
  b_valuelabel: { "pt-PT": "Valor (texto)", "pt-BR": "Valor (texto)", en: "Value (text)", fr: "Valeur (texte)", es: "Valor (texto)" },
  b_pct: { "pt-PT": "Percentagem", "pt-BR": "Porcentagem", en: "Percentage", fr: "Pourcentage", es: "Porcentaje" },
  b_color: { "pt-PT": "Cor", "pt-BR": "Cor", en: "Color", fr: "Couleur", es: "Color" },
  add_kpi: { "pt-PT": "+ Adicionar KPI", "pt-BR": "+ Adicionar KPI", en: "+ Add KPI", fr: "+ Ajouter un KPI", es: "+ Añadir KPI" },
  add_point: { "pt-PT": "+ Adicionar ponto", "pt-BR": "+ Adicionar ponto", en: "+ Add point", fr: "+ Ajouter un point", es: "+ Añadir punto" },
  add_step: { "pt-PT": "+ Adicionar etapa", "pt-BR": "+ Adicionar etapa", en: "+ Add step", fr: "+ Ajouter une étape", es: "+ Añadir etapa" },
  add_bar: { "pt-PT": "+ Adicionar barra", "pt-BR": "+ Adicionar barra", en: "+ Add bar", fr: "+ Ajouter une barre", es: "+ Añadir barra" },
  add_row: { "pt-PT": "+ Adicionar linha", "pt-BR": "+ Adicionar linha", en: "+ Add row", fr: "+ Ajouter une ligne", es: "+ Añadir fila" },
  cols_hint: { "pt-PT": "Colunas e formatos editam-se no modo JSON.", "pt-BR": "Colunas e formatos são editados no modo JSON.", en: "Columns and formats are edited in JSON mode.", fr: "Les colonnes et formats se modifient en mode JSON.", es: "Las columnas y formatos se editan en el modo JSON." },
  json_only: { "pt-PT": "edita-se no modo JSON (gráficos e configurações avançadas).", "pt-BR": "edita-se no modo JSON (gráficos e configurações avançadas).", en: "is edited in JSON mode (charts and advanced settings).", fr: "se modifie en mode JSON (graphiques et réglages avancés).", es: "se edita en el modo JSON (gráficos y ajustes avanzados)." },
  nested_empty: { "pt-PT": "Sem blocos. Adiciona em modo JSON.", "pt-BR": "Sem blocos. Adicione no modo JSON.", en: "No blocks. Add in JSON mode.", fr: "Aucun bloc. Ajoutez en mode JSON.", es: "Sin bloques. Añádelos en modo JSON." },
  // nomes dos tipos de bloco
  bt_kpis: { "pt-PT": "KPIs", "pt-BR": "KPIs", en: "KPIs", fr: "KPI", es: "KPIs" },
  bt_card: { "pt-PT": "Cartão", "pt-BR": "Cartão", en: "Card", fr: "Carte", es: "Tarjeta" },
  bt_row: { "pt-PT": "Linha (lado a lado)", "pt-BR": "Linha (lado a lado)", en: "Row (side by side)", fr: "Ligne (côte à côte)", es: "Fila (lado a lado)" },
  bt_barChart: { "pt-PT": "Gráfico de barras", "pt-BR": "Gráfico de barras", en: "Bar chart", fr: "Graphique à barres", es: "Gráfico de barras" },
  bt_areaChart: { "pt-PT": "Gráfico de área", "pt-BR": "Gráfico de área", en: "Area chart", fr: "Graphique en aires", es: "Gráfico de área" },
  bt_table: { "pt-PT": "Tabela", "pt-BR": "Tabela", en: "Table", fr: "Tableau", es: "Tabla" },
  bt_note: { "pt-PT": "Nota", "pt-BR": "Nota", en: "Note", fr: "Note", es: "Nota" },
  bt_banner: { "pt-PT": "Banner", "pt-BR": "Banner", en: "Banner", fr: "Bannière", es: "Banner" },
  bt_synthesis: { "pt-PT": "Síntese", "pt-BR": "Síntese", en: "Synthesis", fr: "Synthèse", es: "Síntesis" },
  bt_callout: { "pt-PT": "Callout", "pt-BR": "Callout", en: "Callout", fr: "Encadré", es: "Destacado" },
  bt_funnel: { "pt-PT": "Funil", "pt-BR": "Funil", en: "Funnel", fr: "Entonnoir", es: "Embudo" },
  bt_progress: { "pt-PT": "Progresso", "pt-BR": "Progresso", en: "Progress", fr: "Progression", es: "Progreso" },
  bt_heading: { "pt-PT": "Cabeçalho", "pt-BR": "Cabeçalho", en: "Heading", fr: "Titre", es: "Encabezado" },
  bt_text: { "pt-PT": "Texto", "pt-BR": "Texto", en: "Text", fr: "Texte", es: "Texto" },
  bt_spacer: { "pt-PT": "Espaço", "pt-BR": "Espaço", en: "Spacer", fr: "Espace", es: "Espacio" },
  // export / comparar
  download_html: { "pt-PT": "Baixar HTML", "pt-BR": "Baixar HTML", en: "Download HTML", fr: "Télécharger le HTML", es: "Descargar HTML" },
  compare: { "pt-PT": "Comparar", "pt-BR": "Comparar", en: "Compare", fr: "Comparer", es: "Comparar" },
  compare_title: { "pt-PT": "Comparar relatórios", "pt-BR": "Comparar relatórios", en: "Compare reports", fr: "Comparer les rapports", es: "Comparar informes" },
  compare_pick: { "pt-PT": "Escolhe um relatório…", "pt-BR": "Escolha um relatório…", en: "Choose a report…", fr: "Choisissez un rapport…", es: "Elige un informe…" },
  compare_hint: {
    "pt-PT": "Escolhe dois relatórios para os ver lado a lado.", "pt-BR": "Escolha dois relatórios para vê-los lado a lado.",
    en: "Pick two reports to view them side by side.", fr: "Choisissez deux rapports pour les voir côte à côte.", es: "Elige dos informes para verlos lado a lado.",
  },
  compare_layout_side: { "pt-PT": "Lado a lado", "pt-BR": "Lado a lado", en: "Side by side", fr: "Côte à côte", es: "Lado a lado" },
  compare_layout_stack: { "pt-PT": "Empilhado", "pt-BR": "Empilhado", en: "Stacked", fr: "Empilé", es: "Apilado" },
  loading: { "pt-PT": "A carregar…", "pt-BR": "Carregando…", en: "Loading…", fr: "Chargement…", es: "Cargando…" },
  // prefs
  pref_theme_light: { "pt-PT": "Claro", "pt-BR": "Claro", en: "Light", fr: "Clair", es: "Claro" },
  pref_theme_dark: { "pt-PT": "Escuro", "pt-BR": "Escuro", en: "Dark", fr: "Sombre", es: "Oscuro" },
  pref_language: { "pt-PT": "Idioma", "pt-BR": "Idioma", en: "Language", fr: "Langue", es: "Idioma" },
};

export function translator(loc: Locale) {
  return (key: string): string => {
    const row = T[key];
    if (!row) return key;
    return row[loc] ?? row[DEFAULT_LOCALE] ?? key;
  };
}

// localidade para formatação de datas (Intl)
export const intlLocale: Record<Locale, string> = {
  "pt-PT": "pt-PT", "pt-BR": "pt-BR", en: "en-US", fr: "fr-FR", es: "es-ES",
};
