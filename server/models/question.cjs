const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    testTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    test_id: {
        type: String,
        required: true
    },
    questions_: [{
        question: {
            type: String,
            required: true
        }, options: {
            option_A: {
                type: String,
                required: true
            },
            option_B: {
                type: String,
                required: true
            },
            option_C: {
                type: String,
                required: true
            },
        },
        ans: {
            type: String,
            required: true
        },
    }]
});

const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;


// testTitle: "",
//         description: "",
//         duration: "",
//         test_id:"",
//         questions_: [{
//             question: "",
//             options: {
//                 option_A: "",
//                 option_B: "",
//                 option_C: "",
//             },
//             ans: ""
//         }]