export const formatFileSize = (bytes) => {
  if (bytes > 0) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  }
  return '';
};

export const toMB = (bytes) => {
  if (bytes > 0) {
    return bytes / Math.pow(1024, 2);
  }
  return '';
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
