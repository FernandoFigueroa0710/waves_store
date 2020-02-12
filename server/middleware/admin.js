export const admin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.send("You're not an admin");
    }
    next();
};
