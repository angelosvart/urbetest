// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/FormControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//Form control as a class to handle all form data and form actions
var FormControl = /*#__PURE__*/function () {
  function FormControl() {
    _classCallCheck(this, FormControl);

    this.name;
    this.surname;
    this.phone;
    this.legal;
    this.email;
    this.comment;
    this.querySelectors = {
      name: document.querySelector("#contact-form #name"),
      surname: document.querySelector("#contact-form #surname"),
      phone: document.querySelector("#contact-form #phone"),
      legal: document.querySelector("#contact-form #legal"),
      email: document.querySelector("#contact-form #email")
    };
  } //Init method that will create all events on the form and all validators for each input


  _createClass(FormControl, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var _loop = function _loop(query) {
        _this.querySelectors[query].addEventListener("blur", function () {
          if (!_this.querySelectors[query].value) {
            _this.querySelectors[query].className = "error";
          }
        });

        _this.querySelectors[query].addEventListener("keyup", function () {
          _this.querySelectors[query].className = "";

          if (!_this.querySelectors[query].value.length) {
            _this.querySelectors[query].className = "error";
          } else {
            _this.querySelectors[query].className = "valid";
          }

          if (query === "phone") {
            var phoneRegex = /^\d{9}$/;
            _this.querySelectors[query].value.match(phoneRegex) ? _this.querySelectors[query].className = "valid" : _this.querySelectors[query].className = "error";
          }

          if (query === "email") {
            var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            _this.querySelectors[query].value.match(emailRegex) ? _this.querySelectors[query].className = "valid" : _this.querySelectors[query].className = "error";
          }
        });

        _this.querySelectors.legal.addEventListener("change", function () {
          _this.querySelectors.legal.className = "valid";
          _this.querySelectors.legal.nextElementSibling.className = "";
        });
      };

      for (var query in this.querySelectors) {
        _loop(query);
      }
    } //Method that will handle actions after submitting form, checking first for empty inputs and then displaying the errors to be fixed
    //When all inputs are valid, save them in the class and commit them.

  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      var errorContainer = document.querySelector("#contact-form .errors");
      var ul = document.createElement("ul");
      errorContainer.style.display = "none";

      for (var query in this.querySelectors) {
        if (!this.querySelectors[query].value && query !== "legal") {
          this.querySelectors[query].className = "error";
        }

        if (query === "legal" && !this.querySelectors[query].checked) {
          this.querySelectors[query].className = "error";
          this.querySelectors[query].nextElementSibling.className = "error-label";
        }
      }

      while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
      }

      for (var _query in this.querySelectors) {
        if (this.querySelectors[_query].classList.contains("error")) {
          var li = document.createElement("li");

          if (_query === "name") {
            li.innerHTML = "Por favor introduzca su nombre.";
          }

          if (_query === "surname") {
            li.innerHTML = "Por favor introduzca su apellido.";
          }

          if (_query === "phone") {
            li.innerHTML = "Por favor introduzca un n\xFAmero de tel\xE9fono de 9 d\xEDgitos.";
          }

          if (_query === "legal") {
            li.innerHTML = "Por favor acepte el Aviso Legal.";
          }

          if (_query === "email") {
            li.innerHTML = "Por favor introduzca un correo electr\xF3nico v\xE1lido.";
          }

          ul.appendChild(li);
          errorContainer.appendChild(ul);
          errorContainer.style.display = "block";
        } else {
          if (_query === "name") {
            this.name = this.querySelectors[_query].value;
          }

          if (_query === "surname") {
            this.surname = this.querySelectors[_query].value;
          }

          if (_query === "phone") {
            this.phone = this.querySelectors[_query].value;
          }

          if (_query === "legal") {
            this.legal = this.querySelectors[_query].value;
          }

          if (_query === "email") {
            this.email = this.querySelectors[_query].value;
          }
        }
      }

      if (this.name && this.surname && this.phone && this.legal && this.email) {
        this.comment = document.querySelector("#contact-form #comment").value;

        while (errorContainer.firstChild) {
          errorContainer.removeChild(errorContainer.firstChild);
        }

        var submitBtn = document.querySelector("#contact-form button");
        var spinner = document.createElement("div");
        submitBtn.disabled = true;
        spinner.className = "spinner";
        submitBtn.replaceChild(spinner, submitBtn.childNodes[0]);

        this._commit(); //Time out to simulate sending data


        setTimeout(function () {
          return submitBtn.innerHTML = "\xA1Gracias!";
        }, 2000);
      }
    } //The data from the class is saved as json and would be ready to be sent.

  }, {
    key: "_commit",
    value: function _commit() {
      var data = JSON.stringify({
        "name": this.name,
        "surname": this.surname,
        "phone": this.phone,
        "legal": this.legal,
        "email": this.email,
        "comment": this.comment
      });
      console.log(data);
    }
  }]);

  return FormControl;
}();

exports.default = FormControl;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _FormControl = _interopRequireDefault(require("./FormControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Initial function to set up DOM event listeners and form control
(function () {
  var arrowDown = document.querySelector(".circle");
  var anchor = document.querySelector("#scroll");
  var mobileMenu = document.querySelector(".main-nav");
  var mobileMenuIcon = document.querySelector(".mobile-menu");
  var mobileMenuItems = document.querySelectorAll(".main-nav a");
  var formSubmit = document.querySelector("#contact-form"); //Arrow down scroll effect

  arrowDown.addEventListener("click", function () {
    anchor.scrollIntoView();
  }); //Mobile menu events to show/hide

  mobileMenu.addEventListener("click", function (event) {
    mobileMenuIcon.classList.toggle("active");
    mobileMenuItems.forEach(function (item) {
      return item.classList.toggle("active");
    });
    mobileMenu.classList.toggle("active");
  }); //Setting up form control to create form events and handling submit

  var Form = new _FormControl.default();
  Form.initEvents();
  formSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
    Form.handleSubmit();
  });
})();
},{"./FormControl":"js/FormControl.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50388" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map