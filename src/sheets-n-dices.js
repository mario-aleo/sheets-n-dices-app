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
          display: grid;
          grid-template-rows: 64px auto;
          grid-template-columns: auto;
          grid-template-areas:
            'app-header'
            'app-body';
          min-height: 100vh;
          width: 100vw;
        }

        #app-header {
          grid-area: app-header;
          position: fixed;
          width: 100vw;
        }

        #app-body {
          grid-area: app-body;
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
      this.route = location.pathname;
    });

    installOfflineWatcher(offline => {
      this.offline = offline;
    });
  }

  render() {
    return html`
      <app-header id="app-header" fixed effects="waterfall">
        <app-toolbar>
          <div main-title>Sheets 'n Dices</div>
        </app-toolbar>
      </app-header>

      <section id="app-body">
        ${this.renderRoute()}
      </section>
    `;
  }

  renderRoute() {
    switch (this.route) {
      case '/create':
        return html`
          <span>Create</span>
          <a href="home">Home</a>
        `;
      default:
        return html`
          <snd-home></snd-home>
        `;
    }
  }
}

customElements.define('sheets-n-dices', SheetsNDices);
