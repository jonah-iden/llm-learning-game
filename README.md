# LLM Learning Game

A small interactive game to learn the fundamentals of how Large Language Models (LLMs) work.

## About

This project visualizes core LLM concepts through hands-on interaction:

- **Tokenization** — see how text is split into tokens
- **Token embeddings** — explore how tokens relate to each other in vector space (find nearest neighbors by embedding distance)
- **Next-token prediction** — see the most likely tokens to follow any given token based on co-occurrence data
- **Answer building** — construct answers to questions by dragging and dropping tokens

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [dnd-kit](https://dndkit.com/) — drag and drop
- [Zustand](https://zustand-demo.pmnd.rs/) — state management

## License

MIT
