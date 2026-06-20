# Coral Jovem de Piracicaba

Site estatico para organizar repertorio de coral com apresentacao, lista de musicas, letras e links de Spotify/YouTube.

## Como abrir

Abra `index.html` no navegador. Nao precisa instalar dependencias nem rodar build.

## Como editar as musicas

Edite o array `SONGS` em `js/app.js`.

Campos principais:

- `title`: nome da musica
- `category`: Entrada, Comunhao, Final, Natal, etc.
- `status`: Em ensaio, Pronta, Revisar
- `key`: tom
- `tempo`: andamento
- `voices`: formato vocal
- `lyrics`: letra em linhas separadas
- `spotifyUrl`: link normal do Spotify ou link embed
- `youtubePlaybackUrl`: link do YouTube com playback
- `youtubeVocalUrl`: link do YouTube com a versao cantada

Links normais do Spotify e YouTube sao convertidos para embeds automaticamente pelo site.
