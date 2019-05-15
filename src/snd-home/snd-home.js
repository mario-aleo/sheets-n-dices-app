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
          min-height: 125vh;
        }
      `,
    ];
  }

  render() {
    return html`
      Home
    `;
  }
}

customElements.define('snd-home', SndHome);
