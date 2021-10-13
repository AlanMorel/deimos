module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:security/recommended"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-member-accessibility": ["error"],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        semi: 2,
        quotes: 2,
        "no-trailing-spaces": "error",
        "no-case-declarations": "off",
        "eol-last": "error"
    },
    plugins: ["@typescript-eslint", "security"]
};
