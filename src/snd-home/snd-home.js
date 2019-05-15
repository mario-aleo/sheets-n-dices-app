import { LitElement, html, css } from 'lit-element';

class SndHome extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  render() {
    return html`
      <span>Home</span>
      <a href="create">Create</a>
    `;
  }
}

customElements.define('snd-home', SndHome);
