module.exports = {
    "testRegex": "(/__(tests|integration)__/.*|(\\.|/)(test|it))\\.(jsx?|tsx?)$",
    "transform": {"^.+\\.tsx?$": "ts-jest"},
    "testPathIgnorePatterns": ["/dist/", "/node_modules/"],
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
    "testEnvironment": 'node',
    "collectCoverage": true
}
