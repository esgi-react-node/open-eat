export class Renderer {
    /**
     * Creates a renderer
     *
     * @param {HTMLElement} element
     * @return Renderer
     */
    constructor(element) {
        if (!(element instanceof HTMLElement)) {
            throw new TypeError(`I was expecting ${JSON.stringify(element)} to be an HTMLElement.`);
        }

        this.element = element;
    }

    /**
     * Renders a view to an HTML element
     *
     * @param {string} view
     * @return {void}
     */
    render(view) {
        if (typeof view !== "string") {
            throw new TypeError(`I was expecting ${JSON.stringify(view)} to be a string.`);
        } 

        this.element.innerHTML = view;
    }
}
