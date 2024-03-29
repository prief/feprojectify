module.exports = {
    extends:'stylelint-config-standard',
    rules: {
        "color-no-invalid-hex": true,
        "color-hex-case": "lower",
        "unit-whitelist": ["em", "rem", "%", "s", "px"],
        "at-rule-no-unknown":[
            true,
            { ignoreAtRules:['mixin','extend','content','include']}
        ]
      }
}