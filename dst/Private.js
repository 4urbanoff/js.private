"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _jsClone = require("js.clone");

var _jsClone2 = _interopRequireDefault(_jsClone);

var Private = (function () {
  function Private(props) {
    _classCallCheck(this, Private);

    this.props = props;
    this.owners = [];
    this.values = [];
    this.get = this.get.bind(this);
    this.get.destroy = this.destroy.bind(this);
  }

  _createClass(Private, [{
    key: "get",
    value: function get(context) {
      var key = this.owners.indexOf(context);
      if (key < 0) key = this.set(context);
      return this.values[key];
    }
  }, {
    key: "set",
    value: function set(context) {
      var clone = (0, _jsClone2["default"])(this.props);
      for (var attr in clone) {
        if (clone.hasOwnProperty(attr) && clone[attr] instanceof Function) clone[attr] = clone[attr].bind(context);
      }this.owners.push(context);
      return this.values.push(clone) - 1;
    }
  }, {
    key: "destroy",
    value: function destroy(context) {
      var key = this.owners.indexOf(context);
      return delete this.owners[key] && delete this.values[key];
    }
  }]);

  return Private;
})();

exports["default"] = function (props) {
  return new Private(props).get;
};

module.exports = exports["default"];