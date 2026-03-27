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
        background: white;
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
        width: 100%;
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
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: hidden;
      }

      .actions {
        display: flex;
        gap: 20px;
        font-size: 18px;
        margin-bottom: 8px;
      }

      .button {
        cursor: pointer;
      }

      .selected-like {
        color: green;
        font-weight: bold;
      }

      .selected-dislike {
        color: red;
        font-weight: bold;
      }

      .title {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .description {
        
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @media (prefers-color-scheme: dark) {
        .card {
            background: #1c1c1c;
            color: white;
        }

        .bottom {
            border-top: 1px solid #333;
        }

        .title {
            color: white;
        }

        .description {
            color: #ccc;
        }

        .header {
            color: white;
        }
        }
    `
  ];

  render() {
    return html`
      <div class="card">
        <div class="header">
          <img class="avatar" src="${this.avatar}">
          ${this.author}
        </div>
        <div class="image-container">
          <img src="${this.image}">
        </div>
        <div class="bottom">
          <div class="actions">
            <span
              class="button ${this.userVote === "like" ? "selected-like" : ""}"
              @click=${() => this.vote("like")}
            >
              ❤️ ${this.likes}
            </span>
            <span
              class="button ${this.userVote === "dislike" ? "selected-dislike" : ""}"
              @click=${() => this.vote("dislike")}
            >
              👎 ${this.dislikes}
            </span>
          </div>
          <div class="title">${this.title}</div>
          <div class="description">${this.description}</div>
        </div>
      </div>
    `;
  }

  vote(type) {
    this.dispatchEvent(
      new CustomEvent("vote", {
        bubbles: true,
        composed: true,
        detail: {
          index: this.index,
          type: type
        }
      })
    );
  }
}

customElements.define("fox-card", FoxCard);