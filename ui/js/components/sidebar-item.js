export class sidebarItem extends HTMLElement {
    constructor() {
        super(...arguments);
        this._text = "";
        this._selected = false;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.update();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.update();
    }
    connectedCallback() {
        this.render();
        this.update();
    }
    render() {
        this.innerHTML = `
      <div class="sidebar-item">
        <span class="text"></span>
      </div>

    `;
    }
    update() {
        const item = this.querySelector(".sidebar-item");
        if (!item)
            return;
        const text = item.querySelector(".text");
        if (text) {
            text.textContent = this._text;
        }
        item.classList.toggle("selected", this._selected);
    }
}
customElements.define("sidebar-item", sidebarItem);
