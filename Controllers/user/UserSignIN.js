import User from "../../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function loginUser(req, res) {
    try {
        // Find the user by email
        const users = await User.find({ email: req.body.email });

        if (users.length == 0) {
            return res.json({
                message: "User not found"
            });
        }

        const user = users[0];

        // Compare the password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (isPasswordCorrect) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    email: user.email,
                    First_Name: user.First_Name,
                    Last_Name: user.Last_Name,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profile_pic: user.profile_pic
                },
                process.env.SECRET
            );

            return res.json({
                message: "User logged in Successfully",
                token: token
            });
        } else {
            return res.json({
                message: "User not logged in"
            });
        }
    } catch (e) {
        return res.json({
            message: "Error occurred",
        });
    }
}
