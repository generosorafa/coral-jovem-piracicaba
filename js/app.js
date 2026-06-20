const CHOIR_NAME = "Coral Jovem de Piracicaba";

const SONGS = [
  {
    id: "nenhuma-pedra",
    title: "Nenhuma Pedra",
    category: "Louvor",
    status: "Em ensaio",
    key: "A definir",
    tempo: "A definir",
    voices: "Coral jovem",
    date: "A definir",
    summary: "Versao de referencia do Coral Jovem do UNASP para estudo do grupo.",
    tags: ["adoracao", "referencia UNASP", "cantada"],
    spotifyUrl: "https://open.spotify.com/track/4DfFBs7HZEM7BYaf9e8002?si=5QUO2G5HTY2Wyc8MED_0Ug",
    youtubePlaybackUrl: "",
    youtubeVocalUrl: "https://youtu.be/fKFQlckmQJQ?is=qQPQpm5RE4IMowLX",
    lyrics: [
      "Se falhar em viver Seu chamado pra mim",
      "Eu sei, Senhor, que as pedras irão clamar",
      "Se deixar de cumprir a gloriosa missão",
      "Eu sei, Senhor, que as pedras irão clamar",
      "",
      "Mas eu confessarei que Tu és Deus",
      "Que tua justiça me alcançou",
      "Maior que tudo é Teu amor",
      "",
      "Sim, eu confessarei o Teu poder",
      "Que a Tua mão me libertou",
      "E sobre todos és Senhor",
      "",
      "Nenhuma pedra vai tomar o meu lugar",
      "Nenhuma pedra vai clamar, enfim",
      "Proclamarei Teu reino",
      "Nenhuma pedra vai falar por mim",
      "",
      "Se deixar de cumprir a gloriosa missão",
      "Eu sei, Senhor, que as pedras irão clamar",
      "",
      "Oh, oh, oh, oh",
      "Nenhuma pedra"
    ]
  },
  {
    id: "rotina",
    title: "Rotina",
    category: "Louvor",
    status: "Em ensaio",
    key: "A definir",
    tempo: "A definir",
    voices: "Coral jovem",
    date: "A definir",
    summary: "Musica para trabalhar prioridade espiritual, diccao do trecho falado e unidade no refrao.",
    tags: ["adoracao", "trecho falado", "cantada"],
    spotifyUrl: "https://open.spotify.com/track/34nY3m1bCSpPLRth0FCc9F?si=QUbQ9ezYRHquTrcTMNbHEw",
    youtubePlaybackUrl: "",
    youtubeVocalUrl: "https://youtu.be/qJAHnv6zXZQ?is=COlcyfdmQ88PTR9c",
    lyrics: [
      "É que a gente se encanta com as cores por aqui",
      "E o barulho desse mundo chama a atenção",
      "Mas não quero confundir, primeiro é o Teu lugar",
      "Por Teu querer irá pulsar meu coração",
      "",
      "Se é correria, se é fim do dia",
      "Meu coração quer te agradar",
      "Se tem gente perto, mesmo que deserto",
      "Eu faço tudo pra te ver sorrir",
      "Mesmo na agonia da minha rotina",
      "Tens o trono do meu coração",
      "Vem reinar a cada dia e pra sempre em mim",
      "",
      "É que a gente se limita marca dia e lugar",
      "Mas pro coração que ama não tem tempo, não tem hora",
      "Reconheço todo tempo que Teu tempo é meu lugar",
      "E toda hora vira hora de adorar",
      "",
      "Se é correria, se é fim do dia",
      "Meu coração quer te agradar",
      "Se tem gente perto, mesmo que deserto",
      "Eu faço tudo pra te ver sorrir",
      "Mesmo na agonia da minha rotina",
      "Tens o trono do meu coração",
      "Vem reinar a cada dia e pra sempre em mim",
      "",
      "Quantas vezes eu acordo sem me preocupar",
      "Começo a viver, vou vendo onde vai dar",
      "Andar por aí sem ter intimidade",
      "Também o tempo é curto pra muita atividade",
      "Começo a estudar, trabalhar e a questão",
      "O que é mais importante na vida do cristão?",
      "Se for um compromisso, que seja com o Senhor",
      "Senão é desperdício de uma vida sem valor",
      "Quero ser guiado, andando lado a lado",
      "Para sempre com o meu Senhor",
      "Vencendo todo dia a mesma tentação",
      "De não render a Cristo inteiramente o meu coração",
      "Pois Ele é quem traz pra minha vida a paz",
      "Lhe agradar é o que me faz O querer ainda mais",
      "",
      "Se é correria, se é fim do dia",
      "Meu coração quer te agradar",
      "Se tem gente perto, mesmo que deserto",
      "Eu faço tudo pra te ver sorrir",
      "Mesmo na agonia da minha rotina",
      "Tens o trono do meu coração",
      "Vem reinar a cada dia e pra sempre...",
      "Vem reinar a cada dia e pra sempre em mim"
    ]
  }
];

const state = {
  query: "",
  category: "all",
  status: "all",
  selectedId: SONGS[0]?.id ?? ""
};

const els = {
  globalSearch: document.querySelector("#globalSearch"),
  categoryFilter: document.querySelector("#categoryFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  songList: document.querySelector("#songList"),
  sidebarSongs: document.querySelector("#sidebarSongs"),
  songDetail: document.querySelector("#songDetail"),
  songCount: document.querySelector("#songCount"),
  selectedHint: document.querySelector("#selectedHint")
};

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function uniqueValues(key) {
  return [...new Set(SONGS.map((song) => song[key]).filter(Boolean))].sort();
}

function populateFilter(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function matchesSong(song) {
  const haystack = normalize([
    song.title,
    song.category,
    song.status,
    song.key,
    song.tempo,
    song.voices,
    song.tags.join(" ")
  ].join(" "));

  const matchesQuery = !state.query || haystack.includes(normalize(state.query));
  const matchesCategory = state.category === "all" || song.category === state.category;
  const matchesStatus = state.status === "all" || song.status === state.status;

  return matchesQuery && matchesCategory && matchesStatus;
}

function filteredSongs() {
  return SONGS.filter(matchesSong);
}

function spotifyEmbedUrl(url) {
  if (!url) return "";
  if (url.includes("open.spotify.com/embed/")) return url;

  const match = url.match(/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist|episode)\/([^?]+)/);
  if (!match) return "";

  return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator`;
}

function youtubeEmbedUrl(url) {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;

  const longMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?]+)/);
  const id = longMatch?.[1] || shortMatch?.[1] || shortsMatch?.[1];

  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function mediaBlock(label, url, type) {
  const embed = type === "spotify" ? spotifyEmbedUrl(url) : youtubeEmbedUrl(url);
  const frameTitle = `${label} - ${CHOIR_NAME}`;
  const frame = embed
    ? `<iframe title="${escapeHtml(frameTitle)}" src="${escapeHtml(embed)}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>
       <a class="media-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Abrir link</a>`
    : `<div class="media-empty">Link pendente</div>`;

  return `
    <section class="media-box ${type === "spotify" ? "spotify" : ""}">
      <div class="media-title">
        <span>${escapeHtml(label)}</span>
      </div>
      ${frame}
    </section>
  `;
}

function songButton(song, compact = false) {
  const isActive = song.id === state.selectedId ? " active" : "";

  if (compact) {
    return `
      <button class="${isActive}" type="button" data-song-id="${escapeHtml(song.id)}">
        <span>${escapeHtml(song.title)}</span>
        <small class="sidebar-song-meta">${escapeHtml(song.key)}</small>
      </button>
    `;
  }

  return `
    <button class="song-card${isActive}" type="button" data-song-id="${escapeHtml(song.id)}">
      <strong>${escapeHtml(song.title)}</strong>
      <small>${escapeHtml(song.summary)}</small>
      <span>${escapeHtml(song.category)} · ${escapeHtml(song.key)}</span>
    </button>
  `;
}

function renderSongList() {
  const songs = filteredSongs();
  const selectedVisible = songs.some((song) => song.id === state.selectedId);

  if (!selectedVisible && songs.length) {
    state.selectedId = songs[0].id;
    history.replaceState(null, "", `#${state.selectedId}`);
  }

  els.songCount.textContent = `${songs.length} ${songs.length === 1 ? "musica" : "musicas"}`;
  els.selectedHint.textContent = state.selectedId ? "Aberta agora" : "Selecione uma musica";
  els.songList.innerHTML = songs.length
    ? songs.map((song) => songButton(song)).join("")
    : `<div class="empty-state">Nenhuma musica encontrada.</div>`;

  els.sidebarSongs.innerHTML = SONGS.map((song) => songButton(song, true)).join("");
}

function renderSongDetail() {
  const song = SONGS.find((item) => item.id === state.selectedId) ?? filteredSongs()[0];

  if (!song) {
    els.songDetail.innerHTML = `<div class="empty-state">Escolha uma musica do repertorio.</div>`;
    return;
  }

  const meta = [
    ["Tom", song.key],
    ["Andamento", song.tempo],
    ["Vozes", song.voices],
    ["Ensaio", song.date]
  ];

  els.songDetail.innerHTML = `
    <div class="detail-head">
      <div>
        <p class="eyebrow">${escapeHtml(song.category)}</p>
        <h2>${escapeHtml(song.title)}</h2>
        <p>${escapeHtml(song.summary)}</p>
        <div class="song-meta">
          ${meta.map(([label, value]) => `<span>${escapeHtml(label)}: ${escapeHtml(value)}</span>`).join("")}
        </div>
      </div>
      <span class="status-pill">${escapeHtml(song.status)}</span>
    </div>

    <div class="tag-row">
      ${song.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>

    <div class="detail-layout">
      <pre class="lyrics">${escapeHtml(song.lyrics.join("\n"))}</pre>
      <aside class="media-stack" aria-label="Midias da musica">
        ${mediaBlock("Spotify", song.spotifyUrl, "spotify")}
        ${mediaBlock("YouTube playback", song.youtubePlaybackUrl, "youtube")}
        ${mediaBlock("YouTube cantada", song.youtubeVocalUrl, "youtube")}
      </aside>
    </div>
  `;
}

function selectSong(id) {
  if (!SONGS.some((song) => song.id === id)) return;
  state.selectedId = id;
  history.replaceState(null, "", `#${id}`);
  renderSongList();
  renderSongDetail();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-song-id]");
    if (!button) return;

    selectSong(button.dataset.songId);
    document.querySelector("#repertorio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  els.globalSearch.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderSongList();
    renderSongDetail();
  });

  els.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderSongList();
    renderSongDetail();
  });

  els.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    renderSongList();
    renderSongDetail();
  });

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (id) selectSong(id);
  });
}

function init() {
  populateFilter(els.categoryFilter, uniqueValues("category"));
  populateFilter(els.statusFilter, uniqueValues("status"));

  const hashId = location.hash.replace("#", "");
  if (SONGS.some((song) => song.id === hashId)) {
    state.selectedId = hashId;
  }

  bindEvents();
  renderSongList();
  renderSongDetail();
}

init();
