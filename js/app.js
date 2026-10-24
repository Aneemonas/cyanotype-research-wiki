/* Cyanotype Research wiki: no build step. Pages are Markdown files in content/<lang>/<section>/<page>.md,
   the menu comes from content/nav.json. Routing uses the URL hash, so it works on GitHub Pages as it is. */
(() => {
'use strict';

/* ------------------------------------------------------------------ strings */
const T = {
  en: {
    search: 'Search', searchPh: 'Search the wiki...', noHits: 'Nothing found for', typeMore: 'Type to search every page.',
    onThis: 'On this page', prev: 'Previous', next: 'Next', copy: 'Copy', copied: 'Copied', download: 'Download',
    soon: 'Video unavailable', soonImg: 'Image unavailable',
    tip: 'Tip', warn: 'Warning', danger: 'Careful', note: 'Note', idea: 'Idea',
    missingLang: 'This page is not translated yet. Showing the English version.',
    notFound: 'Page not found', notFoundText: 'This page does not exist (yet). Try the search or go back to the start.',
    home: 'Home', edit: 'Edit this page on GitHub', updated: 'Cyanotype Research is a NeoForge, Forge and Fabric 1.21.1 mod by aneemonas · MIT license',
    menu: { start: 'Start', player: 'Player', dev: 'Developer', examples: 'Examples', ref: 'Reference' },
    hero: {
      tag: 'NeoForge · Forge · Fabric 1.21.1',
      h1a: 'Cyanotype', h1b: 'Research', sub: 'A research machine made for modpack makers. Build your own research trees in game and keep recipes, items and blocks locked until players earn them.',
      p: 'Player guide', d: 'Developer guide', e: 'Pack examples',
    },
    h: {
      what: 'What it does',
      whatText: ['You put a blueprint in the Research Station and a tree opens. Each node costs items or XP, or asks for something in the world: kill a mob, visit a biome, feed the machine fluid or FE.',
        'Finishing a node can give rewards and unlock recipes, items, blocks and GUIs in the whole pack. The trees are made in game with the editor and saved as plain text files.'],
      start: [['start/intro', 'What is Cyanotype Research'], ['start/install', 'Installation'], ['dev/quick-start', 'Your first tree in 10 minutes']],
      packs: 'Examples', packsSub: 'Three packs built with the same system, each with the tree files to download and open in your own world.',
      packList: [['tech-pack', 'Tech pack', 'One tree per technology, where each node locks the recipes of a mod until the player reaches it.', ['steam', 'electrical', 'automation'], '#2fe4ff'],
        ['exploration-pack', 'Exploration pack', 'A map of places to visit, where entering a biome or a structure fills the requirement by itself.', ['exploration', 'nether', 'end'], '#25e39a'],
        ['rpg-pack', 'RPG pack', 'A skill web where the class is picked once, with branches that exclude each other and attributes as rewards.', ['combat', 'magic', 'defense'], '#8a5cff']],
      demo: 'Video', demoSub: 'The machine from the first blueprint to a finished tree.',
      qs: 'Quick start',
      qsCode: '# become a dev (operators only)\n/cyanotype dev true\n\n# put any item in the machine and press "Save as tree"\n# add, link and edit nodes with the editor tools\n\n# trees are saved here\nconfig/cyanotype/trees/<id>.snbt',
      go: 'Open the tutorial',
    },
  },
  pt: {
    search: 'Buscar', searchPh: 'Buscar na wiki...', noHits: 'Nada encontrado para', typeMore: 'Digite para buscar em todas as páginas.',
    onThis: 'Nesta página', prev: 'Anterior', next: 'Próxima', copy: 'Copiar', copied: 'Copiado', download: 'Baixar',
    soon: 'Vídeo indisponível', soonImg: 'Imagem indisponível',
    tip: 'Dica', warn: 'Aviso', danger: 'Cuidado', note: 'Nota', idea: 'Ideia',
    missingLang: 'Esta página ainda não foi traduzida. Mostrando a versão em inglês.',
    notFound: 'Página não encontrada', notFoundText: 'Essa página não existe (ainda). Tente a busca ou volte ao início.',
    home: 'Início', edit: 'Editar esta página no GitHub', updated: 'Cyanotype Research é um mod de aneemonas para NeoForge, Forge e Fabric 1.21.1 · licença MIT',
    menu: { start: 'Início', player: 'Jogador', dev: 'Desenvolvedor', examples: 'Exemplos', ref: 'Referência' },
    hero: {
      tag: 'NeoForge · Forge · Fabric 1.21.1',
      h1a: 'Cyanotype', h1b: 'Research', sub: 'Uma máquina de pesquisa feita para quem monta modpacks. Crie as suas próprias árvores de pesquisa dentro do jogo e deixe receitas, itens e blocos trancados até o jogador merecer.',
      p: 'Guia do jogador', d: 'Guia do desenvolvedor', e: 'Exemplos de pack',
    },
    h: {
      what: 'O que faz',
      whatText: ['Você coloca um blueprint na Research Station e a árvore se abre. Cada nó custa itens ou XP, ou pede algo no mundo: matar um mob, visitar um bioma, abastecer a máquina com fluido ou FE.',
        'Ao concluir, o nó dá recompensas e pode liberar receitas, itens, blocos e telas em qualquer parte do pack. As árvores nascem no editor, dentro do jogo, e ficam salvas como arquivos de texto.'],
      start: [['start/intro', 'O que é o Cyanotype Research'], ['start/install', 'Instalação'], ['dev/quick-start', 'Sua primeira árvore em 10 minutos']],
      packs: 'Exemplos', packsSub: 'Três packs feitos com o mesmo sistema. Cada um traz os arquivos de árvore para baixar e abrir no seu mundo.',
      packList: [['tech-pack', 'Pack tech', 'Uma árvore por tecnologia: cada nó tranca as receitas de um mod até o jogador chegar nele.', ['steam', 'electrical', 'automation'], '#2fe4ff'],
        ['exploration-pack', 'Pack de exploração', 'Um mapa de lugares para visitar. Entrar num bioma ou numa estrutura já cumpre o requisito.', ['exploration', 'nether', 'end'], '#25e39a'],
        ['rpg-pack', 'Pack de RPG', 'Uma teia de skills com a classe escolhida uma única vez, ramos que se excluem e atributos como recompensa.', ['combat', 'magic', 'defense'], '#8a5cff']],
      demo: 'Vídeo', demoSub: 'A máquina do primeiro blueprint até a árvore concluída.',
      qs: 'Início rápido',
      qsCode: '# vire dev (só operadores)\n/cyanotype dev true\n\n# ponha qualquer item na máquina e clique em "Salvar como tree"\n# adicione, ligue e edite nós com as ferramentas do editor\n\n# as árvores ficam salvas aqui\nconfig/cyanotype/trees/<id>.snbt',
      go: 'Abrir o tutorial',
    },
  },
};

/* ------------------------------------------------------------------ helpers */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/`/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };

let NAV = null, lang = 'en', cur = { sec: null, page: null };
const cache = new Map();   // "lang/sec/page" -> markdown text (or null)

/* ------------------------------------------------------------------ markdown */
function hl(code, l) {
  l = (l || '').toLowerCase();
  if (!l || l === 'text' || l === 'txt') return esc(code);
  const hash = /^(cyan|toml|bash|sh|yaml|yml|properties|cmd)$/.test(l);
  const re = new RegExp([
    hash ? '(#[^\\n]*)' : '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)',
    '("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')',
    '\\b(true|false|null)\\b',
    '(-?\\b\\d+(?:\\.\\d+)?[LbsfdI]?\\b)',
    '(\\/?[A-Za-z_@][\\w\\-\\.]*)(?=\\s*:(?!:))',
  ].join('|'), 'g');
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'b' : m[4] ? 'n' : 'k';
    out += `<span class="tk-${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  return out + esc(code.slice(last));
}

function resolveHref(u) {
  if (/^(https?:|mailto:)/i.test(u)) return { href: u, ext: true };
  if (u.startsWith('#')) return { href: `#/${lang}/${cur.sec ? cur.sec + '/' + cur.page : ''}?s=${u.slice(1)}`, ext: false };
  if (u.startsWith('/') || /^assets\//.test(u)) return { href: u.replace(/^\//, ''), ext: false, file: true };
  const [p, a] = u.split('#');
  return { href: `#/${lang}/${p.replace(/\/$/, '')}${a ? '?s=' + a : ''}`, ext: false };
}

function inline(src) {
  const codes = [];
  let s = src.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
  s = esc(s);
  s = s.replace(/\{\{(item|ui):([\w-]+)\}\}/g, (m, k, n) => `<img class="sprite" style="width:${k === 'item' ? 32 : 24}px;height:${k === 'item' ? 32 : 24}px;vertical-align:-8px" src="assets/img/${k === 'item' ? 'items' : 'ui'}/${n}.png" alt="">`);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, a, u) => `<img src="${u}" alt="${a}" loading="lazy">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => {
    const r = resolveHref(u.replace(/&amp;/g, '&'));
    return `<a href="${r.href}"${r.ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${t}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])\*([^*\s][^*]*)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${esc(codes[+i])}</code>`);
}

const isBlockStart = l => /^(```|:::|#{1,4}\s|>|\s*([-*]|\d+\.)\s|::(video|image|card|file)\b|---+\s*$|\|)/.test(l);

function parseBlocks(lines) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const ln = lines[i];
    if (!ln.trim()) { i++; continue; }
    let m;
    if ((m = ln.match(/^```(\S*)\s*(.*)$/))) {
      const buf = []; i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++;
      const code = buf.join('\n'), l = m[1] || 'text', title = m[2] || (l !== 'text' ? l : '');
      out.push(`<div class="code"><div class="code-h"><span class="dots"><i></i><i></i><i></i></span><span>${esc(title)}</span><button type="button" data-copy>${T[lang].copy}</button></div><pre><code>${hl(code, l)}</code></pre></div>`);
      continue;
    }
    if ((m = ln.match(/^:::(\w+)\s*(.*)$/))) {
      const buf = []; i++;
      let depth = 1;
      while (i < lines.length) {
        if (/^:::\w+/.test(lines[i])) depth++;
        else if (/^:::\s*$/.test(lines[i]) && --depth === 0) break;
        buf.push(lines[i++]);
      }
      i++;
      const kind = m[1] === 'warning' ? 'warn' : m[1];
      if (kind === 'steps') { out.push(parseBlocks(buf).join('\n').replace(/<ol>/g, '<ol class="steps">')); continue; }
      const icon = { tip: 'icon_check', warn: 'icon_flame', danger: 'icon_lock', note: 'icon_info', idea: 'icon_spark' }[kind] || 'icon_info';
      const title = m[2] || T[lang][kind] || kind;
      out.push(`<div class="adm ${esc(kind)}"><div class="adm-t"><img class="sprite" src="assets/img/ui/${icon}.png" alt="">${esc(title)}</div>${parseBlocks(buf).join('\n')}</div>`);
      continue;
    }
    if ((m = ln.match(/^(#{1,4})\s+(.*?)\s*#*$/))) {
      const n = m[1].length, txt = m[2], id = slug(txt);
      out.push(n === 1 ? `<h1 id="${id}">${inline(txt)}</h1>` : `<h${n} id="${id}">${inline(txt)}<a class="anc" href="#/${lang}/${cur.sec ? cur.sec + '/' + cur.page : ''}?s=${id}" aria-label="link">#</a></h${n}>`);
      i++; continue;
    }
    if (/^---+\s*$/.test(ln)) { out.push('<hr>'); i++; continue; }
    if ((m = ln.match(/^::video\s+(\S+)(?:\s+"([^"]*)")?/))) { out.push(media('video', m[1], m[2] || '')); i++; continue; }
    if ((m = ln.match(/^::image\s+(\S+)(?:\s+"([^"]*)")?/))) { out.push(media('img', m[1], m[2] || '')); i++; continue; }
    if ((m = ln.match(/^::file\s+(\S+)(?:\s+"([^"]*)")?/))) {
      const name = m[1].split('/').pop();
      out.push(`<div class="code filebox" data-file="${esc(m[1])}"><div class="code-h"><span class="dots"><i></i><i></i><i></i></span><span>${esc(m[2] || name)}</span><a class="dl" href="${esc(m[1])}" download="${esc(name)}">${T[lang].download}</a><button type="button" data-copy>${T[lang].copy}</button></div><pre><code>...</code></pre></div>`);
      i++; continue;
    }
    if (/^::card\b/.test(ln)) {
      const cards = [];
      while (i < lines.length && /^::card\b/.test(lines[i])) {
        const p = lines[i].replace(/^::card\s*/, '').split('|').map(x => x.trim());
        const r = resolveHref(p[1] || '#');
        const ico = p[3] || 'icon_codex';
        cards.push(`<a class="card" href="${r.href}"><img class="sprite" src="assets/img/${ico.startsWith('bp_') ? 'items/' + ico.slice(3) + '_blueprint' : 'ui/' + ico}.png" alt=""><b>${esc(p[0])}</b><span>${inline(p[2] || '')}</span></a>`);
        i++;
      }
      out.push(`<div class="cards">${cards.join('')}</div>`);
      continue;
    }
    if (ln.startsWith('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const row = r => r.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
      const head = row(ln); i += 2;
      const body = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) body.push(row(lines[i++]));
      out.push(`<div class="tw"><table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^>/.test(ln)) {
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${parseBlocks(buf).join('\n')}</blockquote>`);
      continue;
    }
    if ((m = ln.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/))) {
      const ind = m[1].length, ordered = /\d/.test(m[2]);
      const items = [];
      while (i < lines.length) {
        const mm = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (!mm || mm[1].length !== ind || /\d/.test(mm[2]) !== ordered) break;
        const cind = mm[1].length + mm[2].length + 1, buf = [mm[3]]; i++;
        while (i < lines.length) {
          const l2 = lines[i];
          if (!l2.trim()) {
            let j = i; while (j < lines.length && !lines[j].trim()) j++;
            if (j < lines.length && lines[j].match(/^\s*/)[0].length >= cind) { while (i < j) { buf.push(''); i++; } continue; }
            break;
          }
          if (l2.match(/^\s*/)[0].length > ind) { buf.push(l2.slice(Math.min(l2.match(/^\s*/)[0].length, cind))); i++; continue; }
          break;
        }
        { let j = i; while (j < lines.length && !lines[j].trim()) j++; const nx = lines[j] && lines[j].match(/^(\s*)([-*]|\d+\.)\s+/); if (j > i && nx && nx[1].length === ind && /\d/.test(nx[2]) === ordered) i = j; }
        const inner = parseBlocks(buf);
        items.push(`<li>${inner.length === 1 && inner[0].startsWith('<p>') ? inner[0].slice(3, -4) : inner.join('\n')}</li>`);
      }
      out.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }
    const buf = [ln]; i++;
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out;
}

function md(text) {
  text = text.replace(/\r\n?/g, '\n').replace(/^---\n[\s\S]*?\n---\n/, '');
  const lines = text.split('\n');
  const html = parseBlocks(lines).join('\n');
  // a paragraph straight after the h1 is the lead
  return html.replace(/(<\/h1>\s*)<p>/, '$1<p class="lead">');
}

/* ------------------------------------------------------------------ media (video / image slots) */
function media(kind, name, caption) {
  const isVid = kind === 'video';
  const base = isVid ? `assets/video/${name}` : (name.includes('/') ? name : `assets/img/shots/${name}`);
  const cap = caption ? `<figcaption>${inline(caption)}</figcaption>` : '';
  const inner = isVid
    ? `<video muted loop playsinline preload="none" data-base="${esc(base)}" aria-label="${esc(caption)}"></video>`
    : `<img class="shot" data-src="${esc(base)}" alt="${esc(caption)}">`;
  return `<figure class="media ${isVid ? 'vid' : 'img'}" data-name="${esc(name)}" data-cap="${esc(caption)}"><div class="frame">${inner}</div>${cap}</figure>`;
}

function soon(fig) {
  const isVid = fig.classList.contains('vid');
  const frame = $('.frame', fig);
  frame.style.cursor = 'default';
  frame.innerHTML = `<div class="soon"><img class="sprite" src="assets/img/items/research_blueprint.png" alt=""><b>${T[lang][isVid ? 'soon' : 'soonImg']}</b><span>${esc(fig.dataset.cap)}</span></div>`;
  fig.classList.add('nofile');
}

let mediaObs = null;
function wireMedia(root) {
  if (!mediaObs) {
    mediaObs = new IntersectionObserver(es => es.forEach(e => {
      const el = e.target, v = el.tagName === 'VIDEO';
      if (e.isIntersecting) {
        if (!el.dataset.loaded) {
          el.dataset.loaded = '1';
          const fig = el.closest('figure');
          if (v) {
            const src = document.createElement('source');
            src.src = `${el.dataset.base}.mp4`; src.type = 'video/mp4';
            src.addEventListener('error', () => soon(fig));
            el.appendChild(src);
            el.load();
          } else {
            el.onerror = () => soon(fig);
            el.src = el.dataset.src;
          }
        }
        if (v && !reduced) el.play().catch(() => {});
      } else if (v) el.pause();
    }), { rootMargin: '250px' });
  }
  $$('figure.media video, figure.media img.shot', root).forEach(el => mediaObs.observe(el));
  $$('figure.media .frame', root).forEach(f => f.addEventListener('click', () => {
    const el = $('video, img', f);
    if (!el || el.closest('figure').classList.contains('nofile')) return;
    const lb = $('#lightbox');
    if (el.tagName === 'VIDEO') {
      const v = document.createElement('video');
      v.src = el.currentSrc; v.controls = true; v.loop = true; v.autoplay = true; v.muted = true; v.playsInline = true;
      lb.replaceChildren(v);
    } else { const i = document.createElement('img'); i.src = el.src; lb.replaceChildren(i); }
    lb.hidden = false;
  }));
}
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

async function loadFiles(root) {
  for (const box of $$('.filebox', root)) {
    const code = $('code', box);
    try {
      const r = await fetch(box.dataset.file); if (!r.ok) throw 0;
      const t = (await r.text()).replace(/\s+$/, '');
      code.innerHTML = hl(t, box.dataset.file.split('.').pop());
    } catch (e) { code.textContent = '(could not load ' + box.dataset.file + ')'; }
  }
}

/* ------------------------------------------------------------------ routing and loading */
function parseRoute() {
  let h = location.hash.replace(/^#\/?/, '');
  let s = '';
  const q = h.indexOf('?');
  if (q >= 0) { const p = new URLSearchParams(h.slice(q + 1)); s = p.get('s') || ''; h = h.slice(0, q); }
  const parts = h.split('/').filter(Boolean);
  let l = lang;
  if (parts[0] === 'en' || parts[0] === 'pt') l = parts.shift();
  return { l, sec: parts[0] || null, page: parts[1] || null, s };
}
function go(path) { location.hash = '#/' + lang + (path ? '/' + path : ''); }

async function fetchMd(l, sec, page) {
  const key = `${l}/${sec}/${page}`;
  if (cache.has(key)) return cache.get(key);
  let t = null;
  try { const r = await fetch(`content/${l}/${sec}/${page}.md`); if (r.ok) t = await r.text(); } catch (e) { /* offline */ }
  cache.set(key, t);
  return t;
}

const flat = () => NAV.sections.flatMap(s => s.pages.map(p => ({ sec: s.id, page: p.id, sTitle: s.title, title: p.title })));
const tt = o => o[lang] || o.en;

async function render() {
  const r = parseRoute();
  if (r.l !== lang) { lang = r.l; store.set('cy-lang', lang); }
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  $$('#lang button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  $('#searchLabel').textContent = T[lang].search;
  $('#searchInput').placeholder = T[lang].searchPh;
  buildTop(r);
  buildSide(r);
  const shell = $('#shell');
  closeNav();

  if (!r.sec) { cur = { sec: null, page: null }; shell.classList.add('home'); renderHome(); $('#toc').innerHTML = ''; document.title = 'Cyanotype Research Wiki'; window.scrollTo(0, 0); return; }
  shell.classList.remove('home');
  const sec = NAV.sections.find(s => s.id === r.sec);
  if (sec && !r.page) { go(`${sec.id}/${sec.pages[0].id}`); return; }
  cur = { sec: r.sec, page: r.page };
  const meta = sec && sec.pages.find(p => p.id === r.page);
  let text = meta ? await fetchMd(lang, r.sec, r.page) : null, note = '';
  if (meta && text == null && lang !== 'en') { text = await fetchMd('en', r.sec, r.page); if (text != null) note = `<div class="adm note"><div class="adm-t">${T[lang].note}</div><p>${esc(T[lang].missingLang)}</p></div>`; }
  const page = $('#page');
  if (text == null) {
    page.innerHTML = `<h1>${T[lang].notFound}</h1><p class="lead">${T[lang].notFoundText}</p><p><a href="#/${lang}/">${T[lang].home}</a></p>`;
    $('#toc').innerHTML = ''; $('#pager').innerHTML = ''; document.title = T[lang].notFound; return;
  }
  const crumb = `<div class="crumb"><img class="sprite" src="assets/img/ui/${sec.icon}.png" alt="">${esc(tt(sec.title))}</div>`;
  page.innerHTML = crumb + note + md(text);
  document.title = `${tt(meta.title)} · Cyanotype Research Wiki`;
  wireMedia(page);
  loadFiles(page);
  buildToc();
  buildPager();
  buildFoot(r);
  if (r.s) requestAnimationFrame(() => { const el = document.getElementById(r.s); if (el) el.scrollIntoView(); }); else window.scrollTo(0, 0);
  prefetch();
}

function prefetch() { const f = flat(); const i = f.findIndex(p => p.sec === cur.sec && p.page === cur.page); [f[i + 1], f[i - 1]].forEach(p => p && fetchMd(lang, p.sec, p.page)); }

/* ------------------------------------------------------------------ chrome */
function buildTop(r) {
  $('#brand').href = `#/${lang}/`;
  $('#topLinks').innerHTML = ['player', 'dev', 'examples', 'ref'].map(id => {
    const s = NAV.sections.find(x => x.id === id);
    return `<a href="#/${lang}/${id}/${s.pages[0].id}" class="${r.sec === id ? 'on' : ''}">${esc(T[lang].menu[id])}</a>`;
  }).join('');
}
function buildSide(r) {
  const shut = JSON.parse(store.get('cy-shut') || '{}');
  $('#sideNav').innerHTML = NAV.sections.map(s => {
    const open = r.sec === s.id || !shut[s.id];
    return `<div class="sec${open ? '' : ' shut'}" data-s="${s.id}"><button class="sec-h" type="button"><img class="sprite" src="assets/img/ui/${s.icon}.png" alt="">${esc(tt(s.title))}<svg class="car" width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button><ul>${s.pages.map(p => `<li><a href="#/${lang}/${s.id}/${p.id}" class="${r.sec === s.id && r.page === p.id ? 'on' : ''}">${esc(tt(p.title))}</a></li>`).join('')}</ul></div>`;
  }).join('');
  $$('#sideNav .sec-h').forEach(b => b.onclick = () => {
    const sec = b.parentElement; sec.classList.toggle('shut');
    const m = JSON.parse(store.get('cy-shut') || '{}'); m[sec.dataset.s] = sec.classList.contains('shut'); store.set('cy-shut', JSON.stringify(m));
  });
  const on = $('#sideNav a.on'); if (on) on.scrollIntoView({ block: 'nearest' });
}
function buildToc() {
  const hs = $$('#page h2, #page h3');
  const toc = $('#toc');
  if (hs.length < 2) { toc.innerHTML = ''; return; }
  toc.innerHTML = `<h4>${T[lang].onThis}</h4>` + hs.map(h => `<a href="#/${lang}/${cur.sec}/${cur.page}?s=${h.id}" class="${h.tagName === 'H3' ? 'l3' : ''}" data-id="${h.id}">${esc(h.firstChild.textContent)}</a>`).join('');
  $$('#toc a').forEach(a => a.onclick = e => { e.preventDefault(); const el = document.getElementById(a.dataset.id); if (el) { el.scrollIntoView(); history.replaceState(null, '', a.getAttribute('href')); } });
  spy();
}
let spyHs = [];
function spy() { spyHs = $$('#page h2, #page h3'); onScroll(); }
function onScroll() {
  if (!spyHs.length) return;
  let id = null;
  for (const h of spyHs) { if (h.getBoundingClientRect().top < 110) id = h.id; else break; }
  $$('#toc a').forEach(a => a.classList.toggle('on', a.dataset.id === id));
}
function buildPager() {
  const f = flat(), i = f.findIndex(p => p.sec === cur.sec && p.page === cur.page);
  const a = f[i - 1], b = f[i + 1];
  $('#pager').innerHTML = (a ? `<a href="#/${lang}/${a.sec}/${a.page}"><small>← ${T[lang].prev}</small><b>${esc(tt(a.title))}</b></a>` : '<span></span>') +
    (b ? `<a class="nx" href="#/${lang}/${b.sec}/${b.page}"><small>${T[lang].next} →</small><b>${esc(tt(b.title))}</b></a>` : '');
}
function buildFoot() { $('#foot').innerHTML = `<span>${esc(T[lang].updated)}</span><span><a href="https://github.com/aneemonas" target="_blank" rel="noopener">GitHub · aneemonas</a></span>`; }
function closeNav() { document.body.classList.remove('nav-open'); }

/* ------------------------------------------------------------------ landing */
const HX = {
  en: { hint: 'Hold a glowing node until the ring fills.', done: 'Tree complete. That is the whole loop.', again: 'Reset', cost: 'Costs', gives: 'Gives', sheet: ['Sheet', 'Tree', 'Rev', 'Loaders'], how: 'The four node shapes on the real Research Station screen',
    root: ['Research Station', 'The machine opens the tree.'],
    nodes: { a: ['Steam Age', '8 iron ingots + water', 'Unlocks create:* crafting'], b: ['Electric Age', '4 copper ingots + 200 FE', 'Unlocks the generator recipes'], c: ['Automation', 'Needs Steam Age', 'Unlocks funnels and belts'], d: ['Logistics', 'Needs Electric Age', 'Unlocks the item pipes'], e: ['Factory', 'Needs Automation and Logistics', '+50 XP and a toast'] } },
  pt: { hint: 'Segure um nó brilhante até o anel encher.', done: 'Árvore concluída. É esse o ciclo todo.', again: 'Reiniciar', cost: 'Custa', gives: 'Dá', sheet: ['Folha', 'Árvore', 'Rev', 'Loaders'], how: 'Os quatro formatos de nó na tela real da Research Station',
    root: ['Research Station', 'A máquina abre a árvore.'],
    nodes: { a: ['Era do Vapor', '8 lingotes de ferro + água', 'Libera o crafting de create:*'], b: ['Era Elétrica', '4 lingotes de cobre + 200 FE', 'Libera as receitas de gerador'], c: ['Automação', 'Precisa da Era do Vapor', 'Libera funis e esteiras'], d: ['Logística', 'Precisa da Era Elétrica', 'Libera os tubos de itens'], e: ['Fábrica', 'Precisa de Automação e Logística', '+50 XP e um aviso na tela'] } },
};
const TREE = [
  { id: 'r', x: 10, y: 50, deps: [] },
  { id: 'a', x: 34, y: 20, ic: 'steam', deps: ['r'] }, { id: 'b', x: 34, y: 80, ic: 'electrical', deps: ['r'] },
  { id: 'c', x: 62, y: 20, ic: 'automation', deps: ['a'] }, { id: 'd', x: 62, y: 80, ic: 'logistics', deps: ['b'] },
  { id: 'e', x: 90, y: 50, ic: 'factory', deps: ['c', 'd'] },
];
function heroTree(box) {
  const x = HX[lang], done = new Set(['r']);
  const st = n => done.has(n.id) ? 'done' : n.deps.every(d => done.has(d)) ? 'avail' : 'locked';
  const links = TREE.flatMap(n => n.deps.map(d => [TREE.find(m => m.id === d), n]));
  $('.nodes', box).innerHTML = TREE.map((n, i) => `<button type="button" class="n ${n.id === 'r' ? 'root done' : ''}" data-id="${n.id}" style="left:${n.x}%;top:${n.y}%;--i:${i}" aria-label="${esc((x.nodes[n.id] || x.root)[0])}"><img src="assets/img/${n.id === 'r' ? 'station' : 'items/' + n.ic + '_blueprint'}.png" alt=""></button>`).join('');
  $('.links', box).innerHTML = links.map(([a, b]) => { const m = (a.x + b.x) / 2; return `<path pathLength="1" data-a="${a.id}" data-b="${b.id}" d="M${a.x} ${a.y}C${m} ${a.y} ${m} ${b.y} ${b.x} ${b.y}"/>`; }).join('');
  const info = $('.info', box);
  const show = n => { const t = n.id === 'r' ? x.root : x.nodes[n.id]; info.innerHTML = `<b>${esc(t[0])}</b>${n.id === 'r' ? esc(t[1]) : `${x.cost}: <em>${esc(t[1])}</em><br>${x.gives}: ${esc(t[2])}`}`; };
  const paint = () => {
    TREE.forEach(n => { const el = $(`[data-id=${n.id}]`, box), s = st(n); el.classList.remove('locked', 'avail', 'done'); el.classList.add(s); });
    $$('.links path', box).forEach(p => p.classList.toggle('on', done.has(p.dataset.a) && done.has(p.dataset.b)));
    box.classList.toggle('finished', done.size === TREE.length);
    if (done.size === TREE.length) info.innerHTML = `<b>${x.done}</b>`;
  };
  let hold = null;
  const stop = el => { if (hold) { cancelAnimationFrame(hold.raf); hold = null; } if (el) el.style.setProperty('--o', 0); };
  const start = el => {
    const n = TREE.find(m => m.id === el.dataset.id); if (st(n) !== 'avail' || hold) return;
    const t0 = performance.now(); hold = { el, raf: 0 }; el.style.setProperty('--o', 1);
    const tick = now => { const p = Math.min(100, (now - t0) / 900 * 100); el.style.setProperty('--p', p);
      if (p >= 100) { stop(el); done.add(n.id); paint(); show(n); } else hold.raf = requestAnimationFrame(tick); };
    hold.raf = requestAnimationFrame(tick);
  };
  box.addEventListener('pointerdown', e => { const el = e.target.closest('.n'); if (el) start(el); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => box.addEventListener(ev, () => stop(hold && hold.el)));
  box.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.n')) { e.preventDefault(); start(e.target.closest('.n')); } });
  box.addEventListener('keyup', () => stop(hold && hold.el));
  box.addEventListener('pointerover', e => { const el = e.target.closest('.n'); if (el) show(TREE.find(m => m.id === el.dataset.id)); });
  box.addEventListener('focusin', e => { const el = e.target.closest('.n'); if (el) show(TREE.find(m => m.id === el.dataset.id)); });
  $('.again', box).onclick = () => { done.clear(); done.add('r'); paint(); info.textContent = x.hint; };
  paint(); info.textContent = x.hint;
}
const HX2 = {
  pt: { rot: ['olhar para um bloco por alguns segundos', 'entrar numa estrutura', 'receber 200 FE por cabo', 'domar três animais', 'pescar um item específico', 'segurar um item por dez segundos', 'chegar a 30 de vida máxima', 'negociar com aldeões', 'esperar um timer', 'concluir um nó de outra árvore'], pre: 'Um nó pode pedir para você',
    lk: { h: 'Receitas trancadas por nó', p: 'Cada nó leva uma lista de padrões (um item, uma tag, um mod inteiro ou uma lista nomeada) e uma máscara que diz como cada padrão fica trancado: craftar, usar, colocar, abrir a tela ou quebrar. O bloqueio segue o resultado da receita, não a bancada em que ela é feita. Quando um jogador conclui o nó, a receita volta para o mundo inteiro, máquinas e automação incluídas.', on: 'Pesquisar o nó', off: 'Trancar de novo', l: 'trancado', u: 'liberado', e: 'ficou de fora (!)', note: 'Depois do ! o padrão aceita exceções: dá para trancar o Create inteiro e deixar a chave inglesa e os óculos de fora.' },
    mq: { h: 'Mais de quarenta tipos de requisito', p: 'Uns são pagos, como itens e níveis de XP. Outros se cumprem sozinhos enquanto o jogador joga e o nó está disponível. E alguns só contam quando a máquina recebe o recurso por funil, tubo ou cabo.', c: ['olhar para um bloco', 'entrar numa estrutura', 'estar num bioma', 'entrar numa dimensão', 'esperar um timer', 'matar mobs', 'domar animais', 'pescar', 'negociar com aldeões', 'quebrar blocos com uma ferramenta', 'usar um item', 'segurar um item', 'ter um efeito de poção', 'chegar a uma vida máxima', 'causar um tipo de dano', 'sofrer um tipo de dano', 'apertar um botão de check', 'chegar a um lab level', 'andar 100000 cm', 'entregar FE por cabo', 'despejar fluido na máquina', 'jogar itens perto dela', 'trazer animais até ela', 'gastar uma moeda virtual', 'concluir um nó de outra árvore', 'ter uma tag de jogador'] },
    fd: { h: 'Recursos entregues à máquina', p: 'Um funil, tubo ou cabo encostado em qualquer face alimenta a máquina. Ela só aceita o que alguma árvore está pedindo e só a quantidade que falta, então um funil não esvazia uma pilha inteira quando o nó quer oito itens. O que entra fica guardado até o nó ser concluído, e nenhum tubo consegue puxar de volta.', l: ['itens', 'fluido', 'FE'] },
    sc: { h: 'Recompensas em forma de script', p: 'Uma recompensa function roda um arquivo .cyan com uma diretiva por linha, e vários nós podem usar o mesmo arquivo. Com a linha once, só o primeiro jogador do mundo executa o resto, o que serve para anúncios e efeitos globais.', code: '# config/cyanotype/functions/forge.cyan\nonce\nbroadcast &6%player% &7finished &e%node%&7 first!\ngive minecraft:iron_ingot 8\nxp 3L\neffect minecraft:speed 60 1\nsound minecraft:entity.player.levelup\nstage forge_unlocked' } },
  en: { rot: ['look at a block for a few seconds', 'step inside a structure', 'receive 200 FE through a cable', 'tame three animals', 'fish up one specific item', 'hold an item for ten seconds', 'reach 30 max health', 'trade with villagers', 'wait out a timer', 'finish a node from another tree'], pre: 'A node can ask you to',
    lk: { h: 'Recipe locks per node', p: 'Each node carries a list of patterns, which can be an item, a tag, a whole mod or a named list, and a mask saying in which way each pattern is locked: craft, use, place, open the GUI or break. The lock follows the recipe result and not the table where it is made, and when a player finishes the node the recipe comes back for the whole world, machines and automation included.', on: 'Research the node', off: 'Lock it again', l: 'locked', u: 'unlocked', e: 'left out by the exception (!)', note: 'After ! a pattern accepts exceptions, so you can lock all of Create while leaving the wrench and the goggles out.' },
    mq: { h: 'More than forty requirement types', p: 'Some are paid, like items and XP levels. Others fill by themselves while the player plays and the node is available, and some only count if the machine receives the resource through a hopper, pipe or cable.', c: ['look at a block', 'step inside a structure', 'be in a biome', 'enter a dimension', 'wait out a timer', 'kill mobs', 'tame animals', 'fish', 'trade with villagers', 'break blocks with a tool', 'use an item', 'hold an item', 'have a potion effect', 'reach a max health', 'deal a damage type', 'take a damage type', 'press a check button', 'reach a lab level', 'walk 100000 cm', 'deliver FE by cable', 'pour fluid into the machine', 'throw items near it', 'bring animals to it', 'spend a virtual coin', 'finish a node from another tree', 'carry a player tag'] },
    fd: { h: 'Delivering resources to the machine', p: 'A hopper, pipe or cable touching any face feeds the machine, which only accepts what some tree is asking for and only the amount still missing, so a hopper does not empty a whole stack when the node wants eight items. What goes in stays stored until the node is finished and cannot be pulled back out by a pipe.', l: ['items', 'fluid', 'FE'] },
    sc: { h: 'Rewards written as a script', p: 'A function reward runs a .cyan file with one directive per line, and many nodes can share the same file. With the once line only the first player in the world runs the rest, which suits announcements and global effects.', code: '# config/cyanotype/functions/forge.cyan\nonce\nbroadcast &6%player% &7finished &e%node%&7 first!\ngive minecraft:iron_ingot 8\nxp 3L\neffect minecraft:speed 60 1\nsound minecraft:entity.player.levelup\nstage forge_unlocked' } },
};
const ADV = {
  pt: { h: 'Nós avançados', p: 'Tudo isso é configurado por nó, na aba Options do editor ou como campo no arquivo da árvore. Uma árvore simples não precisa de nenhuma dessas opções.', more: 'Ler a página completa',
    t: [['Sockets', 'dev-sockets', 'Um nó socket: o jogador leva um item até ele, o socket se enche e tudo que estava atrás se abre', 'Um socket pede um item colocado fisicamente no nó. Enquanto ele está vazio, todos os nós que descendem dele ficam escondidos, a cadeia inteira e não só os filhos diretos. Quando o item entra, os nós aparecem nível por nível, e se o item é retirado tudo se fecha de novo. No modo auto o nó conclui assim que o item entra; no manual ele espera o botão de pesquisa. O nó guarda a pilha real, com todos os componentes.'],
      ['Dificuldade', 'dev-difficulty', 'Mudando a dificuldade do mundo: nós que só existem no Hard aparecem e somem, e as linhas se reconectam', 'Cada nó tem um conjunto de dificuldades entre Peaceful, Easy, Normal e Hard. Se o conjunto não inclui a dificuldade atual do mundo, o nó deixa de existir: não é desenhado, não pode ser pesquisado e não conta na porcentagem da árvore. Um nó já concluído continua ativo, então trocar a dificuldade nunca tira progresso. Dois nós irmãos, um para o Peaceful e outro para o Hard, podem alimentar o mesmo filho.'],
      ['Nó produtor', 'dev-producer', 'Um nó repetível com autocomplete alimentando o buffer de saída, com um funil retirando o resultado', 'Um nó repetível com auto_complete e reward_to_buffer vira uma fábrica sem receita. Um funil entrega pedregulho, a máquina conclui o nó sozinha a cada dois minutos (ela olha a árvore uma vez por segundo e conclui até 8 nós por passada) e o ferro cai no buffer de saída. Esse buffer tem nove slots que só aceitam retirada, em todas as faces, e outro funil leva o ferro embora.'],
      ['Barrier Gate', 'dev-barrier', 'Um Barrier Gate: invisível para quem pode passar, sólido para os outros', 'O cyanotype:barrier_gate é um bloco de parede que nem é desenhado para quem pesquisou o nó certo e aparece como um cubo translúcido para todos os outros, até no criativo e no espectador. A recompensa open_barrier abre o portão, e ele fecha de novo se o nó for resetado, então resetar uma árvore em teste devolve o mundo ao estado original. Mobs só passam se o portão for criado com allow_mobs.'],
      ['Corrida e escolha', 'dev-progression', 'Ramos exclusivos e escolher dois de três no editor', 'Um nó com world_once só pode ser concluído pelo primeiro jogador do mundo, e quem tentar depois recebe a mensagem world taken. Um nó personal fica fora do compartilhamento de time, para que dois colegas sigam classes diferentes, e um ramo pode excluir outro para a escolha ser permanente. O nó também pode exigir todos os pais, qualquer um ou exatamente N.'],
      ['Entre árvores', 'cross-tree-ring', 'Um nó com o anel giratório: o pai dele está em outra árvore', 'Em qualquer campo que aceite um id de nó, outra_arvore/id_do_no aponta para um nó de outra árvore, seja como pai, exclusão ou condição para aparecer. A avaliação continua local a cada árvore, e um anel girando devagar sobre o nó avisa o jogador de que há uma ligação com outra árvore.']],
    gal: [['player-codex', 'O Codex: cards, abas, rank e atividade recente'], ['player-teams', 'Criando um time, convidando um amigo e compartilhando o progresso'], ['dev-rewards', 'Uma recompensa choice: o jogador escolhe uma opção'], ['example-rpg-skills', 'A teia de skills: gastando pontos e os ramos exclusivos'], ['example-exploration-biomes', 'Entrar num bioma cumpre a task sozinho'], ['dev-shader-bg', 'Escrevendo um shader, apertando F3+T e escolhendo nas configurações da árvore']], galh: 'A wiki em movimento', galp: 'Cada página tem os próprios clipes. Estes são alguns deles.' },
  en: { h: 'Advanced nodes', p: 'All of this is set per node, in the Options tab of the editor or as a field in the tree file, and none of these options is needed for a simple tree.', more: 'Read the full page',
    t: [['Sockets', 'dev-sockets', 'A socket node: the player carries an item to it, the socket fills and everything behind it unfolds', 'A socket asks for an item physically placed in the node. Every node descending from an empty socket is hidden, the whole chain and not only the direct children, and when the item goes in the nodes appear level by level; if the item is taken back, everything folds up again. With auto the node completes the instant the item goes in, with manual it waits for the research button, and the node keeps the real stack with its components.'],
      ['Difficulty', 'dev-difficulty', 'Changing the world difficulty: nodes that only exist on Hard appear and disappear, and the lines reconnect', 'Each node has a set of difficulties out of Peaceful, Easy, Normal and Hard. A node that leaves out the current world difficulty does not exist while the world is on it, meaning it is not drawn, cannot be researched and does not count toward the tree percentage. A node that is already completed stays active, so changing difficulty never removes progress, and two sibling nodes, one for Peaceful and one for Hard, can feed the same child.'],
      ['Producer node', 'dev-producer', 'A repeatable, autocompleting node feeding the output buffer, with a hopper taking the result', 'A repeatable node, auto_complete and reward_to_buffer together make a factory with no recipe. A hopper delivers cobblestone, the machine completes the node by itself every two minutes (it looks at the tree once per second and completes up to 8 nodes per pass) and the iron lands in the output buffer, which has nine slots open for extraction only on every face, where another hopper carries it away.'],
      ['Barrier Gate', 'dev-barrier', 'A Barrier Gate: invisible to those who may pass, solid for the rest', 'The cyanotype:barrier_gate is a wall block that is not even drawn for players who researched the right node and shows as a translucent cube to everyone else, creative and spectator included. The open_barrier reward opens the gate and it closes again if the node is reset, so resetting a tree under test gives the world back as it was, and mobs only get through if the gate was created with allow_mobs.'],
      ['Races and choices', 'dev-progression', 'Exclusive branches and pick-two-of-three in the editor', 'A node with world_once can only be completed by the first player in the world, and anyone trying later gets the message world taken. A personal node stays out of team sharing, so two teammates can follow different classes, and a branch can exclude another so that the choice is permanent. A node can also require all parents, any of them or exactly N.'],
      ['Across trees', 'cross-tree-ring', 'A node with the rotating ring: its parent is in another tree', 'Anywhere that accepts a node id, writing other_tree/node_id points to a node in another tree, as a parent, as an exclusion or as a condition to appear. Evaluation stays local to each tree, and a slowly rotating ring over the node tells the player there is a link to another tree.']],
    gal: [['player-codex', 'The Codex: cards, tabs, rank and recent activity'], ['player-teams', 'Creating a team, inviting a friend and sharing progress'], ['dev-rewards', 'A choice reward: the player picks one option'], ['example-rpg-skills', 'The skill web: spending points, the exclusive branches'], ['example-exploration-biomes', 'Walking into a biome fills the task by itself'], ['dev-shader-bg', 'Writing a shader file, pressing F3+T and picking it in the tree settings']], galh: 'The wiki in motion', galp: 'Every page has its own clips, and these are a few of them.' },
};
function heroLight(cv) {
  const ctx = cv.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 1.5);
  const art = document.createElement('canvas'), mk = document.createElement('canvas'), tm = document.createElement('canvas'), sm = document.createElement('canvas');
  const ax = art.getContext('2d'), mx = mk.getContext('2d', { willReadFrequently: true }), tx = tm.getContext('2d'), sx = sm.getContext('2d', { willReadFrequently: true });
  sm.width = 32; sm.height = 18;
  const N = [['r', .70, .50, null, null, 'station'], ['a', .54, .28, 'r', ['player', 'feeding'], 'fluid'], ['b', .38, .17, 'a', ['dev', 'editor'], 'engineer'],
    ['c', .55, .76, 'r', ['dev', 'restrictions'], 'defense'], ['d', .38, .86, 'c', ['dev', 'cross-tree'], 'logistics'], ['e', .72, .90, 'c', ['player', 'teams'], 'trading'],
    ['f', .86, .28, 'r', ['dev', 'requirements'], 'mining'], ['g', .93, .11, 'f', ['dev', 'rewards'], 'storage'], ['h', .95, .52, 'r', ['dev', 'functions'], 'redstone'],
    ['i', .87, .74, 'r', ['dev', 'api'], 'automation'], ['j', .92, .91, 'i', ['dev', 'shaders'], 'magic']];
  const imgs = {}, byId = Object.fromEntries(N.map(n => [n[0], n]));
  let W = 0, H = 0, expo = 0, dev = false, px = -1, py = -1, lx = null, ly = null, fr = 0;
  const t0 = performance.now(), ex = $('#expo');
  const label = n => { if (!n[4]) return lang === 'pt' ? 'Research Station' : 'Research Station'; const s = NAV.sections.find(s => s.id === n[4][0]), p = s && s.pages.find(p => p.id === n[4][1]); return p ? tt(p.title) : ''; };
  const sz = () => Math.max(46, Math.min(74, W * .05));
  ['station', ...N.slice(1).map(n => n[5])].forEach(k => { const i = new Image(); i.onload = () => drawArt(); i.src = k === 'station' ? 'assets/img/station.png' : `assets/img/items/${k}_blueprint.png`; imgs[k] = i; });
  const frameImg = new Image(); frameImg.onload = () => drawArt(); frameImg.src = 'assets/img/ui/node_square_ready.png';
  function drawArt() {
    ax.setTransform(dpr, 0, 0, dpr, 0, 0); ax.imageSmoothingEnabled = false;
    const g = ax.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#0f3d8c'); g.addColorStop(1, '#06194a');
    ax.fillStyle = g; ax.fillRect(0, 0, W, H);
    ax.strokeStyle = 'rgba(255,255,255,.09)'; ax.lineWidth = 1; ax.beginPath();
    for (let x = 0; x < W; x += 28) { ax.moveTo(x, 0); ax.lineTo(x, H); } for (let y = 0; y < H; y += 28) { ax.moveTo(0, y); ax.lineTo(W, y); } ax.stroke();
    ax.strokeStyle = 'rgba(255,255,255,.2)'; for (let r = 120; r < W; r += 120) { ax.beginPath(); ax.arc(N[0][1] * W, N[0][2] * H, r, 0, 7); ax.stroke(); }
    ax.strokeStyle = '#fff'; ax.lineWidth = 2.2;
    N.forEach(n => { if (!n[3]) return; const p = byId[n[3]], x1 = p[1] * W, y1 = p[2] * H, x2 = n[1] * W, y2 = n[2] * H, m = (x1 + x2) / 2; ax.beginPath(); ax.moveTo(x1, y1); ax.bezierCurveTo(m, y1, m, y2, x2, y2); ax.stroke(); });
    const s = sz(); ax.font = '600 12px "JetBrains Mono",monospace'; ax.textAlign = 'center'; ax.fillStyle = '#fff';
    N.forEach(n => { const x = n[1] * W, y = n[2] * H, root = !n[3];
      if (!root && frameImg.complete) ax.drawImage(frameImg, x - s / 2, y - s / 2, s, s);
      const ic = imgs[n[5]]; if (ic && ic.complete) { const q = root ? s * 1.1 : s * .52; ax.drawImage(ic, x - q / 2, y - q / 2, q, q); }
      ax.fillText(label(n), x, y + s / 2 + 18); });
  }
  function size() { const w = cv.clientWidth, h = cv.clientHeight; if (w === W && Math.abs(h - H) < 80) return; W = w; H = h; [cv, art, mk, tm].forEach(c => { c.width = W * dpr; c.height = H * dpr; }); expo = 0; drawArt(); }
  function dab(x, y, r) { mx.setTransform(dpr, 0, 0, dpr, 0, 0); const g = mx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, 'rgba(255,255,255,.2)'); g.addColorStop(1, 'rgba(255,255,255,0)'); mx.fillStyle = g; mx.fillRect(x - r, y - r, r * 2, r * 2); }
  function hit(x, y) { const s = sz(); for (const n of N) { if (!n[3] || Math.hypot(n[1] * W - x, n[2] * H - y) > s * .7) continue; if (mx.getImageData(x * dpr | 0, y * dpr | 0, 1, 1).data[3] > 90) return n; } return null; }
  const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.addEventListener('pointermove', e => { const [x, y] = pos(e); px = x; py = y;
    if (lx !== null) { const d = Math.hypot(x - lx, y - ly), k = Math.max(1, d / 14 | 0); for (let i = 1; i <= k; i++) dab(lx + (x - lx) * i / k, ly + (y - ly) * i / k, 70); } else dab(x, y, 70);
    lx = x; ly = y; cv.style.cursor = hit(x, y) ? 'pointer' : 'none'; });
  cv.addEventListener('pointerleave', () => { px = -1; lx = null; });
  cv.addEventListener('click', e => { const [x, y] = pos(e), n = hit(x, y); if (n) location.hash = `#/${lang}/${n[4][0]}/${n[4][1]}`; });
  addEventListener('resize', size);
  function frame(now) {
    if (!document.body.contains(cv)) return;
    const t = (now - t0) / 1000;
    if (t < 7 && !reduced) { const k = t / 7; dab((.5 + .42 * Math.sin(k * 5.1 + 1)) * W, (.5 + .38 * Math.sin(k * 7.3)) * H, 95 * (1 - k * .4)); }
    if (dev) { mx.setTransform(1, 0, 0, 1, 0, 0); mx.globalAlpha = .06; mx.fillStyle = '#fff'; mx.fillRect(0, 0, mk.width, mk.height); mx.globalAlpha = 1; }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#e8e0c2'; ctx.fillRect(0, 0, cv.width, cv.height);
    tx.globalCompositeOperation = 'source-over'; tx.clearRect(0, 0, tm.width, tm.height); tx.drawImage(art, 0, 0);
    tx.globalCompositeOperation = 'destination-in'; tx.drawImage(mk, 0, 0); ctx.drawImage(tm, 0, 0);
    if (px >= 0) { const g = ctx.createRadialGradient(px * dpr, py * dpr, 0, px * dpr, py * dpr, 70 * dpr); g.addColorStop(0, 'rgba(255,214,90,.55)'); g.addColorStop(1, 'rgba(255,214,90,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height); }
    if (++fr % 20 === 0) { sx.clearRect(0, 0, 32, 18); sx.drawImage(mk, 0, 0, 32, 18); const d = sx.getImageData(0, 0, 32, 18).data; let s = 0; for (let i = 3; i < d.length; i += 4) s += d[i]; expo = s / (d.length / 4) / 255;
      const pc = dev ? 100 : Math.min(99, Math.round(expo / .5 * 100)); if (!dev && expo > .5) dev = true; ex.textContent = `${lang === 'pt' ? 'Exposição' : 'Exposure'} ${pc}%`; }
    requestAnimationFrame(frame);
  }
  size(); requestAnimationFrame(frame);
}
function renderHome() {
  const t = T[lang], h = t.h, x = HX[lang], H = HX2[lang], A = ADV[lang], ic = n => `assets/img/ui/${n}.png`;
  const page = $('#page');
  page.className = 'page home-page';
  page.style.maxWidth = 'none';
  page.innerHTML = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="3" seed="7"/><feDisplacementMap in="SourceGraphic" scale="16"/></filter></svg>
  <section class="hero lamp"><canvas id="lamp" aria-label="Cyanotype Research"></canvas><div class="expo" id="expo"></div>
    <div class="hero-txt">
      <h1>${t.hero.h1a}<br>${t.hero.h1b}</h1>
      <p class="sub">${t.hero.sub}</p>
      <div class="btns hb">
        <a href="#/${lang}/player/machine">${t.hero.p}</a><a href="#/${lang}/dev/quick-start">${t.hero.d}</a><a href="#/${lang}/examples/overview">${t.hero.e}</a>
      </div>
      <p class="meta">${HX2[lang].pre}<b id="rot">${HX2[lang].rot[0]}</b></p>
    </div></section>

  <section class="band dv"><div class="lock"><div><h2>${H.lk.h}</h2><p class="sub">${H.lk.p}</p><p class="note">${H.lk.note}</p></div>
    <div class="paper" id="lkbox"><code class="pat">locks: ["create:*!create:wrench!create:goggles"]</code>
      <ul>${[['mechanical_press', 1], ['mechanical_drill', 1], ['deployer', 1], ['wrench', 0], ['goggles', 0]].map(r => `<li class="row${r[1] ? '' : ' ex'}"><code>create:${r[0]}</code><span class="st" data-l="${H.lk.l}" data-u="${H.lk.u}">${r[1] ? '' : H.lk.e}</span></li>`).join('')}</ul>
      <button type="button" id="lk">${H.lk.on}</button></div></div></section>

  <section class="band dv"><h2>${H.mq.h}</h2><p class="sub">${H.mq.p}</p></section>
  <div class="mq dv">${[0, 1].map(k => `<div class="mq-r r${k}"><div>${[...(k ? [...H.mq.c].reverse() : H.mq.c), ...(k ? [...H.mq.c].reverse() : H.mq.c)].map(c => `<span>${c}</span>`).join('')}</div></div>`).join('')}</div>

  <section class="band dv"><div class="lock"><div><h2>${H.fd.h}</h2><p class="sub">${H.fd.p}</p></div>
    <div class="feed">${['item', 'fluid', 'fe'].map((k, n) => `<div class="lane ${k}"><span>${H.fd.l[n]}</span><i></i></div>`).join('')}<img class="sprite st" src="assets/img/station.png" alt=""></div></div></section>

  <section class="band dv"><div class="lock"><div><h2>${H.sc.h}</h2><p class="sub">${H.sc.p}</p></div>
    <div class="code"><div class="code-h"><span class="dots"><i></i><i></i><i></i></span><span>forge.cyan</span><button type="button" data-copy>${t.copy}</button></div><pre><code>${hl(H.sc.code, 'cyan')}</code></pre></div></div></section>

  <section class="band dv"><h2>${A.h}</h2><p class="sub">${A.p}</p>
    <div class="tabs" id="tabs">${A.t.map((x, i) => `<button type="button" data-i="${i}" class="${i ? '' : 'on'}">${x[0]}</button>`).join('')}</div>
    <div class="tp" id="tp"></div><p><a href="#/${lang}/dev/advanced-nodes">${A.more}</a></p></section>

  <section class="band dv"><h2>${A.galh}</h2><p class="sub">${A.galp}</p>
    <div class="gal">${A.gal.map(g => media('video', g[0], g[1])).join('')}</div></section>

  <section class="band"><h2>${h.demo}</h2><p class="sub">${h.demoSub}</p>
    <div style="max-width:940px">${media('video', 'tour-overview', lang === 'pt' ? 'A Research Station, do primeiro blueprint à árvore concluída' : 'The Research Station, from the first blueprint to a finished tree')}</div></section>

  <section class="band"><h2>${h.packs}</h2><p class="sub">${h.packsSub}</p>
    <div class="packs">${h.packList.map(p => `<a class="pack" style="--c:${p[4]}" href="#/${lang}/examples/${p[0]}"><div class="bp">${p[3].map(b => `<img class="sprite" src="assets/img/items/${b}_blueprint.png" alt="">`).join('')}</div><b>${p[1]}</b><span>${p[2]}</span></a>`).join('')}</div></section>

  <section class="band"><h2>${h.qs}</h2>
    <div class="code"><div class="code-h"><span class="dots"><i></i><i></i><i></i></span><span>quick start</span><button type="button" data-copy>${t.copy}</button></div><pre><code>${hl(h.qsCode, 'cyan')}</code></pre></div>
    <p style="margin-top:20px"><a class="btn" href="#/${lang}/dev/quick-start">${h.go}</a></p></section>

  <div class="fine"><span>${esc(t.updated)}</span><span><a href="https://github.com/aneemonas" target="_blank" rel="noopener">GitHub · aneemonas</a></span></div>`;
  heroLight($('#lamp'));
  const lk = $('#lk'); lk.onclick = () => { const on = $('#lkbox').classList.toggle('open'); lk.textContent = on ? H.lk.off : H.lk.on; };
  const tab = i => { const x = A.t[i]; $$('#tabs button').forEach((b, n) => b.classList.toggle('on', n === i)); $('#tp').innerHTML = `<p>${x[3]}</p>${media('video', x[1], x[2])}`; wireMedia($('#tp')); };
  $('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) tab(+b.dataset.i); };
  tab(0);
  let ri = 0; const rt = setInterval(() => { const el = $('#rot'); if (!el) return clearInterval(rt); ri = (ri + 1) % H.rot.length; el.style.opacity = 0; setTimeout(() => { el.textContent = H.rot[ri]; el.style.opacity = 1; }, 260); }, 2800);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .18 });
  $$('.dv', page).forEach(el => io.observe(el));
  wireMedia(page);
}
/* ------------------------------------------------------------------ search */
let index = null, indexLang = null, hitSel = 0;
async function buildIndex() {
  if (index && indexLang === lang) return;
  const docs = [];
  await Promise.all(flat().map(async p => {
    let t = await fetchMd(lang, p.sec, p.page);
    if (t == null && lang !== 'en') t = await fetchMd('en', p.sec, p.page);
    if (t == null) return;
    const heads = [...t.matchAll(/^#{2,4}\s+(.*)$/gm)].map(m => m[1].replace(/`/g, ''));
    const body = t.replace(/```[\s\S]*?```/g, m => m.replace(/```\S*/g, '')).replace(/^:::.*$/gm, '').replace(/^::(video|image|card).*$/gm, '').replace(/[#>*_`|]/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ');
    docs.push({ sec: p.sec, page: p.page, sTitle: tt(p.sTitle), title: tt(p.title), heads, body, lower: body.toLowerCase(), tl: tt(p.title).toLowerCase(), hl: heads.join(' ').toLowerCase() });
  }));
  index = docs; indexLang = lang;
}
const fold = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
async function doSearch(q) {
  const out = $('#searchOut');
  q = q.trim();
  if (!q) { out.innerHTML = `<div class="empty">${T[lang].typeMore}</div>`; return; }
  await buildIndex();
  const terms = fold(q).split(/\s+/).filter(Boolean);
  const res = [];
  for (const d of index) {
    const lo = fold(d.lower), tl = fold(d.tl), hh = fold(d.hl);
    let sc = 0, ok = true;
    for (const w of terms) {
      let s = 0;
      if (tl.includes(w)) s += 30;
      if (hh.includes(w)) s += 12;
      const c = lo.split(w).length - 1; if (c) s += Math.min(10, 2 + c);
      if (!s) { ok = false; break; } sc += s;
    }
    if (ok) res.push({ d, sc, lo });
  }
  res.sort((a, b) => b.sc - a.sc);
  if (!res.length) { out.innerHTML = `<div class="empty">${T[lang].noHits} “${esc(q)}”</div>`; return; }
  out.innerHTML = res.slice(0, 30).map(({ d, lo }) => {
    const i = lo.indexOf(terms[0]);
    let snip = '';
    if (i >= 0) {
      const a = Math.max(0, i - 55), b = Math.min(d.body.length, i + 130);
      snip = (a ? '… ' : '') + esc(d.body.slice(a, b)) + (b < d.body.length ? ' …' : '');
      terms.forEach(w => { snip = snip.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    } else snip = esc(d.body.slice(0, 150)) + ' …';
    return `<a class="hit" href="#/${lang}/${d.sec}/${d.page}"><small>${esc(d.sTitle)}</small><b>${esc(d.title)}</b><span>${snip}</span></a>`;
  }).join('');
  hitSel = 0; markHit();
}
function markHit() { $$('#searchOut .hit').forEach((h, i) => { h.classList.toggle('on', i === hitSel); if (i === hitSel) h.scrollIntoView({ block: 'nearest' }); }); }
function openSearch() { const m = $('#searchModal'); m.hidden = false; const i = $('#searchInput'); i.focus(); i.select(); doSearch(i.value); }
function closeSearch() { $('#searchModal').hidden = true; }

/* ------------------------------------------------------------------ boot */
async function boot() {
  const saved = store.get('cy-lang');
  lang = saved === 'pt' || saved === 'en' ? saved : (/^pt/i.test(navigator.language || '') ? 'pt' : 'en');
  try { NAV = await (await fetch('content/nav.json')).json(); }
  catch (e) { $('#page').innerHTML = '<h1>Could not load content/nav.json</h1><p>If you opened index.html straight from the disk, serve the folder instead (for example <code>python -m http.server</code>) or publish it with GitHub Pages.</p>'; return; }

  $('#lang').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const r = parseRoute();
    location.hash = `#/${b.dataset.l}${r.sec ? '/' + r.sec + (r.page ? '/' + r.page : '') : '/'}`;
  });
  $('#menuBtn').onclick = () => document.body.classList.toggle('nav-open');
  $('#scrim').onclick = closeNav;
  $('#searchBtn').onclick = openSearch;
  $('#searchModal').addEventListener('click', e => { if (e.target.id === 'searchModal' || e.target.closest('a.hit')) closeSearch(); });
  $('#searchInput').addEventListener('input', e => doSearch(e.target.value));
  $('#lightbox').addEventListener('click', () => { const lb = $('#lightbox'); lb.hidden = true; lb.replaceChildren(); });
  document.addEventListener('keydown', e => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#searchModal').hidden ? openSearch() : closeSearch(); return; }
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); return; }
    if (e.key === 'Escape') { closeSearch(); const lb = $('#lightbox'); lb.hidden = true; lb.replaceChildren(); closeNav(); }
    if (!$('#searchModal').hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault(); const n = $$('#searchOut .hit').length; if (n) { hitSel = (hitSel + (e.key === 'ArrowDown' ? 1 : n - 1)) % n; markHit(); }
    }
    if (!$('#searchModal').hidden && e.key === 'Enter') { const h = $$('#searchOut .hit')[hitSel]; if (h) { location.hash = h.getAttribute('href'); closeSearch(); } }
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-copy]'); if (!b) return;
    const code = $('code', b.closest('.code')).textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).catch(() => {
      const ta = document.createElement('textarea'); ta.value = code; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (x) { /* ignore */ } ta.remove();
    }).finally(() => { const o = b.textContent; b.textContent = T[lang].copied; setTimeout(() => b.textContent = o, 1200); });
  });
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  addEventListener('hashchange', render);
  if (!location.hash) history.replaceState(null, '', `#/${lang}/`);
  render();
}
boot();
})();
