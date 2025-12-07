/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Read more about how to set environment variables in Vite:
  // https://vitejs.dev/guide/env-and-mode.html
  
  readonly VITE_API_BASE_URL: string // <-- Custom variable defined in your .env file
  // readonly VITE_OTHER_VARIABLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}