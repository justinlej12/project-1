import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class FoxCard extends DDDSuper(LitElement) {

  static properties = {
    image: { type: String },
    link: { type: String }
  };

  constructor() {
    super();
    this.image = "";
    this.link = "";
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
      }

      .card {
        border-radius: 12px;
        overflow: hidden;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }

      .header {
        display: flex;
        align-items: center;
        padding: 10px;
        font-weight: bold;
      }

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #ddd;
        margin-right: 10px;
      }

      img {
        width: 100%;
        display: block;
      }

      .caption {
        padding: 10px;
        font-size: 14px;
      }

      a {
        text-decoration: none;
        color: #0077cc;
      }
    `
  ];

  render() {
    return html`

      <div class="card">

        <div class="header">
          <div class="avatar"></div>
          fox_user
        </div>

        <img src="${this.image}" alt="Random Fox">

        <div class="caption">
          A random fox from the fox API 🦊 <br>
          <a href="${this.link}" target="_blank">View source</a>
        </div>

      </div>

    `;
  }
}

customElements.define("fox-card", FoxCard);