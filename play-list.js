import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./play-list-arrow.js";
import "./play-list-dot.js";

class PlayList extends DDDSuper(LitElement) {
  static properties = {
    index: { type: Number },
    _slideCount: { state: true }
  };

  constructor() {
    super();
    this.index = 0;
    this._slideCount = 0;
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
        position: relative;
        height: 600px;
        overflow: hidden;
        padding-right: 50px;
      }

      .slides {
        display: flex;
        flex-direction: column;
        transition: transform 0.4s ease;
        height: 100%;
      }

      ::slotted(*) {
        min-height: 100%;
      }

      .controls {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    `
  ];

  render() {
    return html`
      <div class="slides" style="transform: translateY(-${this.index * 100}%);">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      <div class="controls">
        <play-list-arrow direction="up"></play-list-arrow>=
        ${Array.from({ length: this._slideCount }).map(
          (_, i) => html` <play-list-dot .index=${i} .active=${i === this.index}> </play-list-dot>`
        )}
        <play-list-arrow direction="down"></play-list-arrow>
      </div>
    `;
  }

  _handleSlotChange(e) {
    const assigned = e.target.assignedElements({ flatten: true });
    this._slideCount = assigned.length;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("arrow-click", e => {
      if (e.detail.direction === "up") {
        this.index =
          this.index === 0 ? this._slideCount - 1 : this.index - 1;
      } else {
        this.index =
          this.index === this._slideCount - 1 ? 0 : this.index + 1;
      }
    });

    this.addEventListener("dot-click", e => {
      this.index = e.detail.index;
    });
  }
}

customElements.define("play-list", PlayList);