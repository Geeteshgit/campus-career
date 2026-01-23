import { env } from "../config/env.js";
import { User } from "../models/user.model.js";

export const createSuperAdminIfNotExists = async () => {
  const existingAdmin = await User.findOne({ role: "super_admin" });

  if (existingAdmin) {
    console.log("Super Admin already exists");
    return;
  }

  const newSuperAdmin = new User({
    name: "Super Admin",
    email: env.SUPER_ADMIN_EMAIL,
    password: env.SUPER_ADMIN_PASSWORD,
    role: "super_admin",
    phone: "0000000000",
  })

  await newSuperAdmin.save();

  console.log("Super Admin created successfully");
};
