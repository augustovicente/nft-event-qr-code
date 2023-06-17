import { useLayoutEffect, useState } from "react";

export type Size = {
    width: number | undefined;
    height: number | undefined;
}

/**
 * Hook que adiciona um listener no evento "resize"
 * para verificar o tamanho atual da janela do navegador
 */
export const useWindowSize = (): Size => {
    const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined,
    });

    useLayoutEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
