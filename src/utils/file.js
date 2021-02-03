export const formatFileSize = (bytes) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export const toMB = (bytes) => {
  return bytes / Math.pow(1024, 2);
};
