"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const blogController_1 = require("../controller/blogController");
const router = express_1.default.Router();
router.get("/", auth_1.protect, blogController_1.getBlog);
exports.default = router;
//# sourceMappingURL=blogRouter.js.map