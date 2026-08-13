export const ROUTES = {
  inicio: "/index.html",
  cadastro: "/pages/cadastro.html",
  docs: "/pages/docs.html",
  aluno: "/pages/aluno.html",
  evolucao: "/pages/evolucao.html",
  sala: "/pages/sala.html",
  exercicios: "/pages/exercicios.html",
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
