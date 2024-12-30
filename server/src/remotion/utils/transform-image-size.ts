import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";

export const uploadAndResizeImages = async (imageArray: string[]) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET as string;

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  try {
    const uploadPromises = imageArray.map(async (imageUrl: string) => {
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("upload_preset", uploadPreset);

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
      );

      const publicId = uploadResponse.data.public_id;

      const image = cld.image(publicId);
      image.resize(fill().width(384).aspectRatio("10:7"));

      return image.toURL();
    });

    const resizedUrls = await Promise.all(uploadPromises);

    return resizedUrls;
  } catch (error) {
    console.error("Error uploading or resizing images:", error);
    throw error;
  }
};

export const reduceImageSize = (
  imageUrls: string[],
  maxWidth = 800,
  qualityPercentage = 80,
) => {
  const cloudName = "dkc9yplyv";

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const transformedUrls = imageUrls.map((url) => {
    const publicIdMatch = url.match(
      /https:\/\/res.cloudinary.com\/dkc9yplyv\/image\/upload\/v[0-9]+\/(.+)$/,
    );

    if (!publicIdMatch || !publicIdMatch[1]) {
      console.error(`Invalid Cloudinary URL: ${url}`);
      return null;
    }

    const publicId = publicIdMatch[1].split(".")[0];

    const image = cld.image(publicId);

    image
      .resize(scale().width(maxWidth))
      .delivery(quality(qualityPercentage))
      .delivery(format("auto"));

    return image.toURL();
  });

  return transformedUrls;
};

// const resizeURL = [
//   "https://res.cloudinary.com/dkc9yplyv/image/upload/v1735035353/IMG_1707991194971_1730885655265_dpztbg.jpg",
// ];

// const resizedImages = reduceImageSize(resizeURL);

// console.log(resizedImages);
