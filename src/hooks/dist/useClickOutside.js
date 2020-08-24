"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useClickOutside(ref, handler) {
    react_1.useEffect(function () {
        var listener = function (e) {
            // contains 方法用来查看 dom 元素的包含关系，以 HTMLElement 为参数，且返回布尔值
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler(e);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
exports["default"] = useClickOutside;
