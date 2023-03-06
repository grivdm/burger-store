const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      enum: ["customer", "admin"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    // Reset password token
    // resetPasswordToken: String,
    // resetPasswordExpire: Date,

    // // Verify email token
    // verifyEmailToken: String,
    // verifyEmailExpire: Date,
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
UserSchema.virtual("isAdmin").get(function () {
  return this.role === "admin" ;
});

// Virtual for user's addresses (one-to-many)
UserSchema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Pre save hook to hash password
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (reqPassword, next) {
  try {
    const user = await this.constructor.findOne({ _id: this._id }).select('+password');
    const isMatch = await bcrypt.compare(reqPassword, user.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
