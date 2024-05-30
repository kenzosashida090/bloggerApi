"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const googleapis_1 = require("googleapis");
const app_1 = require("../app");
function protect(req, res, next) {
    const blogger = googleapis_1.google.blogger({ version: 'v3', auth: app_1.oauth2Client });
    req.blogger = blogger;
    next();
}
exports.protect = protect;
//# sourceMappingURL=auth.js.map