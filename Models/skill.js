const mongoose = require('mongoose');
const SkillSchema = mongoose.Schema({
        skill: {
                type: String
        },
        image: {
                type: String
        }
}, {
        timestamps: true
})

module.exports = mongoose.model("skill", SkillSchema)