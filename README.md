# Portfólio Luiz Gustavo Dias Pulz

Site SPA responsivo, animado e profissional, feito com Tailwind CSS, Animista JS e integração dinâmica com projetos do GitHub.

## Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/luizGDpulz/luizGDpulz.github.io.git
   ```
2. Abra o arquivo `index.html` no navegador (não precisa de servidor, pois é SPA estática).

## Estrutura
- `index.html`: página principal
- `scripts/github.js`: busca projetos do GitHub
- `scripts/anim.js`: animações Animista
- `assets/avatar.svg`: avatar LGD
- `assets/placeholder.png`: thumbnail padrão

## Deploy manual no GitHub Pages
1. Faça commit e push dos arquivos para o branch `main` do repositório `luizGDpulz.github.io`.
2. No GitHub, acesse Settings > Pages e selecione o branch `main` como fonte.
3. O site estará disponível em: `https://luizGDpulz.github.io/`

## Checklist de qualidade
- [x] Responsivo (320/768/1024/1440px)
- [x] Acessível (aria, contraste, navegação teclado)
- [x] SEO (meta tags, og:image, rel="me")
- [x] Animações suaves e respeitam prefers-reduced-motion
- [x] Projetos dinâmicos do GitHub (com fallback)
- [x] Dark mode toggle

## Personalização
- Para alterar avatar, substitua `assets/avatar.svg`.
- Para thumbnails, substitua `assets/placeholder.png`.
- Para adicionar projetos simulados, edite `FALLBACK_PROJECTS` em `scripts/github.js`.

## Licença
MIT