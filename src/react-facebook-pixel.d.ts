declare module 'react-facebook-pixel' {
    export function init(pixelId: string, advancedMatching?: object, options?: object): void;
    export function pageView(): void;
    export function track(event: string, data?: object): void;
    export function trackCustom(event: string, data?: object): void;
    export function fbq(...args: any[]): void;
  }