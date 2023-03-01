const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Name should not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "superadmin", "vendor"], 
      default: "customer",
    
      /* superadmin can do everything, 
      admin can do everything except create new admins, 
      vendor can't do anything except create new products and update existing products, 
      customer can't do anything except create new orders*/
    },
    isActive: {
      type: Boolean,
      default: false,

    },
  },
  { timestamp: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


// Virtuals

// Virtual for user's orders (one-to-many)
UserSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Virtual for checking if user is admin
UserSchema.virtual("isAdmin").get(function() {
  return this.role === "admin" || this.role === "superadmin";
});


// Virtual for user's addresses (one-to-many)
UserSchema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});



const User = mongoose.model("User", UserSchema);

module.exports = User;
