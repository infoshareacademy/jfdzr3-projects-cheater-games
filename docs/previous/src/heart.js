export const makeHeart = (selector) => {
    return {
        element: document.querySelector(selector),
        show: function () {
            this.element.style.visibility = "unset"
        },
        hide: function () {
            this.element.style.visibility = "hidden"
        }
    }
}
