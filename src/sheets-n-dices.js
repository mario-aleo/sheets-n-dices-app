import { LitElement, html, css } from 'lit-element';
import { installRouter, installOfflineWatcher } from 'pwa-helpers';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import './snd-home/snd-home';

class SheetsNDices extends LitElement {
  static get properties() {
    return {
      route: {
        type: String,
        reflect: true,
        attribute: false,
      },
      offline: {
        type: Boolean,
        reflect: true,
        attribute: false,
      },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        app-header {
          background-color: red;
        }
      `,
    ];
  }

  constructor() {
    super();

    installRouter((location, event) => {
      if (event && event.type === 'click') window.scrollTo(0, 0);
      this.route = location;
    });

    installOfflineWatcher(offline => {
      this.offline = offline;
    });
  }

  render() {
    return html`
      <app-header fixed effects="waterfall">
        <app-toolbar>
          <div main-title>Sheets 'n Dices</div>
        </app-toolbar>
      </app-header>

      ${this.renderRoute()}
    `;
  }

  renderRoute() {
    switch (this.route) {
      default:
        return html`
          <snd-home></snd-home>
        `;
    }
  }
}

customElements.define('sheets-n-dices', SheetsNDices);
