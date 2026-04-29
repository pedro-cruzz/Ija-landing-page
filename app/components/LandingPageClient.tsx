"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  LayoutDashboard,
  FileDown,
  CalendarDays,
  Users,
  Filter,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Map,
  Shield,
  Zap,
  Sparkles,
  Package,
  Plane,
  BatteryCharging,
  Wrench,
  CarFront,
  UserRound,
  LogOut,
  MoonStar,
  Building2,
  BarChart3,
  Bot,
  ShieldCheck,
  Cloud,
  Smartphone,
  Clock,
  Leaf,
  Target,
  TrendingUp,
  Download,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

import OceanoAzulAboutView from "./OceanoAzulAbout";
import IJADronesProductView from "./IJADronesProductView";
// Importe também o UiKit se for usar na Home
// IMPORTAÇÃO DO SEU LOADING SEPARADO
import Preloader from "../preloader";

// ==============================================================================
// 1. UTILITÁRIOS (ANIMAÇÕES E LAYOUT)
// ==============================================================================
import {
  Reveal,
  AnimatedImageFrame,
  Container,
  Section,
  FeatureCard,
} from "./ui-kit";

type LeadFormField = "name" | "email" | "message" | "form";

type LeadFormState = {
  succeeded: boolean;
  submitting: boolean;
  errors: Partial<Record<LeadFormField, string>>;
};

function createInitialLeadFormState(): LeadFormState {
  return {
    succeeded: false,
    submitting: false,
    errors: {},
  };
}

function FieldError({
  message,
  className = "text-red-500 text-xs mt-1",
}: {
  message?: string;
  className?: string;
}) {
  if (!message) {
    return null;
  }

  return <p className={className}>{message}</p>;
}

function useLeadForm(origin: string) {
  const [state, setState] = useState<LeadFormState>(() =>
    createInitialLeadFormState()
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nome: String(formData.get("name") ?? "").trim(),
      email_cliente: String(formData.get("email") ?? "").trim(),
      telefone: String(formData.get("phone") ?? "").trim(),
      interesse: String(formData.get("interest") ?? "").trim(),
      mensagem: String(formData.get("message") ?? "").trim(),
      origem: origin,
    };

    const nextErrors: LeadFormState["errors"] = {};

    if (!payload.nome) {
      nextErrors.name = "Informe seu nome.";
    }

    if (!payload.email_cliente) {
      nextErrors.email = "Informe seu e-mail.";
    }

    if (!payload.mensagem) {
      nextErrors.message = "Escreva uma mensagem.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setState({
        succeeded: false,
        submitting: false,
        errors: nextErrors,
      });
      return;
    }

    setState({
      succeeded: false,
      submitting: true,
      errors: {},
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            message?: string;
            errors?: LeadFormState["errors"];
          }
        | null;

      if (!response.ok) {
        setState({
          succeeded: false,
          submitting: false,
          errors: {
            ...(result?.errors ?? {}),
            form:
              result?.message ??
              "Não foi possível enviar sua mensagem agora.",
          },
        });
        return;
      }

      form.reset();
      setState({
        succeeded: true,
        submitting: false,
        errors: {},
      });
    } catch {
      setState({
        succeeded: false,
        submitting: false,
        errors: {
          form:
            "Não foi possível conectar ao serviço de e-mail. Tente novamente em instantes.",
        },
      });
    }
  };

  const resetForm = () => {
    setState(createInitialLeadFormState());
  };

  return { state, handleSubmit, resetForm };
}

type SidebarItemProps = {
  activeTab: string;
  id: string;
  icon: LucideIcon;
  label: string;
  onSelect: (id: string) => void;
  theme?: "sky" | "green";
};

function SidebarItem({
  activeTab,
  id,
  icon: Icon,
  label,
  onSelect,
  theme = "sky",
}: SidebarItemProps) {
  const activeClasses =
    theme === "green"
      ? "border border-[#3ca85d]/25 bg-[#d9f0df] text-[#27934f] shadow-sm"
      : "bg-sky-600 text-white shadow-md shadow-sky-600/20";
  const inactiveClasses =
    theme === "green"
      ? "text-slate-700 hover:bg-emerald-50 hover:text-[#247843]"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900";

  return (
    <button
      onClick={() => onSelect(id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
        activeTab === id ? activeClasses : inactiveClasses
      }`}
    >
      <Icon size={16} />
      <span className="hidden md:block">{label}</span>
    </button>
  );
}

// ==============================================================================
// 2. VIEW: IJA DRONES (O SOFTWARE/SaaS) - COMPLETO
// ==============================================================================

function IjaDronesView({
  onBack,
  onNavigateToOceano,
}: {
  onBack: () => void;
  onNavigateToOceano: () => void;
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileContext, setProfileContext] = useState<"uvis" | "agro">(
    "uvis"
  );
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { state, handleSubmit, resetForm } = useLeadForm("IJA Drones");

  const equipmentOverviewCards = [
    {
      title: "DRONES",
      value: "5",
      action: "Ver frota completa",
      valueClass: "text-[#1f5087]",
      actionClass: "text-[#1f5087]",
      accent: "border-l-[#1d6ff2]",
      iconClass: "text-[#46b8d5]",
      icon: Plane,
    },
    {
      title: "BATERIAS",
      value: "18",
      action: "Ver estoque total",
      valueClass: "text-[#1f5087]",
      actionClass: "text-[#f1cb00]",
      accent: "border-l-[#ffc107]",
      iconClass: "text-[#46b8d5]",
      icon: BatteryCharging,
    },
    {
      title: "EM MANUTENÇÃO",
      value: "2",
      action: "Ver equipamentos parados",
      valueClass: "text-[#ef4444]",
      actionClass: "text-[#ef4444]",
      accent: "border-l-[#e8344e]",
      iconClass: "text-[#46b8d5]",
      icon: Wrench,
    },
  ];

  const equipmentInventoryRows = [
    {
      type: "Drone",
      model: "DJI Agras T40",
      serial: "T40-SP-2048",
      status: "Operacional",
      createdAt: "Hoje, 08:12",
    },
    {
      type: "Drone",
      model: "DJI Matrice 300 RTK",
      serial: "M300-UVIS-1132",
      status: "Checklist",
      createdAt: "Hoje, 07:48",
    },
    {
      type: "Bateria",
      model: "DB1560 - Ciclo 128",
      serial: "BAT-1560-128",
      status: "Carregando",
      createdAt: "Hoje, 07:25",
    },
    {
      type: "Tanque",
      model: "Pulverização 50L",
      serial: "TNK-050-022",
      status: "Calibração",
      createdAt: "Ontem, 18:04",
    },
    {
      type: "RTK",
      model: "D-RTK 2 Mobile Station",
      serial: "RTK-BASE-019",
      status: "Manutenção",
      createdAt: "Ontem, 16:41",
    },
  ];

  const equipmentStatusClasses: Record<string, string> = {
    Operacional: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Checklist: "bg-sky-50 text-sky-700 border-sky-100",
    Carregando: "bg-amber-50 text-amber-700 border-amber-100",
    Calibração: "bg-violet-50 text-violet-700 border-violet-100",
    Manutenção: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const vehicleOverviewCards = [
    {
      title: "FROTA",
      value: "5",
      valueClass: "text-[#1f5087]",
      accent: "border-l-[#1d6ff2]",
    },
    {
      title: "REVISÕES",
      value: "1",
      valueClass: "text-[#f1cb00]",
      accent: "border-l-[#ffc107]",
    },
    {
      title: "ATRASADOS",
      value: "1",
      valueClass: "text-[#ef4444]",
      accent: "border-l-[#e8344e]",
    },
    {
      title: "MARCADOS",
      value: "2",
      valueClass: "text-[#1b8c5a]",
      accent: "border-l-[#178b59]",
    },
  ];

  const vehicleFleetRows = [
    {
      vehicle: "Fiat Strada Volcano",
      plate: "FZD-4B21",
      operation: "UVIS Norte",
      owner: "Carlos M.",
      currentKm: "48.220 km",
      remainingKm: "1.780 km",
      lastMove: "Hoje, 08:30",
      status: "Ativo",
    },
    {
      vehicle: "Toyota Hilux SRX",
      plate: "GHT-9C14",
      operation: "Pulverização Agro",
      owner: "André L.",
      currentKm: "71.904 km",
      remainingKm: "320 km",
      lastMove: "Hoje, 06:55",
      status: "Revisão agendada",
    },
    {
      vehicle: "Renault Oroch Pro",
      plate: "QPL-7D08",
      operation: "Base Oeste",
      owner: "Pedro H.",
      currentKm: "39.110 km",
      remainingKm: "2.430 km",
      lastMove: "Ontem, 17:12",
      status: "Checklist marcado",
    },
    {
      vehicle: "Chevrolet S10 LT",
      plate: "JKS-2E77",
      operation: "UVIS Sul",
      owner: "Juliana R.",
      currentKm: "84.560 km",
      remainingKm: "0 km",
      lastMove: "Ontem, 14:08",
      status: "Documento atrasado",
    },
    {
      vehicle: "Ford Ranger XLS",
      plate: "MNV-5H63",
      operation: "Operação Campo",
      owner: "Marcos T.",
      currentKm: "56.340 km",
      remainingKm: "4.260 km",
      lastMove: "Ontem, 11:40",
      status: "Ativo",
    },
  ];

  const vehicleStatusClasses: Record<string, string> = {
    Ativo: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "Revisão agendada": "bg-amber-50 text-amber-700 border-amber-100",
    "Checklist marcado": "bg-sky-50 text-sky-700 border-sky-100",
    "Documento atrasado": "bg-rose-50 text-rose-700 border-rose-100",
  };

  const isAgroContext = profileContext === "agro";
  const currentSystemUrl = isAgroContext
    ? `app.oceanoazul.com/agro/${activeTab}`
    : `app.ijasystem.com/${activeTab}`;
  const currentSidebarItems = isAgroContext
    ? [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "clientes", icon: Users, label: "Clientes" },
        { id: "orcamentos", icon: FileDown, label: "Orçamentos" },
        { id: "contratos", icon: Shield, label: "Contratos" },
        { id: "aprovacoes", icon: CheckCircle2, label: "Contratos Aprov" },
        { id: "os", icon: Wrench, label: "OS" },
        { id: "pilotos", icon: Plane, label: "Pilotos" },
        { id: "equipamentos", icon: Package, label: "Equipamentos" },
      ]
    : [{ id: "dashboard", icon: LayoutDashboard, label: "Dashboard" }];
  const agroOverviewCards = [
    { title: "Clientes ativos", value: "18", accent: "border-l-[#257c46]" },
    { title: "Orçamentos abertos", value: "6", accent: "border-l-[#257c46]" },
    { title: "Contratos vigentes", value: "4", accent: "border-l-[#257c46]" },
    { title: "OS programadas", value: "7", accent: "border-l-[#257c46]" },
    { title: "Pilotos disponíveis", value: "5", accent: "border-l-[#257c46]" },
    { title: "Equipamentos prontos", value: "12", accent: "border-l-[#257c46]" },
  ];
  const agroTabLabels: Record<string, string> = {
    dashboard: "Dashboard",
    clientes: "Clientes",
    orcamentos: "Orçamentos",
    contratos: "Contratos",
    aprovacoes: "Contratos Aprovados",
    os: "Ordens de Serviço",
    pilotos: "Pilotos",
    equipamentos: "Equipamentos",
  };
  const agroModuleConfigs: Record<
    string,
    {
      primaryAction: string;
      summaryLabel: string;
      metrics: Array<{ label: string; value: string; accent: string }>;
      columns: string[];
      rows: string[][];
    }
  > = {
    clientes: {
      primaryAction: "Novo Cliente",
      summaryLabel: "Base comercial atualizada hoje",
      metrics: [
        { label: "Total", value: "18", accent: "border-l-[#257c46]" },
        { label: "Ativos", value: "14", accent: "border-l-[#257c46]" },
        { label: "Novos hoje", value: "2", accent: "border-l-[#f0b429]" },
      ],
      columns: ["Cliente", "Fazenda", "Cidade", "Status", "Atualizado em"],
      rows: [
        ["Grupo Santa Helena", "Fazenda Aurora", "Ribeirão Preto", "Ativo", "Hoje, 09:14"],
        ["Agro Vale Verde", "Talhão Primavera", "Barretos", "Prospecção", "Hoje, 08:22"],
        ["Sítio Horizonte", "Bloco Norte", "Franca", "Ativo", "Ontem, 17:05"],
      ],
    },
    orcamentos: {
      primaryAction: "Novo Orçamento",
      summaryLabel: "Propostas em andamento na operação agro",
      metrics: [
        { label: "Abertos", value: "6", accent: "border-l-[#257c46]" },
        { label: "Aprovados", value: "3", accent: "border-l-[#1f6ed4]" },
        { label: "Pendentes", value: "2", accent: "border-l-[#f0b429]" },
      ],
      columns: ["Cliente", "Área", "Cultura", "Valor", "Status"],
      rows: [
        ["Grupo Santa Helena", "142 ha", "Soja", "R$ 18.700", "Em análise"],
        ["Agro Vale Verde", "96 ha", "Milho", "R$ 11.400", "Enviado"],
        ["Sítio Horizonte", "58 ha", "Pastagem", "R$ 6.980", "Aprovado"],
      ],
    },
    contratos: {
      primaryAction: "Novo Contrato",
      summaryLabel: "Contratos comerciais no padrão da frente agro",
      metrics: [
        { label: "Vigentes", value: "4", accent: "border-l-[#257c46]" },
        { label: "Renovação", value: "1", accent: "border-l-[#f0b429]" },
        { label: "Assinados", value: "2", accent: "border-l-[#1f6ed4]" },
      ],
      columns: ["Contrato", "Cliente", "Cobertura", "Status", "Validade"],
      rows: [
        ["CTR-204", "Grupo Santa Helena", "Pulverização", "Vigente", "30/05/2026"],
        ["CTR-198", "Agro Vale Verde", "Mapeamento", "Assinado", "12/06/2026"],
        ["CTR-191", "Sítio Horizonte", "Aplicação localizada", "Renovação", "21/04/2026"],
      ],
    },
    aprovacoes: {
      primaryAction: "Enviar Aprovação",
      summaryLabel: "Acompanhamento de contratos enviados para aprovação",
      metrics: [
        { label: "Aguardando", value: "3", accent: "border-l-[#f0b429]" },
        { label: "Enviados", value: "5", accent: "border-l-[#257c46]" },
        { label: "Concluídos", value: "2", accent: "border-l-[#1f6ed4]" },
      ],
      columns: ["Contrato", "Responsável", "Etapa", "Status", "Atualizado em"],
      rows: [
        ["CTR-204", "Comercial", "Assinatura digital", "Aguardando", "Hoje, 09:01"],
        ["CTR-198", "Admin", "Conferência", "Enviado", "Ontem, 18:20"],
        ["CTR-191", "Jurídico", "Finalizado", "Concluído", "Ontem, 15:44"],
      ],
    },
    os: {
      primaryAction: "Nova OS",
      summaryLabel: "Ordens de serviço da operação de campo",
      metrics: [
        { label: "Programadas", value: "7", accent: "border-l-[#257c46]" },
        { label: "Em campo", value: "2", accent: "border-l-[#1f6ed4]" },
        { label: "Concluídas", value: "4", accent: "border-l-[#f0b429]" },
      ],
      columns: ["OS", "Cliente", "Piloto", "Área", "Status"],
      rows: [
        ["OS-310", "Grupo Santa Helena", "Carlos M.", "72 ha", "Programada"],
        ["OS-308", "Agro Vale Verde", "André L.", "51 ha", "Em campo"],
        ["OS-304", "Sítio Horizonte", "Pedro H.", "38 ha", "Concluída"],
      ],
    },
    pilotos: {
      primaryAction: "Novo Piloto",
      summaryLabel: "Disponibilidade e escala da equipe operacional",
      metrics: [
        { label: "Disponíveis", value: "5", accent: "border-l-[#257c46]" },
        { label: "Em missão", value: "2", accent: "border-l-[#1f6ed4]" },
        { label: "Certificados", value: "5", accent: "border-l-[#f0b429]" },
      ],
      columns: ["Piloto", "Base", "Escala", "Status", "Último voo"],
      rows: [
        ["Carlos M.", "Ribeirão Preto", "Manhã", "Disponível", "Hoje, 07:10"],
        ["André L.", "Barretos", "Integral", "Em missão", "Hoje, 08:35"],
        ["Pedro H.", "Franca", "Tarde", "Disponível", "Ontem, 16:42"],
      ],
    },
    equipamentos: {
      primaryAction: "Novo Equipamento",
      summaryLabel: "Inventário pronto para a próxima janela de aplicação",
      metrics: [
        { label: "Prontos", value: "12", accent: "border-l-[#257c46]" },
        { label: "Manutenção", value: "2", accent: "border-l-[#ef4444]" },
        { label: "Calibração", value: "1", accent: "border-l-[#f0b429]" },
      ],
      columns: ["Equipamento", "Modelo", "Base", "Status", "Atualizado em"],
      rows: [
        ["Drone 07", "DJI Agras T40", "Ribeirão Preto", "Pronto", "Hoje, 08:00"],
        ["Tanque 03", "Pulverização 50L", "Barretos", "Calibração", "Ontem, 18:10"],
        ["Bateria 21", "WB37", "Franca", "Manutenção", "Ontem, 15:27"],
      ],
    },
  };
  const currentAgroModule = agroModuleConfigs[activeTab];
  const switchProfileContext = (context: "uvis" | "agro") => {
    setProfileContext(context);
    setActiveTab("dashboard");
    setProfileMenuOpen(false);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-0">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 h-30"
      >
        <Container>
          <div className="flex items-center justify-between h-30">
            <div className="relative w-64 h-24">
              <a href="#">
                <Image
                  src="/images/logo-ija-sem-fundo.png"
                  alt="IJA Drones"
                  fill
                  className="object-contain object-left"
                />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Início
              </a>
              <a
                href="#sistema-ija"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sistema
              </a>
              {/* retirar qundo tiver a área de venda de software */}
              <button
                onClick={onNavigateToOceano}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sobre nós
              </button>
              <a
                href="#beneficios-ija"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Recursos
              </a>
              <a
                href="#contato-ija"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Contato
              </a>

              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-sky-600 text-sky-600 font-bold text-sm hover:bg-sky-50 transition-all"
              >
                <ArrowRight className="rotate-180" size={14} /> Voltar para
                Oceano Azul
              </button>

              <a href="#sistema-ija">
                <button className="bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-sky-600/20 hover:bg-sky-700 transition-all">
                  Ver sistema
                </button>
              </a>
            </div>

            <button
              className="md:hidden text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100 py-4 space-y-4">
              <a
                href="#sistema-ija"
                className="block font-medium text-slate-600"
              >
                Sistema
              </a>
              <a
                href="#beneficios-ija"
                className="block font-medium text-slate-600"
              >
                Benefícios
              </a>
              <button
                onClick={onBack}
                className="w-full text-left font-bold text-slate-600 py-2 flex items-center gap-2"
              >
                <ArrowRight className="rotate-180" size={14} /> Voltar
              </button>
            </div>
          )}
        </Container>
      </motion.nav>

      {/* HERO IJA DRONES */}
      <section className="pt-32 pb-16 lg:pt-30 lg:pb-32 bg-white overflow-hidden">
        <Container>
          {/* MUDANÇA 1: Usei 'lg:items-start'. Isso desvincula o centro dos dois elementos. 
                Agora podemos controlar a altura de cada um separadamente com margens. */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
            {/* Lado Esquerdo: Texto */}
            {/* MUDANÇA 2: 'lg:mt-12'. Isso posiciona o texto numa altura fixa e confortável, sem ser afetado pela imagem. */}
            <div className="flex-1 lg:w-1/2 text-center lg:text-left z-10 lg:mt-12">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold mb-6 border border-sky-100">
                  <Zap size={12} /> Software de Gestão Especializado
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                  O sistema operacional da sua{" "}
                  <span className="text-sky-600">frota de drones.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Centralize operações, automatize relatórios e ganhe
                  visibilidade total. De pulverização agrícola a inspeções
                  urbanas em uma única plataforma.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#contato-ija">
                    <button className="px-8 py-3.5 bg-sky-600 text-white rounded-full font-bold shadow-lg hover:bg-sky-700 transition-all">
                      Agendar Demo
                    </button>
                  </a>
                  <a href="#sistema-ija">
                    <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all">
                      Ver Sistema
                    </button>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Lado Direito: Imagem do Drone "Flutuando" */}
            <div className="flex-1 lg:w-1/2 relative w-full flex justify-center items-center lg:mt-44">
              <Reveal
                delay={0.4}
                width="100%"
                className="relative w-full max-w-lg aspect-square"
              >
                {/* Efeito de brilho no fundo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-sky-100/50 rounded-full blur-3xl -z-10"></div>

                {/* Movimento de Flutuar */}
                <motion.div
                  animate={{ y: [0, -25, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <div className="relative w-full h-full rounded-3xl overflow-visible flex items-center justify-center">
                    <Image
                      src="/images/drone.png"
                      alt="Drone IJA System"
                      fill
                      sizes="(min-width: 1024px) 32rem, 100vw"
                      className="object-contain drop-shadow-2xl z-10"
                    />
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* TÍTULO ANTES DO MOCKUP (CORRIGIDO) */}
      <section id="sistema-ija" className="py-10 bg-slate-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-12 flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold mb-6 border border-sky-100 uppercase tracking-wider mx-auto">
                <LayoutDashboard size={12} /> Interface Intuitiva
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Poder e Controle <br />
                <span className="text-sky-600">na Palma da Mão</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Nossa interface foi desenhada para facilitar a vida do gestor.
                Acompanhe cada detalhe da operação em tempo real com clareza.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* MOCKUP INTERATIVO */}
      <div className="max-w-7xl mx-auto px-4 mb-32 -mt-8">
        <div className="relative shadow-2xl border border-slate-200 bg-white overflow-visible">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 bg-white border border-slate-200 h-6 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-mono">
              {currentSystemUrl}
            </div>
            <div className="relative flex justify-end">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((current) => !current)}
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#1f73f2] px-5 text-white shadow-lg shadow-blue-500/20"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/10">
                  <UserRound size={16} />
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-[292px] rounded-[1.35rem] border border-slate-200 bg-white p-5 text-slate-800 shadow-2xl shadow-slate-300/60"
                  >
                    <div className="text-[13px] text-slate-500">
                      Logado como:
                    </div>
                    <div className="mt-1 text-[1.55rem] font-extrabold leading-none text-slate-800">
                      ADMIN
                    </div>

                    <div className="my-3.5 h-px bg-slate-200" />

                    <div className="rounded-full border border-slate-200 bg-slate-50/70 p-1 shadow-inner">
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => switchProfileContext("uvis")}
                          className={`inline-flex h-8.5 items-center justify-center gap-1 rounded-full px-2.5 text-[12px] font-bold transition-colors ${
                            profileContext === "uvis"
                              ? "bg-[#2f88af] text-white shadow-md"
                              : "bg-transparent text-slate-500"
                          }`}
                        >
                          <Building2 size={13} />
                          UVIS e Prefeitura
                        </button>
                        <button
                          type="button"
                          onClick={() => switchProfileContext("agro")}
                          className={`inline-flex h-8.5 items-center justify-center gap-1 rounded-full px-2.5 text-[12px] font-bold transition-colors ${
                            profileContext === "agro"
                              ? "bg-[#e9f7ef] text-[#2f8a4b] shadow-sm"
                              : "bg-transparent text-slate-500"
                          }`}
                        >
                          <Leaf size={13} />
                          Agro
                        </button>
                      </div>
                    </div>

                    <div className="my-3.5 h-px bg-slate-200" />

                    <button
                      type="button"
                      onClick={() =>
                        setDarkModeEnabled((currentMode) => !currentMode)
                      }
                      className="flex w-full items-center justify-between py-1 text-left"
                    >
                      <span className="text-[0.95rem] font-medium text-slate-700">
                        Modo Escuro
                      </span>
                      <span
                        className={`inline-flex h-7.5 w-7.5 items-center justify-center rounded-full ${
                          darkModeEnabled
                            ? "bg-slate-900 text-sky-200"
                            : "bg-sky-50 text-sky-500"
                        }`}
                      >
                        <MoonStar size={15} />
                      </span>
                    </button>

                    <div className="my-3.5 h-px bg-slate-200" />

                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-1 text-left text-[#ef4444]"
                    >
                      <span className="text-[0.95rem] font-medium">Sair</span>
                      <LogOut size={15} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex h-[600px] bg-slate-50/30 text-left">
            {/* SIDEBAR */}
            <div
              className={`w-16 md:w-56 border-r p-4 flex flex-col justify-between ${
                isAgroContext
                  ? "bg-white border-[#dbe8dd]"
                  : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div
                  className={`flex items-center gap-2 mb-8 font-bold ${
                    isAgroContext ? "text-[#237847]" : "text-slate-800"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                      isAgroContext ? "bg-[#2f9750]" : "bg-sky-600"
                    }`}
                  >
                    {isAgroContext ? (
                      <Leaf size={15} fill="currentColor" />
                    ) : (
                      <Zap size={16} fill="currentColor" />
                    )}
                  </div>
                  <span className="hidden md:inline">
                    {isAgroContext ? "IJA System Agro" : "IJA System UVIS"}
                  </span>
                </div>
                <div className="space-y-1">
                  {currentSidebarItems.map((item) => (
                    <SidebarItem
                      key={item.id}
                      activeTab={activeTab}
                      id={item.id}
                      icon={item.icon}
                      label={item.label}
                      onSelect={setActiveTab}
                      theme={isAgroContext ? "green" : "sky"}
                    />
                  ))}
                  {!isAgroContext && (
                    <>
                      <SidebarItem
                        activeTab={activeTab}
                        id="relatorios"
                        icon={FileDown}
                        label="Relatórios"
                        onSelect={setActiveTab}
                      />
                      <SidebarItem
                        activeTab={activeTab}
                        id="agenda"
                        icon={CalendarDays}
                        label="Agenda"
                        onSelect={setActiveTab}
                      />
                      <SidebarItem
                        activeTab={activeTab}
                        id="pilotos"
                        icon={Users}
                        label="Pilotos"
                        onSelect={setActiveTab}
                      />
                      <SidebarItem
                        activeTab={activeTab}
                        id="equipamentos"
                        icon={ShieldCheck}
                        label="Equipamentos"
                        onSelect={setActiveTab}
                      />
                      <SidebarItem
                        activeTab={activeTab}
                        id="veiculos"
                        icon={Map}
                        label="Veículos"
                        onSelect={setActiveTab}
                      />
                    </>
                  )}
                </div>
                </div>
              <div
                className={`hidden md:flex items-center gap-3 p-3 rounded-xl border ${
                  isAgroContext
                    ? "bg-emerald-50/70 border-emerald-100"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isAgroContext
                      ? "bg-emerald-100 border border-emerald-200 text-emerald-700"
                      : "bg-sky-100 border border-sky-200 text-sky-700"
                  }`}
                >
                  {isAgroContext ? "OA" : "PH"}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-700">
                    {isAgroContext ? "Agro" : "Pedro H."}
                  </div>
                  <div className="text-slate-400">
                    {isAgroContext ? "Admin Agro" : "Admin"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 relative">
              {((!isAgroContext &&
                activeTab !== "equipamentos" &&
                activeTab !== "veiculos") ||
                isAgroContext) && (
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 capitalize">
                  {isAgroContext
                    ? activeTab === "dashboard"
                      ? "Painel de Gestão"
                      : agroTabLabels[activeTab]
                    : activeTab === "dashboard"
                      ? "Painel de Gestão"
                      : activeTab === "relatorios"
                        ? "Relatórios e Exportações"
                        : activeTab === "agenda"
                          ? "Agenda, Rotas e KML"
                          : "Pilotos, Frota e Veículos"}
                </h2>
                <div className="flex gap-2">
                  {isAgroContext ? (
                    <>
                      <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm flex items-center gap-2">
                        <Filter size={14} /> Filtros
                      </button>
                      {activeTab === "dashboard" ? (
                        <button className="h-8 px-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-medium text-[#257c46] shadow-sm flex items-center gap-2">
                          <CalendarDays size={14} /> Agenda
                        </button>
                      ) : (
                        <button className="h-8 px-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs font-medium text-[#257c46] shadow-sm flex items-center gap-2">
                          <Plus size={14} />{" "}
                          {currentAgroModule?.primaryAction ?? "Novo Registro"}
                        </button>
                      )}
                    </>
                  ) : activeTab === "pilotos" ? (
                    <>
                      <button className="h-8 px-3 rounded-lg bg-white border border-slate-200 text-xs flex items-center gap-1 font-medium text-slate-600 shadow-sm">
                        <Plus size={12} /> Novo Drone
                      </button>
                      <button className="h-8 px-3 rounded-lg bg-sky-600 text-white text-xs flex items-center gap-1 font-medium shadow-sm hover:bg-sky-700 transition-colors">
                        <Plus size={12} /> Novo Piloto
                      </button>
                    </>
                  ) : activeTab === "agenda" ? (
                    <>
                      <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm flex items-center gap-2">
                        <Filter size={14} /> Filtros
                      </button>
                      <button className="h-8 px-3 bg-sky-50 border border-sky-100 rounded-lg text-xs font-medium text-sky-600 shadow-sm flex items-center gap-2">
                        <Map size={14} /> Importar KML
                      </button>
                    </>
                  ) : (
                    <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm flex items-center gap-2">
                      <Filter size={14} /> Filtros
                    </button>
                  )}
                  {((!isAgroContext &&
                    (activeTab === "dashboard" ||
                      activeTab === "relatorios" ||
                      activeTab === "pilotos")) ||
                    isAgroContext) && (
                    <button
                      className={`h-8 px-3 rounded-lg text-xs font-medium shadow-sm flex items-center gap-2 ${
                        isAgroContext
                          ? "bg-emerald-50 border border-emerald-100 text-[#257c46]"
                          : "bg-sky-50 border border-sky-100 text-sky-600"
                      }`}
                    >
                      <Download size={14} /> Exportar
                    </button>
                  )}
                </div>
                </div>
              )}

              <div className="flex-1 min-h-0 relative ">
                {/* CONTEÚDO DAS ABAS (MANTIDO O MOCKUP ANTERIOR) */}
                {isAgroContext && activeTab === "dashboard" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 h-full"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {agroOverviewCards.map((item, index) => (
                        <div
                          key={item.title}
                          className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4 ${item.accent}`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-[11px] font-bold text-slate-400 uppercase">
                                {item.title}
                              </div>
                              <div className="text-3xl font-bold text-slate-800 mt-2">
                                {item.value}
                              </div>
                              <div className="text-xs text-[#257c46] font-bold mt-3">
                                {index < 3 ? "Operação atual" : "Atualizado hoje"}
                              </div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#257c46] flex items-center justify-center">
                              {index === 0 ? (
                                <Users size={20} />
                              ) : index === 1 ? (
                                <FileDown size={20} />
                              ) : index === 2 ? (
                                <Shield size={20} />
                              ) : index === 3 ? (
                                <Wrench size={20} />
                              ) : index === 4 ? (
                                <Plane size={20} />
                              ) : (
                                <Package size={20} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-lg border border-slate-200 p-3 flex justify-between items-center shadow-sm cursor-pointer hover:bg-slate-50">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#257c46]">
                        <Filter size={16} /> Filtros de Operação
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-slate-400 rotate-90"
                      />
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-[#257c46]">
                            Fazenda Aurora | Aplicação do Dia
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase">
                              Confirmada
                            </span>
                            <span className="px-2 py-0.5 bg-slate-500 text-white text-[10px] font-bold rounded uppercase">
                              Soja
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={14}
                              className="text-[#257c46]"
                            />{" "}
                            16/04/2026 às 06:30
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[#257c46]" />{" "}
                            Ribeirão Preto - SP
                          </div>
                          <div className="pl-6 text-slate-400">
                            Talhão Primavera | 72 hectares
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#257c46] text-white rounded text-xs font-bold hover:bg-[#1f663a] shadow-sm">
                            <Edit size={12} /> Editar
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 text-white rounded text-xs font-bold hover:bg-slate-800 shadow-sm">
                            <Download size={12} /> Ordem
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6 text-xs">
                        <div className="relative">
                          <input
                            type="text"
                            value="Talhão Primavera - 72 ha - Aplicação líquida"
                            readOnly
                            className="w-full h-9 pl-3 pr-8 rounded border border-slate-200 bg-slate-50 text-slate-700"
                          />
                          <div className="absolute right-2 top-2 text-[#257c46]">
                            <Leaf size={16} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            className="w-full h-8 px-2 rounded border border-slate-200"
                            placeholder="Volume: 18 L/ha"
                          />
                          <input
                            className="w-full h-8 px-2 rounded border border-slate-200"
                            placeholder="Janela: 06:30-09:00"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-y-1 mt-2">
                          <span className="text-slate-500">Cliente:</span>{" "}
                          <span className="font-bold text-slate-800">
                            Grupo Santa Helena
                          </span>
                          <span className="text-slate-500">Piloto:</span>{" "}
                          <span className="font-bold text-slate-800">
                            Carlos M.
                          </span>
                          <span className="text-slate-500">Equipamento:</span>{" "}
                          <span className="font-bold text-slate-800">
                            DJI Agras T40
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6">
                        <div className="border border-slate-200 rounded-lg p-3 space-y-3">
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">
                              Status da OS
                            </span>
                            <div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                                Confirmada
                              </div>
                              <ChevronDown
                                size={12}
                                className="text-slate-400"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">
                              Janela climática
                            </span>
                            <div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between">
                              Favorável
                              <ChevronDown
                                size={12}
                                className="text-slate-400"
                              />
                            </div>
                          </div>
                          <button className="w-full h-8 rounded bg-[#257c46] text-white text-xs font-bold hover:bg-[#1f663a] shadow-sm">
                            Confirmar voo
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Clock size={15} className="text-[#257c46]" />
                          Últimos orçamentos
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          Comercial e operação
                        </span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#267742] text-white uppercase text-[10px]">
                          <tr>
                            <th className="px-4 py-3">Cliente</th>
                            <th className="px-4 py-3">Fazenda</th>
                            <th className="px-4 py-3">Cultura</th>
                            <th className="px-4 py-3">Área</th>
                            <th className="px-4 py-3">Valor</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            [
                              "Grupo Santa Helena",
                              "Fazenda Aurora",
                              "Soja",
                              "142 ha",
                              "R$ 18.700",
                              "Em análise",
                            ],
                            [
                              "Agro Vale Verde",
                              "Talhão Primavera",
                              "Milho",
                              "96 ha",
                              "R$ 11.400",
                              "Enviado",
                            ],
                            [
                              "Sítio Horizonte",
                              "Bloco Norte",
                              "Pastagem",
                              "58 ha",
                              "R$ 6.980",
                              "Aprovado",
                            ],
                          ].map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                              {item.slice(0, 5).map((value) => (
                                <td
                                  key={value}
                                  className="px-4 py-3 text-slate-600"
                                >
                                  {value}
                                </td>
                              ))}
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-[#257c46] uppercase">
                                  {item[5]}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
                {isAgroContext && activeTab !== "dashboard" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-5 h-full"
                  >
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto_auto] gap-3 items-end">
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            Módulo
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            {agroTabLabels[activeTab]} <ChevronDown size={14} />
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            Status
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            Todos <ChevronDown size={14} />
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            Base
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            Todas <ChevronDown size={14} />
                          </div>
                        </div>
                        <button className="h-11 px-5 rounded-xl bg-[#257c46] text-white text-sm font-bold shadow-sm">
                          Filtrar
                        </button>
                        <button className="h-11 px-5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500">
                          Limpar
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500">
                      {currentAgroModule?.summaryLabel ??
                        "Dados operacionais do módulo agro"}
                    </p>
                    <h3 className="text-lg font-bold text-slate-800">
                      {agroTabLabels[activeTab]}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {currentAgroModule?.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={`bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 ${metric.accent}`}
                        >
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            {metric.label}
                          </div>
                          <div className="text-2xl font-bold text-slate-800">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">
                        <Leaf size={16} className="text-[#257c46]" />
                        Lista de {agroTabLabels[activeTab]}
                      </div>
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[#267742] text-white uppercase text-[10px]">
                          <tr>
                            {currentAgroModule?.columns.map((column) => (
                              <th key={column} className="px-4 py-3">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {currentAgroModule?.rows.map((row, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${cell}-${cellIndex}`}
                                  className={`px-4 py-3 ${
                                    cellIndex === row.length - 1
                                      ? ""
                                      : cellIndex === 0
                                        ? "font-semibold text-slate-700"
                                        : "text-slate-600"
                                  }`}
                                >
                                  {cellIndex === row.length - 1 ? (
                                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-[#257c46] uppercase">
                                      {cell}
                                    </span>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
                {!isAgroContext && activeTab === "dashboard" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-4 h-full"
                  >
                    <div className="hidden grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4 border-l-sky-500">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase">
                              Drones cadastrados
                            </div>
                            <div className="text-3xl font-bold text-slate-800 mt-2">
                              12
                            </div>
                            <div className="text-xs text-sky-600 font-bold mt-3">
                              Ver frota completa
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
                            <Zap size={22} />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4 border-l-amber-400">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase">
                              Baterias rastreadas
                            </div>
                            <div className="text-3xl font-bold text-slate-800 mt-2">
                              37
                            </div>
                            <div className="text-xs text-amber-500 font-bold mt-3">
                              Ciclos e estoque em tempo real
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                            <Sparkles size={20} />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 border-l-4 border-l-rose-500">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[11px] font-bold text-slate-400 uppercase">
                              Em manutenção
                            </div>
                            <div className="text-3xl font-bold text-slate-800 mt-2">
                              3
                            </div>
                            <div className="text-xs text-rose-500 font-bold mt-3">
                              Equipamentos aguardando liberação
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                            <ShieldCheck size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Shield size={20} className="text-slate-700" /> Detalhes
                        da Ocorrência
                      </h2>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-3 flex justify-between items-center shadow-sm cursor-pointer hover:bg-slate-50">
                      <div className="flex items-center gap-2 text-sm font-bold text-sky-600">
                        <Filter size={16} /> Filtros de Busca
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-slate-400 rotate-90"
                      />
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-base font-bold text-sky-700">
                            UVIS Teste QA
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase">
                              Aprovado
                            </span>
                            <span className="px-2 py-0.5 bg-slate-500 text-white text-[10px] font-bold rounded uppercase">
                              Sul
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={14} className="text-sky-500" />{" "}
                            08/01/2026 às 13:00
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-sky-500" /> Av.
                            Paulista, 09 - Bela Vista
                          </div>
                          <div className="pl-6 text-slate-400">
                            CEP: 01310-930
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-500 text-white rounded text-xs font-bold hover:bg-sky-600 shadow-sm">
                            <Edit size={12} /> Editar
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 shadow-sm">
                            <Trash2 size={12} /> Deletar
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6 text-xs">
                        <div className="relative">
                          <input
                            type="text"
                            value="-23.55819, -46.65984"
                            readOnly
                            className="w-full h-9 pl-3 pr-8 rounded border border-slate-200 bg-slate-50 text-slate-700 font-mono"
                          />
                          <div className="absolute right-2 top-2 text-red-400">
                            <Map size={16} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            className="w-full h-8 px-2 rounded border border-slate-200"
                            placeholder="-23.55819"
                          />
                          <input
                            className="w-full h-8 px-2 rounded border border-slate-200"
                            placeholder="-46.65984"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-y-1 mt-2">
                          <span className="text-slate-500">Tipo:</span>{" "}
                          <span className="font-bold text-slate-800">
                            Culex
                          </span>
                          <span className="text-slate-500">Foco:</span>{" "}
                          <span className="font-bold text-slate-800">
                            Imóvel Abandonado
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6">
                        <div className="border border-slate-200 rounded-lg p-3 space-y-3">
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">
                              Status
                            </span>
                            <div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />{" "}
                                Aprovar
                              </div>
                              <ChevronDown
                                size={12}
                                className="text-slate-400"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">
                              Piloto responsável
                            </span>
                            <div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between">
                              Piloto 1 (LESTE)
                              <ChevronDown
                                size={12}
                                className="text-slate-400"
                              />
                            </div>
                          </div>
                          <button className="w-full h-8 rounded bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 shadow-sm">
                            Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Clock size={15} className="text-sky-600" />
                          Atividades recentes de cadastro
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          Equipamentos, drones e baterias
                        </span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#27558b] text-white uppercase text-[10px]">
                          <tr>
                            <th className="px-4 py-3">Tipo</th>
                            <th className="px-4 py-3">Renomeação / Modelo</th>
                            <th className="px-4 py-3">Nº de série</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Cadastrado em</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            [
                              "Bateria",
                              "ANDRE 20",
                              "7PAKMCBCG22KM3",
                              "No drone",
                              "Hoje, 08:42",
                            ],
                            [
                              "Drone",
                              "ANDRE 020 / Pulverizador",
                              "OA-DRN-204",
                              "Ativo",
                              "Hoje, 09:15",
                            ],
                            [
                              "Bateria",
                              "PLOA 19",
                              "7PAKMCBCG228C3",
                              "Em estoque",
                              "Ontem, 17:20",
                            ],
                          ].map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-semibold text-slate-700">
                                {item[0]}
                              </td>
                              <td className="px-4 py-3 text-slate-600">
                                {item[1]}
                              </td>
                              <td className="px-4 py-3 text-slate-400 font-mono">
                                {item[2]}
                              </td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase">
                                  {item[3]}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-500">
                                {item[4]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
                {!isAgroContext && activeTab === "relatorios" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-5 h-full"
                  >
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.4fr_1.4fr_auto_auto] gap-3 items-end">
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            Mês
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            Todos <ChevronDown size={14} />
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            Ano
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            2026 <ChevronDown size={14} />
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            Região
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            Todas as regiões <ChevronDown size={14} />
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">
                            UVIS
                          </div>
                          <div className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 flex items-center justify-between text-sm font-medium text-slate-600">
                            Todas as unidades <ChevronDown size={14} />
                          </div>
                        </div>
                        <button className="h-11 px-5 rounded-xl bg-sky-600 text-white text-sm font-bold shadow-sm">
                          Filtrar
                        </button>
                        <button className="h-11 px-5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500">
                          Limpar
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">
                      Período selecionado:{" "}
                      <span className="font-bold text-slate-700">
                        Todos os períodos
                      </span>
                    </p>
                    <h3 className="text-lg font-bold text-slate-800">
                      Dados de Janeiro / 2026
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-800">
                        <div className="text-[10px] font-bold text-slate-400">
                          TOTAL
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                          5
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                        <div className="text-[10px] font-bold text-slate-400">
                          APROVADAS
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                          1
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500">
                        <div className="text-[10px] font-bold text-slate-400 leading-tight">
                          APROVADAS C/ RECOM.
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                          2
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
                        <div className="text-[10px] font-bold text-slate-400">
                          RECUSADAS
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                          0
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-yellow-500">
                        <div className="text-[10px] font-bold text-slate-400">
                          EM ANÁLISE
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                          1
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-cyan-500">
                        <div className="text-[10px] font-bold text-slate-400">
                          PENDENTES
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                          1
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center relative">
                        <div className="absolute top-4 left-4 font-bold text-slate-700 text-sm flex items-center gap-2">
                          <div className="w-3 h-3 bg-sky-500 rounded-full" />{" "}
                          Status
                        </div>
                        <div className="w-48 h-48 rounded-full border-[20px] border-slate-100 border-t-emerald-500 border-r-orange-500 border-b-sky-500 transform rotate-45"></div>
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
                        <div className="absolute top-4 left-4 font-bold text-slate-700 text-sm flex items-center gap-2">
                          <MapPin size={16} className="text-sky-600" />{" "}
                          Solicitações por Região
                        </div>
                        <div className="mt-12 space-y-4">
                          <div>
                            <div className="text-xs font-bold text-slate-600 mb-1">
                              OESTE
                            </div>
                            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full w-[90%] bg-blue-600 rounded-full" />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-600 mb-1">
                              NORTE
                            </div>
                            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full w-[10%] bg-blue-600 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">
                          <MapPin size={16} className="text-sky-600" /> Por
                          Região
                        </div>
                        <table className="w-full text-left text-sm">
                          <thead className="bg-[#27558b] text-white uppercase text-[10px]">
                            <tr>
                              <th className="px-5 py-3">Região</th>
                              <th className="px-5 py-3 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              ["Centro", "5"],
                              ["Norte", "2"],
                              ["Casa Verde", "2"],
                              ["Leste", "1"],
                            ].map((item, index) => (
                              <tr key={index}>
                                <td className="px-5 py-4 text-slate-700">
                                  {item[0]}
                                </td>
                                <td className="px-5 py-4 text-right font-bold text-slate-700">
                                  {item[1]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">
                          <LayoutDashboard
                            size={16}
                            className="text-sky-600"
                          />{" "}
                          Por UVIS
                        </div>
                        <table className="w-full text-left text-sm">
                          <thead className="bg-[#27558b] text-white uppercase text-[10px]">
                            <tr>
                              <th className="px-5 py-3">UVIS</th>
                              <th className="px-5 py-3 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              ["UVIS Sé", "4"],
                              ["UVIS Casa Verde / Cachoeirinha", "2"],
                              ["UVIS Vila Maria / Vila Guilherme", "2"],
                              ["UVIS Butantã", "2"],
                            ].map((item, index) => (
                              <tr key={index}>
                                <td className="px-5 py-4 text-slate-700">
                                  {item[0]}
                                </td>
                                <td className="px-5 py-4 text-right font-bold text-slate-700">
                                  {item[1]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
                {!isAgroContext && activeTab === "agenda" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                      <div className="flex gap-1">
                        <button className="p-1 text-slate-500">
                          <ChevronRight size={16} className="rotate-180" />
                        </button>
                        <button className="p-1 text-slate-500">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 capitalize">
                        Janeiro 2026
                      </h3>
                      <div className="flex bg-slate-100 rounded p-1">
                        <button className="px-3 py-0.5 bg-slate-800 text-white rounded text-[10px] font-bold">
                          Mês
                        </button>
                        <button className="px-3 py-0.5 text-slate-500 text-[10px] font-bold">
                          Lista
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 grid grid-cols-7 gap-px border-b border-slate-200">
                      {[
                        "DOM.",
                        "SEG.",
                        "TER.",
                        "QUA.",
                        "QUI.",
                        "SEX.",
                        "SÁB.",
                      ].map((d) => (
                        <div
                          key={d}
                          className="bg-slate-50 py-2 text-center text-[10px] font-bold text-slate-400 tracking-wider"
                        >
                          {d}
                        </div>
                      ))}
                      {[...Array(35)].map((_, i) => {
                        const day = i > 3 ? i - 3 : null;
                        return (
                          <div
                            key={i}
                            className={`bg-white p-1 min-h-[60px] relative ${
                              !day ? "bg-slate-50/50" : ""
                            }`}
                          >
                            <span className="text-[10px] text-slate-400 font-medium block mb-1">
                              {day && day <= 31 ? day : ""}
                            </span>
                            {day === 7 && (
                              <div className="flex flex-col gap-1">
                                <div className="bg-sky-500 text-white text-[8px] px-1 rounded truncate font-medium">
                                  12:45 Terreno Baldi
                                </div>
                                <div className="bg-sky-500 text-white text-[8px] px-1 rounded truncate font-medium">
                                  13:00 Imóvel Aband.
                                </div>
                              </div>
                            )}
                            {day === 10 && (
                              <div className="bg-sky-500 text-white text-[8px] px-1 rounded truncate font-medium">
                                11:00 Piscina / Caixa
                              </div>
                            )}
                            {day === 12 && (
                              <div className="absolute bottom-1 right-1 w-5 h-5 bg-slate-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                12
                              </div>
                            )}
                            {day === 12 && (
                              <div className="mt-6 bg-sky-500 text-white text-[8px] px-1 rounded truncate font-medium">
                                18:20 Ponto Estrat.
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
                {!isAgroContext && activeTab === "pilotos" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-700">
                        Total: 5
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                          <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Nome</th>
                            <th className="px-4 py-3">Região</th>
                            <th className="px-4 py-3">Telefone</th>
                            <th className="px-4 py-3 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {[
                            {
                              id: "#1",
                              name: "Piloto 1",
                              reg: "LESTE",
                              tel: "(99) 99999-9999",
                            },
                            {
                              id: "#2",
                              name: "Piloto 2",
                              reg: "NORTE",
                              tel: "(35) 90000-0000",
                            },
                            {
                              id: "#3",
                              name: "Piloto 3",
                              reg: "OESTE",
                              tel: "(22) 22222-2222",
                            },
                            {
                              id: "#4",
                              name: "Piloto 4",
                              reg: "LESTE",
                              tel: "(35) 99860-3656",
                            },
                            {
                              id: "#5",
                              name: "Piloto 5",
                              reg: "OESTE",
                              tel: "(11) 99999-9999",
                            },
                          ].map((pilot, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-slate-500">
                                {pilot.id}
                              </td>
                              <td className="px-4 py-3 font-bold text-slate-700">
                                {pilot.name}
                              </td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold text-slate-500 uppercase">
                                  {pilot.reg}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sky-600 font-bold flex items-center gap-1">
                                <Phone
                                  size={10}
                                  fill="currentColor"
                                  className="opacity-50"
                                />{" "}
                                {pilot.tel}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <button className="flex items-center gap-1 px-2 py-1 bg-sky-600 text-white rounded text-[10px] font-bold hover:bg-sky-700">
                                    <Edit size={10} /> Editar
                                  </button>
                                  <button className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-[10px] font-bold hover:bg-red-600">
                                    <Trash2 size={10} /> Excluir
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
                {!isAgroContext && activeTab === "equipamentos" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full flex-col gap-5"
                  >
                    <div className="flex items-center gap-3 text-[#1f5087]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                        <Package size={18} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-800">
                          Gestão de Equipamentos
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Visão geral de hardware e ativos da Oceano Azul.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      {equipmentOverviewCards.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.title}
                            className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm border-l-4 ${item.accent}`}
                          >
                            <div className="flex min-h-[72px] items-start justify-between gap-4">
                              <div>
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                                  {item.title}
                                </div>
                                <div
                                  className={`mt-2 text-3xl font-bold ${item.valueClass}`}
                                >
                                  {item.value}
                                </div>
                              </div>
                              <div className={`pt-0.5 ${item.iconClass}`}>
                                <Icon size={32} strokeWidth={1.8} />
                              </div>
                            </div>
                            <button
                              type="button"
                              className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${item.actionClass}`}
                            >
                              {item.action}
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center gap-3 px-4 py-4 text-[#1f5087]">
                        <Clock size={18} className="text-sky-500" />
                        <h3 className="text-lg font-bold">
                          Atividades Recentes de Cadastro
                        </h3>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="overflow-hidden rounded-xl border border-slate-200">
                          <table className="w-full text-left">
                            <thead className="bg-[#25558b] text-white uppercase text-[11px] tracking-wide">
                              <tr>
                                <th className="px-4 py-4">Tipo</th>
                                <th className="px-4 py-4">Renomeação / Modelo</th>
                                <th className="px-4 py-4">Nº de série</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Cadastrado em</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {equipmentInventoryRows.map((item) => (
                                <tr
                                  key={item.serial}
                                  className="border-t border-slate-100 hover:bg-slate-50"
                                >
                                  <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                    {item.type}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-600">
                                    {item.model}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-500">
                                    {item.serial}
                                  </td>
                                  <td className="px-4 py-4">
                                    <span
                                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                        equipmentStatusClasses[item.status]
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-500">
                                    {item.createdAt}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <p className="pt-2 text-center text-sm text-slate-500">
                      &copy; 2026 <span className="font-bold">Oceano Azul</span>.
                      {" "}Todos os direitos reservados.
                    </p>
                  </motion.div>
                )}
                {!isAgroContext && activeTab === "veiculos" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex h-full flex-col gap-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-3 text-[#1f5087]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                          <CarFront size={18} />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-800">
                          Frota de Veículos
                        </h3>
                      </div>

                      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
                        <button
                          type="button"
                          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-500 shadow-sm"
                        >
                          <ArrowRight className="rotate-180" size={14} />
                          Voltar
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#10a4cf] px-4 text-xs font-bold text-white shadow-sm"
                        >
                          <Plus size={14} />
                          Novo Veículo
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#2e5b94] px-4 text-xs font-bold text-white shadow-sm"
                        >
                          <FileDown size={14} />
                          Ver Logs
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-[#2e5b94] bg-white px-4 text-xs font-bold text-[#2e5b94] shadow-sm"
                        >
                          <CheckCircle2 size={14} />
                          Checklist Semanal
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-[#2e9160] px-4 text-xs font-bold text-white shadow-sm"
                        >
                          <Download size={14} />
                          Exportar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {vehicleOverviewCards.map((item) => (
                        <div
                          key={item.title}
                          className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm border-l-4 ${item.accent}`}
                        >
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                            {item.title}
                          </div>
                          <div className={`mt-2 text-3xl font-bold ${item.valueClass}`}>
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                      <div className="flex items-center justify-between gap-4 text-[#1f5087]">
                        <div className="flex items-center gap-3">
                          <Filter size={20} />
                          <h3 className="text-lg font-bold">
                            Filtros de Busca
                          </h3>
                        </div>
                        <ChevronDown size={18} className="text-slate-400" />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="px-4 pb-4 pt-4">
                        <div className="overflow-hidden rounded-xl border border-slate-200">
                          <table className="w-full text-left">
                            <thead className="bg-[#25558b] text-white uppercase text-[11px] tracking-wide">
                              <tr>
                                <th className="px-4 py-4">Veículo / Placa</th>
                                <th className="px-4 py-4">Frota / Op.</th>
                                <th className="px-4 py-4">Responsável</th>
                                <th className="px-4 py-4">KM Atual</th>
                                <th className="px-4 py-4">KM Restante</th>
                                <th className="px-4 py-4">Última Movimentação</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Ações</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {vehicleFleetRows.map((item) => (
                                <tr
                                  key={item.plate}
                                  className="border-t border-slate-100 hover:bg-slate-50"
                                >
                                  <td className="px-4 py-4">
                                    <div className="font-semibold text-slate-700">
                                      {item.vehicle}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                      {item.plate}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-600">
                                    {item.operation}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-600">
                                    {item.owner}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-600">
                                    {item.currentKm}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-600">
                                    {item.remainingKm}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-slate-500">
                                    {item.lastMove}
                                  </td>
                                  <td className="px-4 py-4">
                                    <span
                                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                                        vehicleStatusClasses[item.status]
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex gap-2">
                                      <button className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-1.5 text-[11px] font-bold text-sky-700">
                                        <Edit size={12} />
                                        Editar
                                      </button>
                                      <button className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-600">
                                        <FileDown size={12} />
                                        Logs
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <p className="pt-2 text-center text-sm text-slate-500">
                      &copy; 2026 <span className="font-bold">Oceano Azul</span>.
                      {" "}Todos os direitos reservados.
                    </p>
                  </motion.div>
                )}
                {false && activeTab === "equipamentos" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6 h-full"
                  >
                    <div className="flex items-center gap-3 text-[#1f5087]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm">
                        <Package size={24} />
                      </div>
                      <div>
                        <h3 className="text-4xl font-extrabold tracking-tight">
                          Gestão de Equipamentos
                        </h3>
                        <p className="mt-2 text-lg font-medium text-slate-500">
                          Visão geral de hardware e ativos da Oceano Azul.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                      {equipmentOverviewCards.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.title}
                            className={`bg-white rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/60 p-6 md:p-7 border-l-4 ${item.accent}`}
                          >
                            <div className="flex items-start justify-between gap-4 min-h-[110px]">
                              <div>
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                                  {item.title}
                                </div>
                                <div
                                  className={`mt-3 text-5xl font-extrabold ${item.valueClass}`}
                                >
                                  {item.value}
                                </div>
                              </div>
                              <div className={`pt-1 ${item.iconClass}`}>
                                <Icon size={46} strokeWidth={1.8} />
                              </div>
                            </div>
                            <button
                              type="button"
                              className={`mt-7 inline-flex items-center gap-2 text-lg font-bold ${item.actionClass}`}
                            >
                              {item.action}
                              <ArrowRight size={18} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/60 overflow-hidden">
                      <div className="px-6 py-6 flex items-center gap-3 text-[#1f5087]">
                        <Clock size={22} className="text-sky-500" />
                        <h3 className="text-2xl font-extrabold">
                          Atividades Recentes de Cadastro
                        </h3>
                      </div>
                      <div className="px-6 pb-6">
                        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
                          <table className="w-full text-left">
                            <thead className="bg-[#25558b] text-white uppercase text-[11px] tracking-wide">
                              <tr>
                                <th className="px-5 py-5">Tipo</th>
                                <th className="px-5 py-5">RenomeaÃ§Ã£o / Modelo</th>
                                <th className="px-5 py-5">NÂº de sÃ©rie</th>
                                <th className="px-5 py-5">Status</th>
                                <th className="px-5 py-5">Cadastrado em</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr>
                                <td
                                  colSpan={5}
                                  className="px-5 py-10 text-center text-sm text-slate-400"
                                >
                                  Nenhum equipamento cadastrado ainda.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <p className="pt-2 text-center text-sm text-slate-500">
                      Â© 2026 <span className="font-bold">Oceano Azul</span>. Todos
                      os direitos reservados.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO RECURSOS (CORRIGIDO) */}
      <Section id="beneficios-ija">
        <Container>
          <div className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold mb-6 border border-sky-100 uppercase tracking-wider mx-auto">
                <Sparkles size={12} /> Recursos Completos
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Tudo que sua operação <br />
                <span className="text-sky-600">precisa</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Ferramentas construídas especificamente para otimizar o fluxo de
                trabalho de gestores e pilotos.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-6 items-stretch sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              title="Mapeamento Inteligente"
              desc="Planejamento automático de rotas e áreas."
              icon={MapPin}
              delay={0}
            />
            <FeatureCard
              title="Analytics Avançado"
              desc="Relatórios e métricas em tempo real."
              icon={BarChart3}
              delay={0.1}
            />
            <FeatureCard
              title="Cloud Computing"
              desc="Dados sincronizados e acessíveis."
              icon={Cloud}
              delay={0.2}
            />
            <FeatureCard
              title="Segurança Total"
              desc="Criptografia e backups automáticos."
              icon={ShieldCheck}
              delay={0.3}
            />
            <FeatureCard
              title="App Mobile"
              desc="Controle via aplicativo iOS e Android."
              icon={Smartphone}
              delay={0.4}
            />
            <FeatureCard
              title="Otimização de Tempo"
              desc="Reduza até 60% do tempo de gestão."
              icon={Clock}
              delay={0.5}
            />
            <FeatureCard
              title="Multi-usuário"
              desc="Gestão de equipes e permissões."
              icon={Users}
              delay={0.6}
            />
            <FeatureCard
              title="Processamento Rápido"
              desc="Dados processados instantaneamente."
              icon={Zap}
              delay={0.7}
            />
          </div>
        </Container>
      </Section>

      {/* SEÇÃO DE CONTATO (MANTIDA CONFORME PEDIDO) */}
      <section id="contato-ija" className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100">
                  <Mail size={12} /> Entre em Contato
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Solicite uma Demo{" "}
                  <span className="text-blue-600">do IJA System</span>
                </h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  Nossa equipe está pronta para demonstrar como o software pode
                  revolucionar sua operação.
                </p>
              </Reveal>
              <div className="space-y-8">
                <Reveal delay={0.2}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        Email
                      </h4>
                      <p className="text-slate-500 mt-1">
                        suporte@ijadrones.com.br
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        Suporte
                      </h4>
                      <p className="text-slate-500 mt-1">+55 (35) 99239-4222</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal
              delay={0.2}
              className="lg:col-span-5 lg:col-start-8 w-full bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8">
                    Obrigado pelo interesse. Entraremos em contato em breve para
                    agendar sua demonstração.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-blue-600 font-bold hover:text-blue-700 hover:underline text-sm transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                    >
                      Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                    />
                    <FieldError message={state.errors.name} />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                    />
                    <FieldError message={state.errors.email} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                      >
                        Telefone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                      >
                        Interesse
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-600 cursor-pointer"
                      >
                        <option value="">Selecione...</option>
                        <option value="Demo do Sistema">Demo do Sistema</option>
                        <option value="Dúvida Técnica">Dúvida Técnica</option>
                        <option value="Parceria">Parceria</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Conte-nos sobre sua operação..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
                    ></textarea>
                    <FieldError message={state.errors.message} />
                  </div>
                  <FieldError
                    message={state.errors.form}
                    className="text-red-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FOOTER IJA DRONES */}
      <footer className="bg-[#0f172a] text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 items-start">
            <div className="lg:col-span-4 flex flex-col items-start">
              <div
                className="relative w-auto h-16 mb-5 cursor-pointer"
                onClick={onBack}
              >
                <Image
                  src="/images/logo-ija-sem-fundo.png"
                  alt="IJA Drones"
                  width={240}
                  height={68}
                  className="h-full w-auto object-contain object-left"
                />
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
                Soluções tecnológicas avançadas para o mercado de drones e
                aviação agrícola.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-2"></div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Produto</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li>
                  <a
                    href="#beneficios-ija"
                    className="hover:text-white transition-colors block"
                  >
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a
                    href="#sistema-ija"
                    className="hover:text-white transition-colors block"
                  >
                    Demo
                  </a>
                </li>
                <li>
                  <a
                    href="#beneficios-ija"
                    className="hover:text-white transition-colors block"
                  >
                    Recursos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors block"
                  >
                    Para Empresas
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Navegação</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li>
                  <button
                    onClick={onNavigateToOceano}
                    className="space-y-3 text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors block"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <button
                    onClick={onBack}
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    Voltar ao Site{" "}
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Suporte</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li>
                  <a
                    href="#contato-ija"
                    className="hover:text-white transition-colors block"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#sistema-ija"
                    className="hover:text-white transition-colors block"
                  >
                    Status do Sistema
                  </a>
                </li>
                <li>
                  <a
                    href="#contato-ija"
                    className="hover:text-white transition-colors block"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              &copy; 2026 IJA System / Oceano Azul. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-6 font-medium">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// ==============================================================================
// 3. VIEW: OCEANO AZUL (HOME INSTITUCIONAL)
// ==============================================================================

function OceanoAzulView({
  onNavigateToSystem,
  onNavigateToAboutOceano,
}: {
  onNavigateToSystem: () => void;
  onNavigateToAboutOceano: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { state, handleSubmit, resetForm } = useLeadForm("Oceano Azul");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lógica de Física do Drone
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 });
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 h-30"
      >
        <Container>
          <div className="flex items-center justify-between h-30">
            <div className="relative w-60 h-24">
              <a href="#">
                {" "}
                <Image
                  src="/images/oceano-azul-logo-sem-fundo.png"
                  alt="Logo oeceano azul"
                  fill
                  className="object-contain object-left"
                />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#inicio"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Início
              </a>
              <button
                onClick={onNavigateToAboutOceano}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sobre Nós
              </button>
              <a
                href="#servicos"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Serviços
              </a>
              <a
                href="#beneficios"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Benefícios
              </a>
              <a
                href="#contato-oceano"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Contato
              </a>

              <button
                onClick={onNavigateToSystem}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all"
              >
                IJA Drones <ArrowRight size={14} />
              </button>
              <a href="#contato-oceano">
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                  Solicitar Orçamento
                </button>
              </a>
            </div>
            <button
              className="md:hidden text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-100 py-4 space-y-4">
              <a href="#inicio" className="block font-medium text-slate-600">
                Início
              </a>
              <a href="#servicos" className="block font-medium text-slate-600">
                Serviços
              </a>
              <button
                onClick={onNavigateToSystem}
                className="w-full text-left font-bold text-blue-600 py-2 flex items-center gap-2"
              >
                IJA Drones <ArrowRight size={14} />
              </button>
            </div>
          )}
        </Container>
      </motion.nav>

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden"
      >
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 tracking-wide uppercase border border-blue-100 h-7">
                  <Sparkles size={12} /> Serviços Profissionais de Pulverização
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                  Pulverização com Drones <br />
                  <span className="text-blue-600">Rápida e Eficiente</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Especialistas em pulverização agrícola e urbana com drones de
                  última geração. Atendemos produtores rurais e órgãos públicos
                  no combate à dengue.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#contato-oceano">
                    <button className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      Solicitar Orçamento <ArrowRight size={16} />
                    </button>
                  </a>
                  <a href="#servicos">
                    <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all">
                      Nossos Serviços
                    </button>
                  </a>
                </div>
              </Reveal>
            </div>

            <div
              className="flex-1 w-full h-[400px] lg:h-[500px] relative flex items-center justify-center cursor-crosshair perspective-1000 group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                x.set(0);
                y.set(0);
              }}
            >
              <motion.div
                animate={{
                  opacity: isHovering ? 0.6 : 0.2,
                  scale: isHovering ? 1.05 : 1,
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-[3rem] -z-10 blur-3xl pointer-events-none"
              ></motion.div>
              <motion.div
                animate={{
                  opacity: isHovering ? 0.5 : 0.8,
                  scale: isHovering ? 0.8 : 1,
                  y: isHovering ? 80 : 60,
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-12 bg-blue-900/20 blur-2xl rounded-[100%] pointer-events-none"
              ></motion.div>
              <motion.div
                style={{
                  x: mouseX,
                  y: mouseY,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  z: 0,
                }}
                animate={{
                  y: isHovering ? -30 : 0,
                  scale: isHovering ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="relative w-full max-w-md aspect-square z-20 pointer-events-none flex items-center justify-center"
              >
                <div className="relative w-80 h-80">
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-b from-blue-500 to-blue-700 rounded-3xl shadow-lg shadow-blue-500/50 z-20 flex items-center justify-center border border-blue-400/50 transition-all duration-500 ${
                      isHovering ? "brightness-110" : "brightness-75 grayscale"
                    }`}
                  >
                    <motion.div
                      animate={
                        isHovering
                          ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }
                          : { scale: 1, opacity: 0 }
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-12 h-12 bg-blue-300 rounded-full blur-md absolute"
                    ></motion.div>
                    <Bot
                      size={64}
                      className="text-white drop-shadow-lg relative z-10"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-200/30 rounded-full z-10"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-2 bg-blue-200/30 rotate-45 z-10"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-2 bg-blue-200/30 -rotate-45 z-10"></div>
                  <div className="absolute top-0 left-0 w-36 h-36 flex items-center justify-center">
                    <motion.div
                      animate={isHovering ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 0.1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-full h-full rounded-full bg-gradient-to-tr from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                    ></motion.div>
                  </div>
                  <div className="absolute top-0 right-0 w-36 h-36 flex items-center justify-center">
                    <motion.div
                      animate={isHovering ? { rotate: -360 } : { rotate: 0 }}
                      transition={{
                        duration: 0.1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-full h-full rounded-full bg-gradient-to-tl from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                    ></motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-36 h-36 flex items-center justify-center">
                    <motion.div
                      animate={isHovering ? { rotate: -360 } : { rotate: 0 }}
                      transition={{
                        duration: 0.1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                    ></motion.div>
                    <div
                      className={`absolute w-3 h-3 bg-blue-100 rounded-full shadow-[0_0_15px_3px_rgba(219,234,254,0.6)] z-30 bottom-10 left-10 transition-opacity duration-500 ${
                        isHovering ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-36 h-36 flex items-center justify-center">
                    <motion.div
                      animate={isHovering ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 0.1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-full h-full rounded-full bg-gradient-to-bl from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                    ></motion.div>
                    <div
                      className={`absolute w-3 h-3 bg-blue-100 rounded-full shadow-[0_0_15px_3px_rgba(219,234,254,0.6)] z-30 bottom-10 right-10 transition-opacity duration-500 ${
                        isHovering ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVIÇOS (CORRIGIDO) */}
      <section id="servicos" className="py-20 bg-slate-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100 uppercase tracking-wider mx-auto">
                <Zap size={12} /> Nossos Serviços
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Soluções Profissionais <br />
                <span className="text-blue-600">para Cada Necessidade</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Atendemos produtores rurais e órgãos públicos com serviços
                especializados.
              </p>
            </Reveal>
          </div>
          {/* ... restante do código da grid de serviços ... */}
          <div className="space-y-24">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    <Leaf size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Pulverização Agrícola
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Aplicação precisa de defensivos e fertilizantes em lavouras.
                    Cobertura uniforme e economia de até 90% de água comparado
                    aos métodos tradicionais.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-blue-600" /> Sem
                      amassamento da cultura
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-blue-600" />{" "}
                      Aplicação em áreas de difícil acesso
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-blue-600" />{" "}
                      Redução de deriva
                    </li>
                  </ul>
                  <a href="#contato-oceano">
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                      Solicitar Orçamento
                    </button>
                  </a>
                </div>
                <div className="order-1 md:order-2">
                  <AnimatedImageFrame className="h-80 shadow-lg bg-slate-200">
                    <Image
                      src="/images/drone-agro.png"
                      alt="pulverização agrícola com drones"
                      fill
                      className="object-cover"
                    />
                  </AnimatedImageFrame>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                id="dengue"
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <AnimatedImageFrame className="h-80 shadow-lg bg-slate-200">
                  <Image
                    src="/images/drone-dengue.png"
                    alt="Controle de Dengue e Monitoramento Urbano"
                    fill
                    className="object-cover"
                  />
                </AnimatedImageFrame>
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Controle de Dengue
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Pulverização urbana especializada no combate ao mosquito
                    Aedes aegypti. Parceria com prefeituras e órgãos de saúde
                    pública.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-600 text-sm">
                      <ShieldCheck size={16} className="text-blue-600" />{" "}
                      Cobertura urbana total
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 text-sm">
                      <ShieldCheck size={16} className="text-blue-600" />{" "}
                      Segurança para a população
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 text-sm">
                      <ShieldCheck size={16} className="text-blue-600" />{" "}
                      Mapeamento de focos
                    </li>
                  </ul>
                  <a href="#contato-oceano">
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                      Solicitar Orçamento
                    </button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* BENEFÍCIOS (CORRIGIDO) */}
      <section id="beneficios" className="py-20 bg-slate-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100 uppercase tracking-wider mx-auto">
                <Sparkles size={12} /> Vantagens Exclusivas
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Por Que Escolher a <br />
                <span className="text-blue-600">Oceano Azul?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Benefícios comprovados que fazem a diferença real no seu
                negócio.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <FeatureCard
              title="Economia de Tempo"
              icon={Clock}
              desc="Até 60x mais rápido que pulverização tradicional."
              delay={0}
            />
            <FeatureCard
              title="Redução de Custos"
              icon={DollarSign}
              desc="Menos desperdício de insumos e mão de obra."
              delay={0.05}
            />
            <FeatureCard
              title="Sustentabilidade"
              icon={Leaf}
              desc="Economia de até 90% de água nas aplicações."
              delay={0.1}
            />
            <FeatureCard
              title="Precisão Máxima"
              icon={Target}
              desc="Aplicação uniforme em terrenos irregulares."
              delay={0.15}
            />
            <FeatureCard
              title="Maior Produtividade"
              icon={TrendingUp}
              desc="Melhor aproveitamento dos defensivos."
              delay={0.2}
            />
            <FeatureCard
              title="Segurança"
              icon={Users}
              desc="Menor exposição do trabalhador a agrotóxicos."
              delay={0.25}
            />
            <FeatureCard
              title="Equipe Certificada"
              icon={Shield}
              desc="Pilotos competentes e habilitados pela DECEA."
              delay={0.3}
            />
            <FeatureCard
              title="Cobertura Regional"
              icon={MapPin}
              desc="Atendimento em toda sua região, garantindo cobertura completa."
              delay={0.35}
            />
          </div>
        </Container>
      </section>

      {/* CTA AZUL */}
      <section id="equipe" className="py-16 bg-slate-50">
        <div className="w-full px-4 md:px-6">
          <Reveal
            width="100%"
            className="relative rounded-[2.5rem] overflow-hidden bg-blue-700 py-16 md:py-20 px-6 shadow-xl mx-auto w-full max-w-[1280px]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/equipe-bg.png"
                alt="Equipe Profissional Oceano Azul"
                fill
                className="object-cover opacity-70 mix-blend-overlay"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-blue-700/80 to-blue-800/90 z-10"></div>
            <div className="relative z-20 text-center text-white max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Equipe Profissional e Certificada
              </h2>
              <p className="text-blue-50/90 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                Conte com especialistas experientes e equipamentos de última
                geração para garantir os melhores resultados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#contato-oceano">
                  <button className="px-8 py-3 bg-white text-blue-700 rounded-full font-bold text-base hover:bg-blue-50 transition-all shadow-md">
                    Agendar Visita Técnica
                  </button>
                </a>
                <a href="#contato-oceano">
                  <button className="px-8 py-3 border border-white text-white rounded-full font-bold text-base hover:bg-white/10 transition-all">
                    Falar com Especialista
                  </button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORMULÁRIO DE CONTATO */}
      <section id="contato-oceano" className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100">
                  <Mail size={12} /> Entre em Contato
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Solicite um Orçamento{" "}
                  <span className="text-blue-600">Sem Compromisso</span>
                </h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  Nossa equipe está pronta para atender você e apresentar a
                  melhor solução para suas necessidades.
                </p>
              </Reveal>
              <div className="space-y-8">
                <Reveal delay={0.2}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        Email
                      </h4>
                      <p className="text-slate-500 mt-1">
                        contato@oceanoazul.com.br
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        WhatsApp
                      </h4>
                      <p className="text-slate-500 mt-1">+55 (11) 98765-4321</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        Localização
                      </h4>
                      <p className="text-slate-500 mt-1">São Paulo, Brasil</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal
              delay={0.2}
              className="lg:col-span-5 lg:col-start-8 w-full bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8">
                    Obrigado pelo contato. Nossa equipe analisará sua
                    solicitação e responderá em breve.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-blue-600 font-bold hover:text-blue-700 hover:underline text-sm transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                    >
                      Nome Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                    />
                    <FieldError message={state.errors.name} />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                    />
                    <FieldError message={state.errors.email} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                      >
                        Telefone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interest"
                        className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                      >
                        Interesse
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-600 cursor-pointer"
                      >
                        <option value="">Selecione...</option>
                        <option value="Pulverização Agrícola">
                          Pulverização Agrícola
                        </option>
                        <option value="Controle de Dengue">
                          Controle de Dengue
                        </option>
                        <option value="Mapeamento Aéreo">
                          Mapeamento Aéreo
                        </option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Conte-nos sobre sua necessidade..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
                    ></textarea>
                    <FieldError message={state.errors.message} />
                  </div>
                  <FieldError
                    message={state.errors.form}
                    className="text-red-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FOOTER OCEANO AZUL */}
      <footer className="bg-[#0f172a] text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 items-start">
            <div className="lg:col-span-4 flex flex-col items-start">
              <div
                className="relative w-auto h-16 mb-5 cursor-pointer"
                onClick={onNavigateToSystem}
              >
                <Image
                  src="/images/oceano-azul-logo-sem-fundo.png"
                  alt="Oceano Azul"
                  width={220}
                  height={64}
                  className="h-full w-auto object-contain object-left"
                />
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
                Especialistas em pulverização com drones para agricultura e
                controle urbano. Tecnologia e precisão a seu serviço.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/oceanoazul.drones?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="blank_"
                  className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-900/20"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/agroazul/"
                  target="blank_"
                  className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-900/20"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2"></div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Serviços</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li>
                  <a
                    href="#servicos"
                    className="hover:text-white transition-colors block"
                  >
                    Pulverização Agrícola
                  </a>
                </li>
                <li>
                  <a
                    href="#dengue"
                    className="hover:text-white transition-colors block"
                  >
                    Controle de Dengue
                  </a>
                </li>
                <li>
                  <a
                    href="#contato-oceano"
                    className="hover:text-white transition-colors block"
                  >
                    Consultoria Técnica
                  </a>
                </li>
                <li>
                  <a
                    href="#contato-oceano"
                    className="hover:text-white transition-colors block"
                  >
                    Orçamentos
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Empresa</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li>
                  <button
                    onClick={onNavigateToAboutOceano}
                    className="space-y-3 text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <a
                    href="#equipe"
                    className="hover:text-white transition-colors block"
                  >
                    Equipe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors block"
                  >
                    Certificações
                  </a>
                </li>
                <li>
                  <button
                    onClick={onNavigateToSystem}
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    IJA Drones{" "}
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Suporte</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li>
                  <a
                    href="#contato-oceano"
                    className="hover:text-white transition-colors block"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#beneficios"
                    className="hover:text-white transition-colors block"
                  >
                    Área de Cobertura
                  </a>
                </li>
                <li>
                  <a
                    href="#contato-oceano"
                    className="hover:text-white transition-colors block"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors block"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; 2026 Oceano Azul. Todos os direitos reservados.</p>
            <div className="flex gap-6 font-medium">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// ==============================================================================
// 4. COMPONENTE PRINCIPAL (CONTROLADOR ATUALIZADO)
// ==============================================================================

export default function Page() {
  const [currentView, setCurrentView] = useState<
    "home" | "system" | "about_oceano" | "product_ija"
  >("home");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        style={{
          height: isLoading ? "100vh" : "auto",
          overflow: isLoading ? "hidden" : "visible",
        }}
      >
        <AnimatePresence mode="wait">
          {/* --- TELA 1: HOME --- */}
          {/* Aqui é onde o usuário acessa o "Sobre a Oceano Azul" */}
          {currentView === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OceanoAzulView
                onNavigateToSystem={() => setCurrentView("system")}
                // Link 1: Vai para a Empresa (Institucional)
                onNavigateToAboutOceano={() => setCurrentView("about_oceano")}
              />
            </motion.div>
          ) : /* --- TELA 2: SISTEMA (IJA DRONES) --- */
          currentView === "system" ? (
            <motion.div
              key="system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IjaDronesView
                onBack={() => setCurrentView("home")}
                onNavigateToOceano={() => setCurrentView("home")}
              />
            </motion.div>
          ) : /* --- TELA 3: SOBRE A EMPRESA (Oceano Azul) --- */
          currentView === "about_oceano" ? (
            <motion.div
              key="about_oceano"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OceanoAzulAboutView
                // Inteligente: Se o usuário veio da IJA, ao clicar em voltar,
                // você pode decidir se ele volta para a Home ou para o Sistema.
                onBack={() => setCurrentView("home")}
                onNavigateToSystem={() => setCurrentView("system")}
              />
            </motion.div>
          ) : (
            /* --- TELA 4: SOBRE O PRODUTO (IJA Drones) --- */
            <motion.div
              key="product_ija"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IJADronesProductView onBack={() => setCurrentView("home")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
