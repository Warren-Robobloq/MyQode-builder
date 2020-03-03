webpackJsonp([1],{

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(14);

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = __webpack_require__(6);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(4);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(5);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(54);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(13);

var _appStateHoc = __webpack_require__(139);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _controls = __webpack_require__(150);

var _controls2 = _interopRequireDefault(_controls);

var _stage = __webpack_require__(216);

var _stage2 = _interopRequireDefault(_stage);

var _box = __webpack_require__(18);

var _box2 = _interopRequireDefault(_box);

var _gui = __webpack_require__(145);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(171);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

__webpack_require__(1354);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.vm };
};

var VMStage = (0, _reactRedux.connect)(mapStateToProps)(_stage2.default);
var VMControls = (0, _reactRedux.connect)(mapStateToProps)(_controls2.default);

var Player = function (_React$Component) {
    (0, _inherits3.default)(Player, _React$Component);

    function Player(props) {
        (0, _classCallCheck3.default)(this, Player);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Player.__proto__ || (0, _getPrototypeOf2.default)(Player)).call(this, props));

        _this.handleResize = _this.handleResize.bind(_this);
        _this.state = _this.getWindowSize();
        return _this;
    }

    (0, _createClass3.default)(Player, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('resize', this.handleResize);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize);
        }
    }, {
        key: 'getWindowSize',
        value: function getWindowSize() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            this.setState(this.getWindowSize());
        }
    }, {
        key: 'render',
        value: function render() {
            var height = this.state.height - 40;
            var width = height + height / 3;
            if (width > this.state.width) {
                width = this.state.width;
                height = width * .75;
            }
            return _react2.default.createElement(
                _gui2.default,
                (0, _extends3.default)({}, this.props, {
                    style: {
                        margin: '0 auto'
                    },
                    width: width
                }),
                _react2.default.createElement(
                    _box2.default,
                    { height: 40 },
                    _react2.default.createElement(VMControls, {
                        style: {
                            marginRight: 10,
                            height: 40
                        }
                    })
                ),
                _react2.default.createElement(VMStage, {
                    height: height,
                    width: width
                })
            );
        }
    }]);
    return Player;
}(_react2.default.Component);

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(Player));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 1354:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1355);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./player.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./player.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1355:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "body {\n    padding: 0;\n    margin: 0;\n}\n", ""]);

// exports


/***/ })

},[1353]);
//# sourceMappingURL=player.js.map