"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config({ path: "./.env" });
const PORT = process.env.PORT || 3000;
//SERVER UP AND RUNNING ON PORT 3000
const server = app_1.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on("uncaughtException", (error) => {
    console.log("UNHANDLED REJECTION! SHUTTING DOWN...");
    console.log(error);
    server.close(() => {
        process.exit((1));
    });
});
//# sourceMappingURL=server.js.map