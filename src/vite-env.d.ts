/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** JSON POST target for the contact and athlete-application forms. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mp4' {
  const src: string
  export default src
}

// vite/client only declares lowercase image extensions, so the uppercase
// filenames in src/imports need their own declarations for `tsc --noEmit`.
declare module '*.JPG' {
  const src: string
  export default src
}

declare module '*.JPEG' {
  const src: string
  export default src
}

declare module '*.PNG' {
  const src: string
  export default src
}
