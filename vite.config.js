"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        coverage: {
            provider: 'istanbul', // or 'v8',
            exclude: [
                './src/config',
                './src/server.ts',
                '**/routes.*',
                '**/index.*'
            ]
        },
    }
});
//# sourceMappingURL=vite.config.js.map