module.exports = {
    root: true,
    env: {
        node: true,
        es2020: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:security/recommended"
    ],
    plugins: ["@typescript-eslint", "security", "prettier"],
    parser: "@typescript-eslint/parser",
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-undef": 1,
        "no-prototype-builtins": 1,
        "prettier/prettier": ["error"],
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
    }
};
