import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./fox-card.js";
import "./play-list.js";

class Project1 extends DDDSuper(LitElement) {

  static properties = {
    photos: { type: Array },
    likes: { type: Object },
    dislikes: { type: Object },
    userVotes: { type: Object }
  };

  constructor() {
    super();
    this.photos = [];
    this.likes = {};
    this.dislikes = {};
    this.userVotes = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadFromStorage();
    this.loadPhotos();
  }

  async loadPhotos() {
    try {
      const response = await fetch("./data/photos.json");
      const data = await response.json();
      this.photos = data.photos;
    } catch (e) {
      console.error("JSON load failed", e);
    }
  }

  saveToStorage() {
    localStorage.setItem("foxLikes", JSON.stringify(this.likes));
    localStorage.setItem("foxDislikes", JSON.stringify(this.dislikes));
    localStorage.setItem("foxVotes", JSON.stringify(this.userVotes));
  }

  loadFromStorage() {
    const savedLikes = localStorage.getItem("foxLikes");
    const savedDislikes = localStorage.getItem("foxDislikes");
    const savedVotes = localStorage.getItem("foxVotes");
    if (savedLikes) this.likes = JSON.parse(savedLikes);
    if (savedDislikes) this.dislikes = JSON.parse(savedDislikes);
    if (savedVotes) this.userVotes = JSON.parse(savedVotes);
  }

  /* Like/dislike local storage logice */
  handleVote(e) {
    const { index, type } = e.detail;
    const prev = this.userVotes[index];
    if (prev === "like") this.likes[index] = Math.max((this.likes[index] || 1) - 1, 0);
    if (prev === "dislike") this.dislikes[index] = Math.max((this.dislikes[index] || 1) - 1, 0);
    if (prev === type) {
      this.userVotes[index] = "";
    } else {
      if (type === "like") {
        this.likes[index] = (this.likes[index] || 0) + 1;
      } else {
        this.dislikes[index] = (this.dislikes[index] || 0) + 1;
      }
      this.userVotes[index] = type;
    }
    this.saveToStorage();
    this.likes = { ...this.likes };
    this.dislikes = { ...this.dislikes };
    this.userVotes = { ...this.userVotes };
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
      ${this.photos.length > 0
        ? html`
            <div @vote=${this.handleVote}>
              <play-list>=
                ${this.photos.map((photo, index) => html`
                    <fox-card
                      .index=${index}
                      .image=${photo.image}
                      .title=${photo.title}
                      .description=${photo.description}
                      .author=${photo.author}
                      .avatar=${photo.avatar}
                      .likes=${this.likes[index] || 0}
                      .dislikes=${this.dislikes[index] || 0}
                      .userVote=${this.userVotes[index] || ""}>
                    </fox-card>
                `)}
              </play-list>
            </div>
          `
        : html`<p>Loading gallery...</p>`
      }
    `;
  }
}

customElements.define("project-1", Project1);