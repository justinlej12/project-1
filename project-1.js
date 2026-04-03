import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

import "./fox-card.js";
import "./play-list.js";

class Project1 extends DDDSuper(LitElement) {
  static properties = {
    photos: { type: Array },
    likes: { type: Object },
    dislikes: { type: Object },
    userVotes: { type: Object },
    index: { type: Number }
  };

  constructor() {
    super();
    this.photos = [];
    this.likes = {};
    this.dislikes = {};
    this.userVotes = {};
    this.index = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadFromStorage();
    this.loadIndexFromURL();
    this.loadPhotos();
  }

  loadIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    const i = parseInt(params.get("index"));
    if (!isNaN(i)) this.index = i;
  }

  updateURL() {
    const url = new URL(window.location);
    url.searchParams.set("index", this.index);
    window.history.replaceState({}, "", url);
  }

  async loadPhotos() {
    const response = await fetch(
      new URL("./data/photos.json", import.meta.url).href
    );
    const data = await response.json();
    this.photos = data.photos;
  }

  saveToStorage() {
    localStorage.setItem("foxLikes", JSON.stringify(this.likes));
    localStorage.setItem("foxDislikes", JSON.stringify(this.dislikes));
    localStorage.setItem("foxVotes", JSON.stringify(this.userVotes));
  }

  loadFromStorage() {
    this.likes = JSON.parse(localStorage.getItem("foxLikes")) || {};
    this.dislikes = JSON.parse(localStorage.getItem("foxDislikes")) || {};
    this.userVotes = JSON.parse(localStorage.getItem("foxVotes")) || {};
  }

  handleVote(e) {
    const { index, type } = e.detail;
    const prev = this.userVotes[index];

    if (prev === "like") this.likes[index]--;
    if (prev === "dislike") this.dislikes[index]--;

    if (prev === type) {
      this.userVotes[index] = "";
    } else {
      if (type === "like") this.likes[index] = (this.likes[index] || 0) + 1;
      if (type === "dislike") this.dislikes[index] = (this.dislikes[index] || 0) + 1;
      this.userVotes[index] = type;
    }

    this.saveToStorage();
    this.requestUpdate();
  }

  handleSlideChange(e) {
    this.index = e.detail.index;
    this.updateURL();
  }

  sharePhoto(index) {
    const url = `${window.location.origin}?index=${index}`;
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }

  render() {
    return html`
      ${this.photos.length
        ? html`
            <play-list
              .index=${this.index}
              @index-changed=${this.handleSlideChange}
              @vote=${this.handleVote}
              @share=${(e) => this.sharePhoto(e.detail.index)}
            >
              ${this.photos.map((photo, i) => html`
                <fox-card
                  .index=${i}
                  .image=${Math.abs(i - this.index) <= 1 ? photo.image : photo.thumbnail}
                  .title=${photo.title}
                  .description=${photo.description}
                  .author=${photo.author.name}
                  .avatar=${photo.author.avatar}
                  .likes=${this.likes[i] || 0}
                  .dislikes=${this.dislikes[i] || 0}
                  .userVote=${this.userVotes[i] || ""}
                ></fox-card>
              `)}
            </play-list>
          `
        : html`<p>Loading...</p>`}
    `;
  }
}

customElements.define("project-1", Project1);