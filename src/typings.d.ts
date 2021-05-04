declare module 'browser-monads' {
    const window: Window & typeof globalThis
    export { window }
  }