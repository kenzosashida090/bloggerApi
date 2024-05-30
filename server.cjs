"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var google = require("googleapis");
var OAuth2 = google.auth.OAuth2;
var app = express();
var PORT = process.env.PORT || 3000;
// Configura el cliente OAuth2
var oauth2Client = new OAuth2('TU_CLIENT_ID', 'TU_SECRETO_DE_CLIENTE', 'http://localhost:3000/oauth2callback');
// Permisos que solicitas
var SCOPES = ['https://www.googleapis.com/auth/blogger'];
// Ruta para iniciar el proceso de autenticación
app.get('/auth', function (req, res) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    res.redirect(authUrl);
});
// Ruta para manejar la redirección de OAuth2
app.get('/oauth2callback', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, tokens, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, oauth2Client.getToken(code)];
            case 2:
                tokens = (_a.sent()).tokens;
                oauth2Client.setCredentials(tokens);
                res.redirect('/blogger');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error retrieving access token', error_1);
                res.send('Error retrieving access token');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Ruta para interactuar con la API de Blogger
app.get('/blogger', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var blogger, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                blogger = google.blogger({ version: 'v3', auth: oauth2Client });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, blogger.blogs.get({ blogId: 'TU_ID_DE_BLOG' })];
            case 2:
                response = _a.sent();
                if (response)
                    res.status(202).json(response.data);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error fetching blog', error_2);
                res.send('Error fetching blog');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});