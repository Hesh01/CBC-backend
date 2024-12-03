import User from "../../model/UserModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function newUser(req, res) {
    try {
        const newUserData = req.body;

        // If the new user type is admin, validate the requesting user
        if (newUserData.type === "admin") {
            if (!req.user) {
                res.json({
                    message: "Please login as administrator to create admin accounts"
                });
                return
            }

            // Verify if the logged-in user is an administrator
            if (req.user.type != "admin") {
                 res.json({
                    message: "You do not have permission to create admin accounts"
                });
                return
            }
        }

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email: newUserData.email });

        if (existingUser) {
            return res.json({
                message: "User already exists"
            });
        }

        // Hash the password before saving
        newUserData.password = await bcrypt.hash(newUserData.password, 10);

        // Create a new User instance
        const user = new User(newUserData);

        await user.save();

        res.json({
            message: "User Created Successfully"
        });
    } catch (e) {
        res.json({
            message: "User not created",
        });
    }
}






//email : "emma.jones@example.com"        "password": "EmmaSecure123!"        admin
//"email": "lucas.miller@example.com"        "password": "LucasSecure456!"     customer   