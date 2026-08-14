export const ROUTES = {
  inicio: "/index.html",
  cadastro: "/pages/cadastro.html",
  docs: "/pages/docs.html",
  aluno: "/pages/aluno.html",
  evolucao: "/pages/evolucao.html",
  sala: "/pages/sala.html",
  exercicios: "/pages/exercicios.html",
  download: "/pages/download.html",
};

export const COURSES = {
  guanabara: {
    nome: "JavaScript e ECMAScript para Iniciantes",
    autor: "Gustavo Guanabara",
    escola: "Curso em Vídeo",
    playlistId: "PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1",
    playlist: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1",
    portal: "https://www.cursoemvideo.com/curso/javascript/",
    github: "https://github.com/gustavoguanabara/javascript",
    materiais: "https://gustavoguanabara.github.io/javascript/",
  },
};

export const ASSETS = {
  faviconIco: "/assets/favicon.ico",
  faviconSvg: "/assets/favicon.svg",
  appleTouch: "/assets/apple-touch-icon.png",
  styles: "/css/styles.css",
};

export function salaUrl(aulaId) {
  return `${ROUTES.sala}?aula=${aulaId}`;
}

export function exerciciosUrl({ ex, trilha } = {}) {
  const params = new URLSearchParams();
  if (ex) params.set("ex", ex);
  if (trilha) params.set("trilha", trilha);
  const query = params.toString();
  return query ? `${ROUTES.exercicios}?${query}` : ROUTES.exercicios;
}

export function youtubeEmbedUrl(videoId, playlistId = COURSES.guanabara.playlistId) {
  return `https://www.youtube.com/embed/${videoId}?list=${playlistId}&rel=0`;
}

export function youtubeWatchUrl(videoId, playlistId = COURSES.guanabara.playlistId) {
  return `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`;
}
