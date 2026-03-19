/**
 * Copyright 2026 justinlej12
 * @license Apache-2.0
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./fox-card.js";

class Project1 extends DDDSuper(LitElement) {

  static properties = {
    image: { type: String },
    link: { type: String }
  };

  constructor() {
    super();
    this.image = "";
    this.link = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadFox();
  }

  async loadFox() {
    try {

      const response = await fetch("https://randomfox.ca/floof/");
      const data = await response.json();

      this.image = data.image;
      this.link = data.link;

    } catch (error) {
      console.error("Fox API failed", error);
    }
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`

      ${this.image
        ? html`
            <fox-card
              .image=${this.image}
              .link=${this.link}>
            </fox-card>
          `
        : html`<p>Loading fox...</p>`
      }

    `;
  }
}

customElements.define("project-1", Project1);