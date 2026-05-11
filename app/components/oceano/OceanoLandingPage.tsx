"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  MapPin,
  Users,
  Shield,
  Zap,
  ChevronDown,
  Sparkles,
  Bot,
  Clock,
  Microscope,
  Leaf,
  Target,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Wrench,
  PlayCircle,
} from "lucide-react";

import { FieldError, useLeadForm } from "../shared/lead-form";
import {
  Reveal,
  Container,
  FeatureCard,
} from "../ui-kit";

const partnerBrands = [
  { name: "Agrovale", image: "/images/marcas/agrovale.png" },
  { name: "Associcana", image: "/images/marcas/associcana.png" },
  { name: "Atvos", image: "/images/marcas/atvos.png" },
  { name: "Bayer", image: "/images/marcas/bayer.png" },
  { name: "COFCO International", image: "/images/marcas/cofco_intl.png" },
  { name: "Coplacana", image: "/images/marcas/coplacana.png" },
  { name: "Coplana", image: "/images/marcas/coplana.png" },
  { name: "Duratex", image: "/images/marcas/duratex.png" },
  { name: "Embrapa", image: "/images/marcas/embrapa.png" },
  { name: "Enel", image: "/images/marcas/enel.png" },
  { name: "Fundecitrus", image: "/images/marcas/fundecitrus.png" },
  { name: "Grupo Viralcool", image: "/images/marcas/grupo_viralcohol.png" },
  {
    name: "Oxiquímica Agrociencia",
    image: "/images/marcas/oxiquimica_agrociencia.png",
  },
  {
    name: "Prefeitura de Jaboticabal",
    image: "/images/marcas/prefeitura_jaboticabal.png",
  },
  {
    name: "Prefeitura de São Paulo",
    image: "/images/marcas/prefeitura_sao_paulo.png",
  },
  {
    name: "Prefeitura de São Roque",
    image: "/images/marcas/prefeitura_sao_roque.png",
  },
  {
    name: "Prefeitura de Sertãozinho",
    image: "/images/marcas/prefeitura_sertaozinho.png",
  },
  { name: "Raízen", image: "/images/marcas/raizen.png" },
  { name: "Rumo", image: "/images/marcas/rumo.png" },
  {
    name: "Santa Luiza Agropecuária",
    image: "/images/marcas/santa_luiza_agropecuaria.png",
  },
  { name: "São Martinho", image: "/images/marcas/sao_martinho.png" },
  { name: "Suzano", image: "/images/marcas/suzano.png" },
  { name: "Syngenta", image: "/images/marcas/syngenta.png" },
  { name: "Umoe Bioenergy", image: "/images/marcas/umoe_bioenergy.png" },
  { name: "Usina Batatais", image: "/images/marcas/usina_batatais.png" },
  { name: "Usina Itajobi", image: "/images/marcas/usina_itajobi.png" },
  {
    name: "Usina Santa Clotilde",
    image: "/images/marcas/usina_santa_clotilde.png",
  },
  { name: "Vale", image: "/images/marcas/vale.png" },
];

function HeroVideo() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-blue-200/40 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-slate-950 shadow-2xl shadow-blue-950/20">
        <video
          className="aspect-[9/12] w-full object-cover sm:aspect-[4/5] lg:aspect-[5/6]"
          src="/videos/oceano-hero.mp4"
          poster="/images/drones_empresa.jpeg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-700/25 via-slate-950/5 to-slate-950/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[0.65rem] font-bold uppercase tracking-wide text-blue-100">
              Operação em campo
            </div>
            <div className="mt-1 max-w-[14rem] text-lg font-extrabold leading-tight text-white">
              Drones aplicados a missões reais
            </div>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/90 text-blue-700 shadow-lg backdrop-blur">
            <PlayCircle size={22} />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 right-5 z-30 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-xl shadow-blue-950/10">
        <div className="text-[0.65rem] font-bold uppercase tracking-wide text-blue-600">
          Vídeo institucional
        </div>
        <div className="text-sm font-extrabold text-slate-900">
          Oceano Azul
        </div>
      </div>
    </div>
  );
}

function PartnerLogoCarousel() {
  return (
    <section className="border-y border-slate-200/70 bg-white py-14">
      <Container>
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600 shadow-sm shadow-blue-100/60">
            <Zap size={14} className="fill-blue-100" />
            Marcas parceiras
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Empresas e instituições que caminham com a Oceano Azul
          </h2>
        </div>
      </Container>

      <div className="logo-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />

        <div className="logo-marquee-track flex w-max items-center gap-12 px-6">
          {[partnerBrands, partnerBrands].map((brandGroup, groupIndex) => (
            <div
              key={groupIndex}
              className={`flex items-center gap-12 ${
                groupIndex === 1 ? "logo-marquee-copy" : ""
              }`}
              aria-hidden={groupIndex === 1}
            >
              {brandGroup.map((brand) => (
                <div
                  key={`${brand.name}-${groupIndex}`}
                  className="flex h-28 w-56 shrink-0 items-center justify-center rounded-lg px-4 py-4 transition duration-300 hover:bg-slate-50 md:h-32 md:w-64 lg:h-36 lg:w-72"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={280}
                    height={140}
                    className="max-h-24 w-auto max-w-full scale-110 object-contain opacity-70 grayscale transition duration-300 hover:scale-125 hover:opacity-100 hover:grayscale-0 md:max-h-28 lg:max-h-32"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCaseValue({
  value,
  countTo,
  suffix = "",
}: {
  value: string;
  countTo?: number;
  suffix?: string;
}) {
  const valueRef = React.useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(
    countTo ? `0${suffix}` : value
  );

  React.useEffect(() => {
    const currentValue = valueRef.current;

    if (!currentValue || countTo === undefined || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentValue);

    return () => observer.disconnect();
  }, [countTo, hasStarted]);

  React.useEffect(() => {
    if (!hasStarted || countTo === undefined) return;

    const duration = 850;
    const startedAt = performance.now();
    let animationFrame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(countTo * easedProgress);

      setDisplayValue(`${currentValue.toLocaleString("pt-BR")}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [countTo, hasStarted, suffix]);

  return (
    <span
      ref={valueRef}
      className="block text-4xl font-extrabold tracking-tight text-slate-950 tabular-nums"
    >
      {countTo === undefined ? value : displayValue}
    </span>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: {
    title: string;
    area: string;
    image: string;
    description: string;
    highlights: string[];
  };
  index: number;
}) {
  return (
    <article className="group relative isolate flex h-full min-h-[34rem] flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm shadow-blue-950/5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-950/15">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.14),transparent_36%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative h-60 overflow-hidden bg-slate-900">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-blue-950/10 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-600/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-extrabold text-white shadow-sm backdrop-blur">
          0{index + 1}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
          {service.area}
        </span>
        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 shadow-lg shadow-blue-950/20 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-xl font-extrabold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
          {service.title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
        <ul className="mt-auto space-y-3 border-t border-slate-100 pt-5">
          {service.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-sm text-slate-600"
            >
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-blue-600 transition-transform duration-300 group-hover:scale-110"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function OceanoLandingPage({
  onNavigateToAboutOceano,
}: {
  onNavigateToAboutOceano: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const { state, handleSubmit, resetForm } = useLeadForm("Oceano Azul");

  const solutionCards = [
    {
      title: "Pulverização Agrícola com Drones",
      area: "Agricultura",
      image: "/images/pulverizacao_agricola.jpeg",
      description:
        "Aplicações precisas para nutrição e proteção de culturas, com maior uniformidade e menor uso de insumos.",
      highlights: [
        "Cobertura eficiente em áreas extensas",
        "Redução de deriva e desperdício",
        "Acesso a terrenos de difícil passagem",
      ],
    },
    {
      title: "Aplicação de Biológicos, Sólidos e Sementes",
      area: "Operação agrícola",
      image: "/images/aplicacao_biologicos.jpeg",
      description:
        "Entrega controlada de defensivos biológicos, sementes e sólidos com com alta precisão.",
      highlights: [
        "Distribuição homogênea em superfícies críticas",
        "Operação segura e rastreável",
        "Compatibilidade com diversos produtos",
      ],
    },
    {
      title: "Geoprocessamento e Mapeamento Aéreo",
      area: "Inteligência territorial",
      image: "/images/geoprocessamento.jpeg",
      description:
        "Levantamentos aéreos que geram mapas úteis para tomada de decisão e análise de desempenho.",
      highlights: [
        "Dados georreferenciados de alta resolução",
        "Mapas temáticos e ortomosaicos",
        "Monitoramento periódico por estação",
      ],
    },
    {
      title: "Relatórios Técnicos e Suporte à Decisão",
      area: "Análise técnica",
      image: "/images/relatorio.jpeg",
      description:
        "Análises detalhadas e relatórios estratégicos para orientar investimentos e ações no campo e na cidade.",
      highlights: [
        "Diagnóstico de áreas críticas",
        "Recomendações técnicas claras",
        "Suporte para planejamento operacional",
      ],
    },
    {
      title: "Combate à Dengue com Drones",
      area: "Saúde pública",
      image: "/images/pulverizacao_dengue.png",
      description:
        "Ações rápidas com pulverização urbana direcionada e captação de pontos de foco do Aedes aegypti.",
      highlights: [
        "Aplicação precisa em locais de difícil acesso",
        "Integração com programas de saúde pública",
        "Cobertura eficiente em perímetros urbanos",
      ],
    },
    {
      title: "Monitoramento para Auxílio no Combate à Dengue",
      area: "Vigilância sanitária",
      image: "/images/monitoramento_dengue.jpeg",
      description:
        "Monitoramento aéreo dedicado para identificar áreas de risco e apoiar ações preventivas.",
      highlights: [
        "Mapeamento de focos e reservatórios",
        "Relatórios para fiscalização local",
        "Auxílio a equipes de campo em tempo real",
      ],
    },
    {
      title: "Manejo Inteligente de Vegetação — MIV",
      area: "Vegetação",
      image: "/images/gestao_vegetativa_MIV.png",
      description:
        "Gestão vegetativa através do controle seletivo de vegetação, com economia na manutenção.",
      highlights: [
        "Avaliação da saúde vegetal",
        "Planejamento de corte e conservação",
        "Redução de custos operacionais",
      ],
    },
    {
      title: "Inspeção de Torres e Ativos de Energia",
      area: "Energia",
      image: "/images/inspecao_torres.jpeg",
      description:
        "Inspeções aéreas de alta segurança para torres, linhas de transmissão e ativos críticos.",
      highlights: [
        "Detecção de falhas e corrosão",
        "Menor tempo de parada de ativos",
        "Relatórios visuais de fácil interpretação",
      ],
    },
    {
      title: "Georreferenciamento Urbano",
      area: "Cidades",
      image: "/images/georreferenciamento.jpeg",
      description:
        "Serviços de posicionamento preciso para projetos urbanos, topografia e obras civis.",
      highlights: [
        "Coleta de pontos GNSS acurada",
        "Superfícies e limites precisos",
        "Base para projetos de engenharia",
      ],
    },
    {
      title: "Monitoramento de Eventos e Segurança Pública",
      area: "Segurança",
      image: "/images/monitoramento_festas.jpeg",
      description:
        "Soluções de vigilância aérea para apoiar a gestão de grandes eventos e operações de segurança.",
      highlights: [
        "Cobertura aérea em tempo real",
        "Visualização de ambientes complexos",
        "Apoio moderno a forças de segurança",
      ],
    },
    {
      title: "Limpeza de Placas Solares com Drones",
      area: "Energia solar",
      image: "/images/limpeza_placas.jpeg",
      description:
        "Manutenção aérea eficiente para aumentar a performance de usinas solares sem riscos à estrutura.",
      highlights: [
        "Remoção suave de sujeira e poeira",
        "Redução de perdas de geração",
        "Intervenção rápida e prática",
      ],
    },
  ];
  const featuredSolutions = [
    solutionCards[0],
    solutionCards[4],
    solutionCards[7],
  ];
  const additionalSolutions = solutionCards.filter(
    (service) => !featuredSolutions.some((featured) => featured.title === service.title)
  );
  const technicalSheet = [
    {
      label: "Empresa",
      value: "Oceano Azul Comércio Internacional LTDA",
      detail: "Operações técnicas com drones para campo, cidade e infraestrutura.",
      icon: Building2,
    },
    {
      label: "Sede e base operacional",
      value: "Barueri, SP",
      detail: "Atendimento regional com equipe preparada para operações externas.",
      icon: MapPin,
    },
    {
      label: "Base de PDI",
      value: "Itajubá, MG",
      detail: "Pesquisa aplicada, testes de equipamentos e melhoria de processos.",
      icon: Microscope,
    },
    {
      label: "Início das atividades",
      value: "2019",
      detail: "Experiência acumulada em operações agrícolas, urbanas e industriais.",
      icon: CalendarDays,
    },
    {
      label: "Áreas de atuação",
      value: "Agro, cidades, energia e infraestrutura",
      detail: "Projetos para saúde pública, eventos, ativos, vegetação e topografia.",
      icon: Target,
    },
    {
      label: "Tecnologias utilizadas",
      value: "Drones, sensores e equipamentos de campo",
      detail: "Pulverizadores, câmeras, GNSS, baterias, estações de recarga e acessórios.",
      icon: Bot,
    },
    {
      label: "Experiência operacional",
      value: "Planejamento, execução e entrega técnica",
      detail: "Missões conduzidas com segurança, rastreabilidade e equipe especializada.",
      icon: Shield,
    },
    {
      label: "Frota técnica",
      value: "Equipamentos por missão",
      detail: "Configurações dedicadas para mapeamento, pulverização e operações urbanas.",
      icon: Wrench,
    },
  ];
  const caseNumbers = [
    {
      value: "70.000+",
      countTo: 70000,
      suffix: "+",
      label: "hectares agrícolas",
      description:
        "Área atendida em operações agrícolas com drones, pulverização, mapeamento e apoio técnico.",
      icon: Leaf,
    },
    {
      value: "1.500+",
      countTo: 1500,
      suffix: "+",
      label: "hectares em dengue",
      description:
        "Área coberta em ações urbanas de apoio ao combate e monitoramento da dengue.",
      icon: Shield,
    },
    {
      value: "50.000+",
      countTo: 50000,
      suffix: "+",
      label: "voos urbanos",
      description:
        "Missões realizadas em ambientes urbanos para mapeamento, monitoramento e suporte técnico.",
      icon: Building2,
    },
    {
      value: "Nacional",
      label: "atuação territorial",
      description:
        "Projetos realizados em diversos estados e municípios, com adaptação ao contexto de cada operação.",
      icon: MapPin,
    },
  ];
  const fleetCategories = [
    {
      title: "Mapeamento e inspeção",
      icon: Target,
      items: [
        "Drones para mapeamento aéreo",
        "Câmeras RGB de alta resolução",
        "Receptores GNSS e pontos de controle",
        "Kits de inspeção visual para ativos",
      ],
    },
    {
      title: "Pulverização agrícola",
      icon: Leaf,
      items: [
        "Drones pulverizadores agrícolas",
        "Tanques, bicos e bombas de aplicação",
        "Kits para biológicos, sólidos e sementes",
        "Baterias e carregadores para operação contínua",
      ],
    },
    {
      title: "Operações urbanas",
      icon: Building2,
      items: [
        "Drones para saúde pública e monitoramento",
        "Equipamentos para aplicação urbana direcionada",
        "Câmeras para eventos e segurança pública",
        "Materiais de sinalização e isolamento da área",
      ],
    },
    {
      title: "Apoio operacional",
      icon: Wrench,
      items: [
        "Veículos de apoio em campo",
        "Estações de recarga e energia",
        "EPIs para equipes técnicas",
        "Ferramentas de manutenção e calibração",
      ],
    },
  ];
  const differentiators = [
    {
      title: "Operação completa",
      description:
        "Do planejamento à entrega técnica, a operação é conduzida com processo, rastreabilidade e suporte em campo.",
      icon: CheckCircle2,
    },
    {
      title: "Equipe multidisciplinar",
      description:
        "Profissionais preparados para conectar tecnologia, análise territorial, operação aérea e demandas do cliente.",
      icon: Users,
    },
    {
      title: "Atuação rural, urbana e industrial",
      description:
        "Soluções aplicadas em lavouras, cidades, infraestrutura, energia, saúde pública e ambientes operacionais complexos.",
      icon: Building2,
    },
    {
      title: "Equipamentos de última geração",
      description:
        "Frota com equipamentos reconhecidos pelo mercado, preparada para precisão, estabilidade e produtividade.",
      icon: Bot,
    },
    {
      title: "Experiência com diferentes perfis",
      description:
        "Atendimento a prefeituras, empresas privadas e estatais, adaptando cada projeto ao contexto institucional.",
      icon: Shield,
    },
    {
      title: "Segurança, sustentabilidade e qualidade",
      description:
        "Execução com foco em proteção da equipe, menor impacto ambiental e padrão técnico de entrega.",
      icon: Leaf,
    },
  ];
  const courseCards = [
    {
      title: "Curso Básico de Pilotagem de Drones",
      description:
        "Formação introdutória para operação segura, boas práticas de voo, preparação de equipamento e noções essenciais para pilotos iniciantes.",
      highlights: [
        "Noções de segurança e preparação para voo",
        "Boas práticas de pilotagem e operação em campo",
        "Cuidados básicos com equipamento, bateria e missão",
      ],
      icon: GraduationCap,
      image: "/images/curso_piloto.jpeg",
    },
  ];
  const footerServices = [
    { label: "Pulverização Agrícola", href: "#servicos" },
    { label: "Combate à Dengue", href: "#servicos" },
    { label: "Mapeamento e Geoprocessamento", href: "#servicos" },
    { label: "Inspeções Técnicas", href: "#servicos" },
    { label: "Manejo de Vegetação", href: "#servicos" },
    { label: "Monitoramento de Eventos", href: "#servicos" },
  ];
  const footerCompany = [
    { label: "Quem Somos", type: "button" },
    { label: "Nossa Frota", href: "#ficha-tecnica" },
    { label: "Missão, Visão e Valores", type: "button" },
    { label: "Cursos e Capacitação", href: "#cursos" },
    { label: "P&D", href: "#ficha-tecnica" },
  ];
  const footerSupport = [
    { label: "Solicitar Orçamento", href: "#contato-oceano" },
    { label: "Falar com Especialista", href: "#contato-oceano" },
    { label: "Atendimento para Prefeituras", href: "#contato-oceano" },
    { label: "Atendimento para Produtores Rurais", href: "#contato-oceano" },
    {
      label: "Atendimento para Empresas de Energia e Infraestrutura",
      href: "#contato-oceano",
    },
  ];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                href="#ficha-tecnica"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Ficha Técnica
              </a>
              <a
                href="#diferenciais"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Diferenciais
              </a>
              <a
                href="#cursos"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Cursos
              </a>
              <a
                href="#contato-oceano"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Contato
              </a>

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
              <a
                href="#ficha-tecnica"
                className="block font-medium text-slate-600"
              >
                Ficha Técnica
              </a>
              <a
                href="#diferenciais"
                className="block font-medium text-slate-600"
              >
                Diferenciais
              </a>
              <a href="#cursos" className="block font-medium text-slate-600">
                Cursos
              </a>
              <button
                onClick={onNavigateToAboutOceano}
                className="w-full text-left font-medium text-slate-600"
              >
                Sobre Nós
              </button>
              <a
                href="#contato-oceano"
                className="block font-bold text-blue-600"
              >
                Solicitar Orçamento
              </a>
            </div>
          )}
        </Container>
      </motion.nav>

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="pt-32 pb-16 lg:pt-36 lg:pb-24 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_52%,#ffffff_100%)] overflow-hidden"
      >
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] items-center gap-10 lg:gap-16">
            <div className="text-center lg:text-left z-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 tracking-wide uppercase border border-blue-100">
                  <Sparkles size={12} /> Tecnologia aplicada a setores críticos
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-950 leading-[1.05] mb-6 tracking-tight">
                  Tecnologia com drones para{" "}
                  <span className="text-blue-600">
                    agricultura, cidades, energia e infraestrutura
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-slate-600 mb-7 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  A Oceano Azul combina operação especializada, drones de alta
                  performance e leitura técnica de campo para tornar operações
                  mais precisas, seguras e eficientes.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <a
                    href="#contato-oceano"
                    className="w-full max-w-[17rem] sm:w-auto sm:max-w-none"
                  >
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      Solicitar Orçamento <ArrowRight size={16} />
                    </button>
                  </a>
                  <a
                    href="#servicos"
                    className="w-full max-w-[17rem] sm:w-auto sm:max-w-none"
                  >
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
                      Conhecer Soluções
                    </button>
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.25} width="100%">
              <HeroVideo />
            </Reveal>
          </div>
        </Container>
      </section>

      <PartnerLogoCarousel />

      {/* NOSSAS SOLUÇÕES */}
      <section
        id="servicos"
        className="py-20 border-t border-blue-100/70 bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]"
      >
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100 uppercase tracking-wider mx-auto">
                <Zap size={12} /> Nossas Soluções
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Serviços com drones para <br />
                <span className="text-blue-600">operações de alto impacto</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Da aplicação em campo ao relatório técnico, reunimos soluções
                para agricultura, cidades, saúde pública, energia e
                infraestrutura.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredSolutions.map((service, index) => (
              <Reveal
                key={service.title}
                delay={index * 0.1}
                width="100%"
                className="h-full"
              >
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllSolutions((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              aria-expanded={showAllSolutions}
              aria-controls="solucoes-completas"
            >
              {showAllSolutions ? "Recolher soluções" : "Ver todas as soluções"}
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  showAllSolutions ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showAllSolutions && (
            <motion.div
              id="solucoes-completas"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-10 grid gap-6 lg:grid-cols-3"
            >
              {additionalSolutions.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index + featuredSolutions.length}
                />
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      {/* FICHA TÉCNICA */}
      <section
        id="ficha-tecnica"
        className="bg-white py-20 border-t border-slate-200/70"
      >
        <Container>
          <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center">
            <Reveal width="100%">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Shield size={12} /> Ficha Técnica
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Estrutura pronta para <br />
                <span className="text-blue-600">operações em campo</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
                A Oceano Azul reúne bases operacionais, equipe técnica,
                equipamentos especializados e frota preparada para missões de
                mapeamento, pulverização, inspeção, saúde pública e apoio urbano.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technicalSheet.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 0.04}
                width="100%"
                className="h-full"
              >
                <article className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:border-sky-200/50 hover:shadow-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    <item.icon size={22} />
                  </div>
                  <span className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </span>
                  <h3 className="mb-3 text-lg font-extrabold leading-tight text-slate-900">
                    {item.value}
                  </h3>
                  <p className="mt-auto text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 border-t border-slate-200 pt-12">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.65fr] lg:items-start">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                    <Wrench size={12} /> Frota técnica
                  </span>
                  <h3 className="max-w-md text-2xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                    Equipamentos certos para cada missão
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
                    A composição da frota é definida conforme o ambiente, o
                    risco operacional e o objetivo de cada projeto.
                  </p>
                  <div className="mt-7 grid max-w-md grid-cols-2 gap-4">
                    <div className="border-l-2 border-blue-600 pl-4">
                      <span className="block text-2xl font-extrabold text-slate-900">
                        4
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        frentes técnicas
                      </span>
                    </div>
                    <div className="border-l-2 border-slate-200 pl-4">
                      <span className="block text-2xl font-extrabold text-slate-900">
                        sob medida
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        por operação
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
              {fleetCategories.map((category, index) => (
                <Reveal
                  key={category.title}
                  delay={index * 0.08}
                  width="100%"
                  className="h-full"
                >
                  <article className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:border-sky-200/50 hover:shadow-xl">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                        <category.icon size={22} />
                      </div>
                      <span className="text-xs font-extrabold tracking-wider text-slate-300">
                        0{index + 1}
                      </span>
                    </div>
                    <h4 className="mb-5 text-lg font-extrabold leading-tight text-slate-900">
                      {category.title}
                    </h4>
                    <ul className="mt-auto space-y-3">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-1 shrink-0 text-blue-500"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CASES E NÚMEROS */}
      <section
        id="cases-numeros"
        className="py-20 border-t border-blue-100/70 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)]"
      >
        <Container>
          <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center">
            <Reveal width="100%">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                <TrendingUp size={12} /> Cases e números
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Experiência operacional <br />
                <span className="text-blue-600">em campo e na cidade</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
                Números que refletem a atuação da Oceano Azul em projetos
                agrícolas, urbanos, institucionais e técnicos em diferentes
                regiões.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {caseNumbers.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 0.06}
                width="100%"
                className="h-full"
              >
                <article className="group flex h-full min-h-[17rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <item.icon size={22} />
                  </div>
                  <AnimatedCaseValue
                    value={item.value}
                    countTo={item.countTo}
                    suffix={item.suffix}
                  />
                  <span className="mt-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                    {item.label}
                  </span>
                  <p className="mt-auto pt-6 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* DIFERENCIAIS */}
      <section
        id="diferenciais"
        className="bg-white py-20 border-t border-slate-200/70"
      >
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100 uppercase tracking-wider mx-auto">
                <Sparkles size={12} /> Nossos diferenciais
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Por que escolher a <br />
                <span className="text-blue-600">Oceano Azul?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                A Oceano Azul combina operação em campo, equipe especializada e
                equipamentos profissionais para entregar projetos com segurança,
                qualidade e adaptação ao contexto de cada cliente.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {differentiators.map((item, index) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                icon={item.icon}
                desc={item.description}
                delay={index * 0.05}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* CURSOS E CAPACITAÇÃO */}
      <section
        id="cursos"
        className="py-20 border-t border-blue-100/70 bg-[linear-gradient(180deg,#f3f8ff_0%,#ffffff_100%)]"
      >
        <Container>
          <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center text-center">
            <Reveal width="100%">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                <BookOpen size={12} /> Cursos e capacitação
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="mb-8 text-4xl font-extrabold leading-[0.95] tracking-tight text-slate-900 md:text-6xl">
                Curso Básico de <br />
                <span className="text-blue-600">Pilotagem de Drones</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
                A Oceano Azul também atua na capacitação de profissionais e
                equipes que desejam operar drones com mais segurança,
                conhecimento técnico e confiança em campo.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto max-w-6xl">
            {courseCards.map((course, index) => (
              <Reveal
                key={course.title}
                delay={index * 0.06}
                width="100%"
                className="h-full"
              >
                <article className="group grid overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm transition-all hover:border-sky-200/50 hover:shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[18rem] overflow-hidden bg-sky-50 lg:min-h-[30rem]">
                    {course.image ? (
                      <div className="flex h-full items-center justify-center p-4">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={1066}
                          height={1424}
                          className="h-full w-auto max-w-full rounded-[1.5rem] object-contain shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#dbeafe_0%,transparent_34%),linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-8">
                        <div className="flex aspect-square w-full max-w-[19rem] items-center justify-center rounded-[2rem] border border-white bg-white/80 text-sky-600 shadow-sm backdrop-blur">
                          <course.icon size={82} strokeWidth={1.6} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-10">
                    <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                      <GraduationCap size={13} /> Formação inicial
                    </span>
                    <h3 className="mb-4 text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
                      {course.title}
                    </h3>
                    <p className="mb-7 text-base leading-relaxed text-slate-600">
                      {course.description}
                    </p>
                    <ul className="mb-8 space-y-3">
                      {course.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                        >
                          <CheckCircle2
                            size={17}
                            className="mt-0.5 shrink-0 text-blue-600"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contato-oceano" className="w-full sm:w-fit">
                      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 sm:w-auto">
                        Solicitar informações
                        <ArrowRight size={16} />
                      </button>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BENEFÍCIOS (CORRIGIDO) */}
      <section
        id="beneficios"
        className="py-20 bg-white border-t border-slate-200/70"
      >
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100 uppercase tracking-wider mx-auto">
                <Sparkles size={12} /> Vantagens Exclusivas
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Benefícios que impactam <br />
                <span className="text-blue-600">sua operação</span>
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
              desc="Pilotos competentes e certificados pelo DECEA e outras Entidades."
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
      <section
        id="equipe"
        className="py-16 border-t border-blue-100/70 bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]"
      >
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
      <section
        id="contato-oceano"
        className="py-24 border-t border-slate-200/70 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.08),transparent_32%),#ffffff]"
      >
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
                        contato@grupoagroazul.com.br
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
              <div className="relative w-auto h-16 mb-5">
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
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Serviços</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                {footerServices.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-5 text-base">Empresa</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                {footerCompany.map((item) => (
                  <li key={item.label}>
                    {item.type === "button" ? (
                      <button
                        type="button"
                        onClick={onNavigateToAboutOceano}
                        className="block text-left hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="hover:text-white transition-colors block"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h4 className="font-bold text-white mb-5 text-base">
                Atendimento
              </h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                {footerSupport.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
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
