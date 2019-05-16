import { LitElement, html, css } from 'lit-element';
import { installRouter, installOfflineWatcher } from 'pwa-helpers';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import { signIn, signOut, authChanged } from './snd-firebase/snd-firebase';
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
      },
      authorized: {
        type: Boolean,
        reflect: true,
      },
      unresolved: {
        type: Boolean,
        reflect: true,
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
          contain: strict;

          --primary-color: #673ab7;
          --dark-primary-color: #37006a;
          --light-primary-color: #9b4dcb;
          --on-primary-color: #fff;

          --secondary-color: #03a9f4;
          --dark-secondary-color: #0094cc;
          --light-secondary-color: #82f7ff;
          --on-secondary-color: #000;
        }

        #app-header {
          grid-area: app-header;
          position: fixed;
          width: 100vw;
          color: var(--on-primary-color);
          background-color: var(--primary-color);
        }

        #offline {
          opacity: 0;
          visibility: hidden;
          transition: opacity ease-in-out 0.33s;
          will-change: opacity, transition;
          contain: content;
        }
        :host([offline]) #offline {
          opacity: 1;
          visibility: visible;
        }

        #signout {
          opacity: 0;
          visibility: hidden;
          transition: opacity ease-in-out 0.33s;
          will-change: opacity, transition;
          contain: content;
        }
        :host([authorized]) #signout {
          opacity: 1;
          visibility: visible;
        }

        #app-body {
          grid-area: app-body;
        }

        #app-login-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 64px;
          left: 0;
          width: 100vw;
          height: calc(100vh - 64px);
          color: var(--on-primary-color);
          background-color: var(--primary-color);
          transition: transform ease-in-out 0.33s;
          will-change: transform, transition;
          contain: content;
        }
        :host([authorized]) #app-login-overlay {
          transform: translateY(100%);
        }

        #signin {
          opacity: 1;
          visibility: visible;
          transition: opacity ease-in-out 0.33s;
          will-change: opacity, transition;
          contain: content;
        }
        :host([authorized]) #signin,
        :host([unresolved]) #signin {
          opacity: 0;
          visibility: hidden;
        }
      `,
    ];
  }

  /* Lifecycle */
  constructor() {
    super();

    this.route = '';
    this.offline = false;
    this.authorized = false;
    this.unresolved = true;

    authChanged(this._onAuthChanged.bind(this));
    installRouter(this._onRouteChanged.bind(this));
    installOfflineWatcher(this._onOfflineChanged.bind(this));
  }

  firstUpdated() {}
  /* */

  /* Render */
  render() {
    return html`
      <app-header id="app-header" fixed effects="waterfall">
        <app-toolbar>
          <div main-title>Sheets 'n Dices</div>
          <iron-icon id="offline" icon="cloud-off"></iron-icon>
          <paper-icon-button
            id="signout"
            icon="power-settings-new"
            @click="${signOut}"
          ></paper-icon-button>
        </app-toolbar>
      </app-header>

      <section id="app-body">
        ${this._renderRoute()}
      </section>

      <section id="app-login-overlay">
        <paper-button id="signin" raised @click="${signIn}">Sign In</paper-button>
      </section>
    `;
  }

  _renderRoute() {
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
  /* */

  /* Private */
  _onOfflineChanged(offline) {
    this.offline = offline;
  }

  _onRouteChanged(location, event) {
    if (event && event.type === 'click') window.scrollTo(0, 0);
    this.route = location.pathname;
  }

  _onAuthChanged(auth) {
    this.unresolved = false;
    this.authorized = !!auth;
  }
  /* */

  /* Public */
  /* */
}

customElements.define('sheets-n-dices', SheetsNDices);
