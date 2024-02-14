const mongoose = require('mongoose');
const SkillSchema = mongoose.Schema({
        installerId: {
                type: mongoose.Schema.ObjectId,
                ref: "user"
        },
        skillId: {
                type: mongoose.Schema.ObjectId,
                ref: "skill"
        },
        subSkill: [{
                type: mongoose.Schema.ObjectId,
                ref: "subSkill"
        }]
}, {
        timestamps: true
})

module.exports = mongoose.model("instellerSkill", SkillSchema)