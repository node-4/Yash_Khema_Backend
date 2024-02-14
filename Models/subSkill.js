const mongoose = require('mongoose');
const SkillSchema = mongoose.Schema({
        skill: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "skill"
        },
        name: {
                type: String
        },
        image: {
                type: String
        }
}, {
        timestamps: true
})

module.exports = mongoose.model("subSkill", SkillSchema)