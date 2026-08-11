# LLM Learning Game

A small interactive game to learn the fundamentals of how Large Language Models (LLMs) work.

## About

This project visualizes core LLM concepts through hands-on interaction:

- **Tokenization** — see how text is split into tokens
- **Token embeddings** — explore how tokens relate to each other in vector space (find nearest neighbors by embedding distance)
- **Next-token prediction** — see the most likely tokens to follow any given token based on co-occurrence data
- **Answer building** — construct answers to questions by dragging and dropping tokens

It is supposed to teach about why not to always trust LLMs. Especially concepts like hallucination and bias 

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

## Localization and Datasets

The app now supports language-specific UI labels and language-specific datasets loaded dynamically from JSON.

- UI bundle files:
	- `src/locales/en/bundle.json`
	- `src/locales/de/bundle.json`
- Dataset files:
	- `src/datasets/en/test-dataset.json`
	- `src/datasets/de/test-dataset.json`

Language can be changed in the app header and is persisted in localStorage.

To add a language:

1. Add a new bundle file in `src/locales/<lang>/bundle.json`.
2. Add a new dataset file in `src/datasets/<lang>/test-dataset.json`.
3. Extend `SupportedLanguage` in `src/i18n/types.ts`.
4. Register new imports in `src/i18n/loader.ts` and `src/datasets/loader.ts`.
5. Add the language option in `src/App.tsx`.

## License

MIT
