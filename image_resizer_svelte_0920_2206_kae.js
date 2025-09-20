// 代码生成时间: 2025-09-20 22:06:20
import { writable } from 'svelte/store';
import Resizer from './Resizer.svelte';

// 图片尺寸批量调整器组件的状态
const imageStore = writable([]);

// 功能函数：调整图片尺寸
async function resizeImages(files, desiredWidth, desiredHeight) {
  const resizedImages = [];
  for (let file of files) {
    try {
      // 读取文件
      const img = await createImageBitmap(file);
      // 创建一个画布并调整图片尺寸
      const canvas = document.createElement('canvas');
      canvas.width = desiredWidth;
      canvas.height = desiredHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
      // 将画布内容转换为Blob对象
      const resizedBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      });
      // 将Blob对象转换为File对象
      resizedImages.push(new File([resizedBlob], file.name, { type: resizedBlob.type }));
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  }
  // 更新状态，包含所有调整尺寸后的图片
  imageStore.update((images) => resizedImages);
}

// 主函数：处理文件选择和尺寸调整
function handleFiles(files, desiredWidth, desiredHeight) {
  if (!files.length) {
    console.warn('No files selected.');
    return;
  }
  resizeImages(files, desiredWidth, desiredHeight);
}

// Svelte组件
export default function App() {
  const images = imageStore;
  
  return {
    images,
    handleFiles,
  };
}

// Resizer.svelte组件文档
/*
 * Resizer.svelte: 图片尺寸批量调整器的UI界面
 * @param {number} desiredWidth - 目标宽度
 * @param {number} desiredHeight - 目标高度
 */

// Resizer.svelte组件代码（假设已实现）

// 使用方法：
// <Resizer desiredWidth={800} desiredHeight={600} onResize={handleFiles} />