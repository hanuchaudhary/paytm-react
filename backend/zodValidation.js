const zod = require("zod");

const signupValidation = zod.object({
    email: zod.string().email("Invalid email address"),
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

const signinValidation = zod.object({
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long")
});

module.exports = {
    signupValidation,
    signinValidation
};
