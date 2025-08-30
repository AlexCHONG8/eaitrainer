// 主要JavaScript功能
document.addEventListener("DOMContentLoaded", function() {
  console.log("肾上腺素自动注射器训练器使用说明已加载");
  
  // 初始化所有功能
  initializeApp();
});

function initializeApp() {
  // 检查必要的DOM元素是否存在
  checkRequiredElements();
  
  // 设置图片懒加载（如果需要）
  setupLazyLoading();
  
  // 设置平滑滚动
  setupSmoothScrolling();
}

function checkRequiredElements() {
  const requiredElements = [
    'imageModal',
    'modalImage', 
    'modalCaption'
  ];
  
  requiredElements.forEach(function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`警告: 未找到必需的元素 #${elementId}`);
    }
  });
}

function setupLazyLoading() {
  // 图片懒加载功能（可选）
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
}

function setupSmoothScrolling() {
  // 为锚点链接添加平滑滚动
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 工具函数
function updateImagePaths() {
  // 更新图片路径以适应新的文件结构
  const images = document.querySelectorAll('img');
  
  images.forEach(function(img) {
    let src = img.src;
    
    // 更新EAI photo路径
    if (src.includes('EAI photo/')) {
      img.src = src.replace('EAI photo/', 'images/eai/EAI photo/');
    }
    
    // 更新Trainer photo路径
    if (src.includes('Trainer photo/')) {
      img.src = src.replace('Trainer photo/', 'images/trainer/Trainer photo/');
    }
    
    // 更新FDA EMA IFU路径
    if (src.includes('FDA EMA IFU/')) {
      img.src = src.replace('FDA EMA IFU/', 'images/fda/FDA EMA IFU/');
    }
  });
}

// 在页面加载完成后更新图片路径
document.addEventListener("DOMContentLoaded", function() {
  updateImagePaths();
});