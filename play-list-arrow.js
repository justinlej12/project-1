import { LitElement, html } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class PlayListArrow extends DDDSuper(LitElement) {
  static properties = {
    direction: { type: String }
  };

  render() {
    return html`
      <button style="
        background: white;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 16px;
        cursor: pointer;
      " @click=${this._click}>
        ${this.direction === "up" ? "↑" : "↓"}
      </button>
    `;
  }

  _click() {
    this.dispatchEvent(
      new CustomEvent("arrow-click", {
        bubbles: true,
        composed: true,
        detail: { direction: this.direction }
      })
    );
  }
}

customElements.define("play-list-arrow", PlayListArrow); 