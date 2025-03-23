/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASENAME: string; // Add all custom env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
