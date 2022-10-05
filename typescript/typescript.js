"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var asConstData = ["string/ne", 1, 2, 3];
var normalArray = [{ key: 1, title: "Title 1" }, { key: 2 }, { key: 3 }];
var StorageKey = {
    "@token": "abc",
    "@user": "123",
    "@isLoggedIn": "ttttt"
};
var config = {
    fontSize: [12, 13, 14]
};
var object = Object.keys(config).reduce(function (acc, key) {
    var attributeArray = (config[key] || []).reduce(function (att, cur) {
        var _a;
        return (__assign(__assign({}, att), (_a = {}, _a["".concat(cur)] = cur, _a)));
    });
    acc[key] = attributeArray;
    return acc;
}, {});
//global.config.ts
var fontSizeMap = {
    fs12: 12,
    fs14: 14,
    titleSize: 16,
    fs18: 18
};
var fontWeightMap = {
    fw500: "500",
    fw600: "600"
};
var globalStyles = Object.keys(fontSizeMap).reduce(function (acc, fs) {
    Object.keys(fontWeightMap).map(function (fw) {
        var styleName = "".concat(fs).concat(fw);
        acc[styleName] = {
            fontSize: fontSizeMap[fs],
            fontWeight: fontWeightMap[fw]
        };
    }, {});
    return acc;
}, {});
// const Title = () => (
//   <Text style={[globalStyles.titleSizefw600, { backgroundColor: "red" }]}>
//     Title
//   </Text>
// );
console.log(globalStyles.titleSizefw600);
