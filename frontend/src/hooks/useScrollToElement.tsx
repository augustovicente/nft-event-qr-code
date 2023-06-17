import { useEffect } from "react";

/**
 * @param element - The element to scroll to
 * @param trigger - The trigger to scroll to the element
 * @example useScrollToElement('.active', selectedTab)
 */
export const useScrollToElement = (element: string, trigger: unknown) => {
    useEffect(() => {
        const activeLink = document.querySelector(element);

        if (activeLink) {
            activeLink.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }
    }, [element, trigger])
}
