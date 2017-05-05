module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb-base',
    plugins: [
        'import'
    ],
    rules: {
        indent: ['error', 4],
        'no-console': ['off'],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "comma-dangle": ["error", "never"]
    }
};