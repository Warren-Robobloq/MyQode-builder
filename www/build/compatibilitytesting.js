webpackJsonp([3],{

/***/ 1378:
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

var _reactDom = __webpack_require__(55);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(13);

var _appStateHoc = __webpack_require__(140);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _controls = __webpack_require__(151);

var _controls2 = _interopRequireDefault(_controls);

var _stage = __webpack_require__(217);

var _stage2 = _interopRequireDefault(_stage);

var _box = __webpack_require__(18);

var _box2 = _interopRequireDefault(_box);

var _gui = __webpack_require__(146);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(172);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.vm };
};

var VMStage = (0, _reactRedux.connect)(mapStateToProps)(_stage2.default);
var VMControls = (0, _reactRedux.connect)(mapStateToProps)(_controls2.default);

var DEFAULT_PROJECT_ID = '10015059';

var Player = function (_React$Component) {
    (0, _inherits3.default)(Player, _React$Component);

    function Player(props) {
        (0, _classCallCheck3.default)(this, Player);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Player.__proto__ || (0, _getPrototypeOf2.default)(Player)).call(this, props));

        _this.updateProject = _this.updateProject.bind(_this);

        _this.state = {
            projectId: window.location.hash.substring(1) || DEFAULT_PROJECT_ID
        };
        return _this;
    }

    (0, _createClass3.default)(Player, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('hashchange', this.updateProject);
            if (!window.location.hash.substring(1)) {
                window.location.hash = DEFAULT_PROJECT_ID;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.addEventListener('hashchange', this.updateProject);
        }
    }, {
        key: 'updateProject',
        value: function updateProject() {
            this.setState({ projectId: window.location.hash.substring(1) });
        }
    }, {
        key: 'render',
        value: function render() {
            var width = 480;
            var height = 360;
            return _react2.default.createElement(
                'div',
                { style: { display: 'flex' } },
                _react2.default.createElement(
                    _gui2.default,
                    (0, _extends3.default)({}, this.props, {
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
                ),
                _react2.default.createElement('iframe', {
                    allowFullScreen: true,
                    allowTransparency: true,
                    frameBorder: '0',
                    height: '402',
                    src: 'https://scratch.mit.edu/projects/embed/' + this.state.projectId + '/?autostart=true',
                    width: '485'
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

/***/ })

},[1378]);
//# sourceMappingURL=compatibilitytesting.js.map