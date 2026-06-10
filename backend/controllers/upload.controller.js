import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "file not provided",
      });
    }

    const filebase64 = req.file.buffer.toString("base64");

    const dataUri = `data:${req.file.mimeType};base64,${filebase64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "ecommerce/products",

      transformation: [
        {
          width: 800,
          height: 800,
          crop: "limit",
        },
        {
          quality: "auto",
        },
        {
          fetch_format: "auto",
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded sucessfully",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.json({
        success: false,
        message: "Image could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
