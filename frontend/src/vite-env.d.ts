/// <reference types="vite/client" />

// Declaração padrão para SVGs como React components
declare module "*.svg?react" {
    import type * as React from "react";
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }