import {
  LESSONS,
  EXERCISES,
  TRACKS,
  XP_AULA,
  XP_EXERCICIO,
  XP_POR_NIVEL,
  lessonById,
} from "../data/curriculum.js";
import { ROUTES } from "./routes.js";

const KEY_USERS = "codice.users";
const KEY_SESSION = "codice.session";

export const PAGES = [
  { href: ROUTES.inicio, label: "Início", id: "inicio" },
  { href: ROUTES.cadastro, label: "Cadastro", id: "cadastro" },
  { href: ROUTES.docs, label: "Documentação", id: "docs" },
  { href: ROUTES.aluno, label: "Área do aluno", id: "aluno", auth: true },
  { href: ROUTES.evolucao, label: "Evolução", id: "evolucao", auth: true },
  { href: ROUTES.sala, label: "Sala de aula", id: "sala", auth: true },
  { href: ROUTES.exercicios, label: "Exercícios", id: "exercicios", auth: true },
];

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function users() {
  return readJson(KEY_USERS, []);
}

export function sessionEmail() {
  return localStorage.getItem(KEY_SESSION);
}

export function currentUser() {
  const email = sessionEmail();
  if (!email) return null;
  return users().find((user) => user.email === email) ?? null;
}

export function saveUser(user) {
  const list = users().filter((item) => item.email !== user.email);
  list.push(user);
  writeJson(KEY_USERS, list);
}

export async function hashPassword(plain) {
  const encoded = new TextEncoder().encode(`codice:${plain}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function emptyProgress() {
  return {
    aulasConcluidas: [],
    exerciciosConcluidos: [],
    xp: 0,
    streak: 1,
    ultimoAcesso: new Date().toISOString().slice(0, 10),
    tempoEstudoMin: 0,
    aulaAtual: LESSONS[0].id,
    sessaoInicio: Date.now(),
    conquistas: ["Cadastro"],
  };
}

export function createStudent({ nome, email, objetivo, nivelPartida, passwordHash }) {
  return {
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    objetivo,
    nivelPartida,
    passwordHash,
    criadoEm: new Date().toISOString(),
    ...emptyProgress(),
  };
}

export function login(email) {
  localStorage.setItem(KEY_SESSION, email.trim().toLowerCase());
}

export function logout() {
  localStorage.removeItem(KEY_SESSION);
}

export function requireAuth() {
  if (currentUser()) return currentUser();
  const next = encodeURIComponent(location.pathname || ROUTES.aluno);
  location.href = `${ROUTES.cadastro}?next=${next}&modo=entrar`;
  return null;
}

function bumpStreak(user) {
  const today = new Date().toISOString().slice(0, 10);
  if (user.ultimoAcesso === today) return user;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  user.streak = user.ultimoAcesso === yesterday ? user.streak + 1 : 1;
  user.ultimoAcesso = today;
  return user;
}

export function derived(user) {
  const guest = !user;
  const aulas = user?.aulasConcluidas?.length ?? 0;
  const exercicios = user?.exerciciosConcluidos?.length ?? 0;
  const xp = user?.xp ?? 0;
  const nivel = Math.floor(xp / XP_POR_NIVEL) + 1;
  const xpNoNivel = xp % XP_POR_NIVEL;
  const progresso = Math.round((aulas / LESSONS.length) * 100);
  const aula = lessonById(user?.aulaAtual ?? LESSONS[0].id);
  const track = TRACKS.find((item) => item.id === aula.track);
  const liga =
    nivel >= 8 ? "Platina" : nivel >= 5 ? "Ouro" : nivel >= 3 ? "Prata" : "Bronze";
  const sessaoMin = user?.sessaoInicio
    ? Math.max(0, Math.round((Date.now() - user.sessaoInicio) / 60000))
    : 0;

  return {
    aluno: guest ? "Visitante" : user.nome.split(" ")[0],
    email: user?.email ?? "—",
    nivel: guest ? 0 : nivel,
    xp: guest ? 0 : xp,
    xpNoNivel,
    xpProximo: XP_POR_NIVEL,
    progresso: guest ? 0 : progresso,
    trilha: track?.nome ?? "Iniciante",
    modulo: aula.titulo,
    aulas: `${aulas}/${LESSONS.length}`,
    aulasCount: aulas,
    exercicios: `${exercicios}/${EXERCISES.length}`,
    exerciciosCount: exercicios,
    streak: guest ? 0 : user.streak,
    tempo: `${(user?.tempoEstudoMin ?? 0) + sessaoMin} min`,
    liga: guest ? "Observador" : liga,
    conquistas: guest ? 0 : user.conquistas.length,
    objetivo: user?.objetivo ?? "Explorar o Códice",
    aulaAtual: aula,
    track,
  };
}

export function completeLesson(lessonId) {
  const user = currentUser();
  if (!user) return null;
  bumpStreak(user);
  if (!user.aulasConcluidas.includes(lessonId)) {
    user.aulasConcluidas.push(lessonId);
    user.xp += XP_AULA;
    if (user.aulasConcluidas.length === 1) user.conquistas.push("Primeira aula");
    if (user.aulasConcluidas.length === LESSONS.length) user.conquistas.push("Trilha completa");
  }
  user.aulaAtual = lessonId;
  saveUser(user);
  renderStatusBar();
  return user;
}

export function completeExercise(exerciseId) {
  const user = currentUser();
  if (!user) return null;
  bumpStreak(user);
  if (!user.exerciciosConcluidos.includes(exerciseId)) {
    user.exerciciosConcluidos.push(exerciseId);
    user.xp += XP_EXERCICIO;
    if (user.exerciciosConcluidos.length === EXERCISES.length) {
      user.conquistas.push("Oficina completa");
    }
  }
  saveUser(user);
  renderStatusBar();
  return user;
}

const STATUS_VARS = [
  ["Aluno", "aluno"],
  ["Nível", "nivel"],
  ["XP", "xp"],
  ["Progresso", (stats) => `${stats.progresso}%`],
  ["Trilha", "trilha"],
  ["Aula atual", "modulo"],
  ["Aulas", "aulas"],
  ["Exercícios", "exercicios"],
  ["Sequência", (stats) => `${stats.streak} d`],
  ["Tempo", "tempo"],
  ["Liga", "liga"],
  ["Conquistas", "conquistas"],
  ["Objetivo", "objetivo"],
];

export function renderStatusBar() {
  const host = document.querySelector("[data-status-bar]");
  if (!host) return;
  const stats = derived(currentUser());
  host.innerHTML = `
    <dl class="status-track">
      ${STATUS_VARS.map(([label, key]) => {
        const value = typeof key === "function" ? key(stats) : stats[key];
        return `<div class="status-var" title="${label}: ${value}"><dt>${label}</dt><dd>${value}</dd></div>`;
      }).join("")}
    </dl>
  `;
}

export function renderHeader(pageId) {
  const host = document.querySelector("[data-header]");
  if (!host) return;
  const user = currentUser();
  host.innerHTML = `
    <a class="brand" href="${ROUTES.inicio}" aria-label="Códice JS — início">
      <div class="brand-mark" aria-hidden="true"><span>JS</span></div>
      <div class="brand-copy">
        <small>Observatório</small>
        <strong>Códice JS</strong>
      </div>
    </a>
    <nav class="site-nav" aria-label="Principal">
      ${PAGES.filter((page) => (!page.auth || user) && !(page.id === "cadastro" && user))
        .map(
          (page) =>
            `<a href="${page.href}" ${page.id === pageId ? 'aria-current="page"' : ""}>${page.label}</a>`
        )
        .join("")}
      ${
        user
          ? `<button class="btn btn-ghost" type="button" data-logout>Sair</button>`
          : `<a class="btn btn-gold" href="${ROUTES.cadastro}">Entrar no Códice</a>`
      }
    </nav>
  `;
  host.querySelector("[data-logout]")?.addEventListener("click", () => {
    logout();
    location.href = ROUTES.inicio;
  });
}

function syncHeaderOffset() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
}

export function renderFooter() {
  const host = document.querySelector("[data-footer]");
  if (!host) return;
  host.innerHTML = `
    <p>Códice JS · portal de estudos exclusivo de JavaScript.</p>
    <p>Tipografia Fraunces, Syne, Figtree e IBM Plex Mono · identidade em ouro, âmbar e tinta.</p>
  `;
}

export function initShell(pageId) {
  const user = currentUser();
  if (user) {
    bumpStreak(user);
    if (!user.sessaoInicio) user.sessaoInicio = Date.now();
    saveUser(user);
  }
  renderHeader(pageId);
  syncHeaderOffset();
  window.addEventListener("resize", syncHeaderOffset);
  renderStatusBar();
  renderFooter();
  setInterval(renderStatusBar, 30000);
}

export { LESSONS, EXERCISES, TRACKS, XP_AULA, XP_EXERCICIO, XP_POR_NIVEL };
