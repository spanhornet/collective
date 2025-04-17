"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = exports.artworks = exports.courses = exports.verifications = exports.accounts = exports.sessions = exports.users = exports.database = void 0;
// Environment Variables
const dotenv = __importStar(require("dotenv"));
// Drizzle ORM
const postgres_js_1 = require("drizzle-orm/postgres-js");
// PostgreSQL
const postgres_1 = __importDefault(require("postgres"));
// Schema
const schema_1 = require("./schema");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return schema_1.users; } });
Object.defineProperty(exports, "sessions", { enumerable: true, get: function () { return schema_1.sessions; } });
Object.defineProperty(exports, "accounts", { enumerable: true, get: function () { return schema_1.accounts; } });
Object.defineProperty(exports, "verifications", { enumerable: true, get: function () { return schema_1.verifications; } });
Object.defineProperty(exports, "courses", { enumerable: true, get: function () { return schema_1.courses; } });
Object.defineProperty(exports, "artworks", { enumerable: true, get: function () { return schema_1.artworks; } });
Object.defineProperty(exports, "images", { enumerable: true, get: function () { return schema_1.images; } });
dotenv.config();
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set in the environment variables");
}
// Create client
const client = (0, postgres_1.default)(connectionString, { prepare: false });
// Create database
exports.database = (0, postgres_js_1.drizzle)(client);
