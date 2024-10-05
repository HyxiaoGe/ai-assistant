/**
 * 将 ISO 格式的日期字符串转换为易读的中文格式
 * @param dateString ISO 格式的日期字符串 (e.g., "2024-09-18T19:38:13")
 * @returns 格式化后的日期字符串 (e.g., "2024年9月18日 19:38")
 */
export const formatDateToChinese = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * 将 ISO 格式的日期字符串转换为相对时间（例如：3小时前，2天前）
 * @param dateString ISO 格式的日期字符串
 * @returns 相对时间字符串
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return '刚刚';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}天前`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}个月前`;
  return `${Math.floor(diffInSeconds / 31536000)}年前`;
};
