import User from "../../model/UserModel.js";


export async function deleteUser(req, res) {
    try {
        const result = await User.deleteOne({ email: req.body.email });

        if (result.deletedCount == 0) {
            res.json({
                message: "No user found with the provided email"
            });
        } else {
            res.json({
                message: "User deleted"
            });
        }
    } catch (e) {
        res.json({
            message: "Error deleting user",
        });
    }
}
