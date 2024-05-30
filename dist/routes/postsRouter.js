"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const postsController_1 = require("../controller/postsController");
const router = express_1.default.Router();
router.get("/", auth_1.protect, postsController_1.getAllPosts);
exports.default = router;
//# sourceMappingURL=postsRouter.js.map