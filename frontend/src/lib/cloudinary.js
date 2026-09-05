// Cloudinary configuration for XATRA WORKS
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
};

/**
 * Generate a Cloudinary image URL with transformations
 * @param {string} publicId - The public ID of the image
 * @param {object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export function getCloudinaryUrl(publicId, options = {}) {
  const {
    width = 800,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
  } = options;

  const transforms = [`q_${quality}`, `f_${format}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);

  const transformStr = transforms.join(',');
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformStr}/${publicId}`;
}

/**
 * Upload a file to Cloudinary via unsigned upload
 * @param {File} file - The file to upload
 * @param {string} folder - Target folder in Cloudinary
 * @returns {Promise<object>} Upload response
 */
export async function uploadToCloudinary(file, folder = 'xatra-works') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}
