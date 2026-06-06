import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .tolwercase()
      .trim()
      .replace(/['"']/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  next();
});

export const Category = new mongoose.model("Category", categorySchema);
