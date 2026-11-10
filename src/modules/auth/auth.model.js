import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // Password reset ka hashed token yahan save hoga
    resetPasswordToken: {
        type: String,
        default: null,
    },
    // Token kab expire hoga, uska time yahan save hoga
    resetPasswordExpires: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

}, {
    timestamps: true
})

userSchema.index({ email: 1 }, { unique: true })
export const User = mongoose.models.user || mongoose.model("user", userSchema)