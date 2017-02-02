(function() {
'use strict';

Polymer({
  is: 'method-selector',
  properties: {
    // Currently selected HTTP method
    method: {
      type: String,
      value: 'GET',
      notify: true
    },
    // True if the request for selected HTTP method can carry a payload. It is defined in HTTP spec.
    isPayload: {
      type: Boolean,
      value: false,
      readOnly: true,
      notify: true,
      reflectToAttribute: true,
      computed: '_computeIsPayload(method)'
    },
    methodMenuOpened: {
      type: Boolean,
      value: false
    },
    // True to display custom method
    showCustom: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_dropdownMenuOpened(methodMenuOpened, method)'
  ],

  get standardMethods() {
    return ['get','post','put','delete','patch','head','connect','options', 'trace'];
  },

  // Compute if the tayload can carry a payload.
  _computeIsPayload: function(method) {
    return ['GET', 'HEAD'].indexOf(method) === -1;
  },
  /**
   * Checks if there is an empty method name and if it is it will set `showCustom` property
   * that constrolls display of a custom method input.
   */
  _dropdownMenuOpened: function(opened, method) {
    if (!opened && method === '') {
      this.set('showCustom', true);
      this.async(() => {
        this.$.customMethod.focus();
      }, 1);
    } else {
      var m = method && method.toLowerCase();
      if (!m) {
        return;
      }
      m = m.trim();
      if (this.standardMethods.indexOf(m) !== -1) {
        this.set('showCustom', false);
      } else {
        this.set('showCustom', true);
      }
    }
  }
});
})();
