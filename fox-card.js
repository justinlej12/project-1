import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class FoxCard extends DDDSuper(LitElement) {

  static properties = {
    index: { type: Number },
    image: { type: String },
    title: { type: String },
    description: { type: String },
    author: { type: String },
    avatar: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    userVote: { type: String }
  };

  static styles = [
    super.styles,
    css`
      .card {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: light-dark(white, #1c1c1c);
        color: light-dark(black, white);
        border-radius: 20px;
        overflow: hidden;
      }

      .header {
        display: flex;
        align-items: center;
        padding: 10px;
        font-weight: bold;
        flex-shrink: 0; 
      }

      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .image-container {
        height: 72%;
        overflow: hidden;
        flex-shrink: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .bottom {
        height: 28%;
        padding: 12px;
        border-top: 1px solid light-dark(#eee, #333);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .actions {
        display: flex;
        gap: 16px;
        margin-bottom: 8px;
        align-items: center;
      }

      .button {
        cursor: pointer;
        user-select: none;
      }

      .selected-like {
        color: green;
        font-weight: bold;
      }

      .selected-dislike {
        color: red;
        font-weight: bold;
      }

      .share {
        margin-left: auto;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.7;
      }

      .share:hover {
        opacity: 1;
      }

      .title {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .description {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ];

  render() {
    return html`
      <div class="card">
        <div class="header">
          <img class="avatar" src="${this.avatar}" alt="author avatar">
          ${this.author}
        </div>
        <div class="image-container">
          <img loading="lazy" src="${this.image}" alt="${this.title}">
        </div>
        <div class="bottom">
          <div class="actions">
            <span
              class="button ${this.userVote === "like" ? "selected-like" : ""}"
              title="Like"
              @click=${() => this.vote("like")}
            >
              ❤️ ${this.likes}
            </span>
            <span
              class="button ${this.userVote === "dislike" ? "selected-dislike" : ""}"
              title="Dislike"
              @click=${() => this.vote("dislike")}
            >
              👎 ${this.dislikes}
            </span>
            <span
              class="share"
              title="Copy link to this image"
              @click=${this.share}
            >
              🔗
            </span>
          </div>
          <div class="title">${this.title}</div>
          <div class="description">${this.description}</div>
        </div>
      </div>
    `;
  }

  vote(type) {
    this.dispatchEvent(new CustomEvent("vote", {
      bubbles: true,
      composed: true,
      detail: { index: this.index, type }
    }));
  }

  share() {
    const url = new URL(window.location);
    url.searchParams.set("index", this.index);
    navigator.clipboard.writeText(url.toString());
    alert("Link copied!");
  }
}

customElements.define("fox-card", FoxCard);