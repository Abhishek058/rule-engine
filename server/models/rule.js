const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    rule_name: { type: String, required: true },
    rule_ast: { type: Object, required: true }
});

module.exports = mongoose.model('Rule', RuleSchema);
