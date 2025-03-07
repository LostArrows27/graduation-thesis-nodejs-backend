import React, { useState, useEffect } from "react";
import { Img } from "remotion";

interface CroppedImageProps {
  imageURL: string;
  coordinate: [number, number, number, number]; // [top, right, bottom, left]
  containerWidth?: number; // Optional fixed container width
  containerHeight?: number; // Optional fixed container height
  expansionFactor?: number; // How much to expand the crop area (default: 1.2 = 20% larger)
}

const CroppedImage: React.FC<CroppedImageProps> = ({
  imageURL,
  coordinate,
  containerWidth,
  containerHeight,
  expansionFactor = 1.2, // Default expansion of 20%
}) => {
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  
  // Get original image dimensions
  useEffect(() => {
    if (imageURL) {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = imageURL;
    }
  }, [imageURL]);

  if (!originalDimensions) {
    return <div>Loading...</div>;
  }

  // Original crop coordinates
  const [top, right, bottom, left] = coordinate;
  
  // Calculate original crop dimensions
  const originalCropWidth = right - left;
  const originalCropHeight = bottom - top;
  
  // Calculate the center point of the crop area
  const centerX = left + originalCropWidth / 2;
  const centerY = top + originalCropHeight / 2;
  
  // Calculate expanded dimensions
  const expandedWidth = originalCropWidth * expansionFactor;
  const expandedHeight = originalCropHeight * expansionFactor;
  
  // Calculate new coordinates based on expanded dimensions and center point
  const newLeft = Math.max(0, centerX - expandedWidth / 2);
  const newTop = Math.max(0, centerY - expandedHeight / 2);
  const newRight = Math.min(originalDimensions.width, centerX + expandedWidth / 2);
  const newBottom = Math.min(originalDimensions.height, centerY + expandedHeight / 2);
  
  // Re-adjust to maintain aspect ratio if needed
  const finalCropWidth = newRight - newLeft;
  const finalCropHeight = newBottom - newTop;
  
  // Use container dimensions or crop dimensions
  const displayWidth = containerWidth || finalCropWidth;
  const displayHeight = containerHeight || finalCropHeight;
  
  // Calculate scale factors
  const scaleX = displayWidth / finalCropWidth;
  const scaleY = displayHeight / finalCropHeight;
  
  const cropStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: `${displayWidth}px`,
    height: `${displayHeight}px`,
  };

  const imageStyle: React.CSSProperties = {
    position: "absolute",
    top: `-${newTop * scaleY}px`,
    left: `-${newLeft * scaleX}px`,
    width: `${originalDimensions.width * scaleX}px`,
    height: `${originalDimensions.height * scaleY}px`,
    maxWidth: "none",
  };

  return (
    <div className="rounded-lg" style={cropStyle}>
      <Img src={imageURL} style={imageStyle} alt="Cropped content" />
    </div>
  );
};

export default CroppedImage;