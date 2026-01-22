export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({ message: "Access Denied: You do not have permission" });
        }
        next();
    }
}