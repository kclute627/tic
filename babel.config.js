module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@screens": "./src/screens",
                        "@components": "./src/components",
                        "@config": "./src/config",
                        "@context": "./src/context",
                        "@utils": "./src/utils",
                        "@assets": "./assets",
                    },
                },
            ],
        ],
    };
};
