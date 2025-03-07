interface ImageDimensions {
  width: number;
  height: number;
}

export const getDimensionsFromStorage = (
  imageURL: string
): ImageDimensions | null => {
  try {
    const stored = localStorage.getItem(`img_dimensions_${imageURL}`);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn("Failed to access localStorage:", e);
    return null;
  }
};

export const saveDimensionsToStorage = (
  imageURL: string,
  dimensions: ImageDimensions
): void => {
  try {
    localStorage.setItem(
      `img_dimensions_${imageURL}`,
      JSON.stringify(dimensions)
    );
  } catch (e) {
    console.warn("Failed to save to localStorage:", e);
  }
};
