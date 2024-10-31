interface FormValues {
  name: string;
  avatar?: string;
}

interface ValidationErrors {
  name?: string;
  avatar?: string;
}

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 12;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validate = (values: FormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name validation
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < NAME_MIN_LENGTH) {
    errors.name = `Name must be at least ${NAME_MIN_LENGTH} characters`;
  } else if (values.name.trim().length > NAME_MAX_LENGTH) {
    errors.name = `Name must be less than ${NAME_MAX_LENGTH} characters`;
  } else if (!/^[a-zA-Z0-9\s]+$/.test(values.name)) {
    errors.name = "Name can only contain letters, numbers and spaces";
  }

  // Avatar validation
  if (values.avatar) {
    if (values.avatar.startsWith('data:')) {
      const [header] = values.avatar.split(',');
      const fileType = header.split(':')[1].split(';')[0];
      
      if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
        errors.avatar = "Please upload a valid image file (JPEG, PNG, or GIF)";
      }

      const base64 = values.avatar.split(',')[1];
      const fileSize = Math.ceil((base64.length * 3) / 4);
      
      if (fileSize > MAX_FILE_SIZE) {
        errors.avatar = "Image size must be less than 5MB";
      }
    }
  }

  return errors;
};

// Helper functions
export const isValidFileType = (file: File): boolean => {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
};

export const isValidFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};
