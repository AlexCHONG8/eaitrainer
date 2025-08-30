// 图片模态框功能
function openImageModal(src, alt) {
  // 创建图片模态框HTML
  let modal = document.getElementById("imageModal");
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 95vw; max-height: 95vh; margin: 2.5vh auto; padding: 0; background: transparent; box-shadow: none;">
        <span class="close" onclick="closeImageModal()" style="position: absolute; top: 10px; right: 25px; color: white; font-size: 35px; font-weight: bold; z-index: 1001; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); cursor: pointer;">&times;</span>
        <img id="modalImage" alt="" style="width: auto; height: auto; max-width: 95vw; max-height: 95vh; object-fit: contain; display: block; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div id="modalCaption" style="text-align: center; color: white; padding: 15px; font-size: 16px; background: rgba(0,0,0,0.7); margin-top: 10px; border-radius: 5px;"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("modalCaption");
  
  modal.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = alt;
  
  // 点击图片外部关闭模态框
  modal.onclick = function(event) {
    if (event.target === modal) {
      closeImageModal();
    }
  };
  
  // 按ESC键关闭模态框
  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
      closeImageModal();
    }
  });
}

function closeImageModal() {
  document.getElementById("imageModal").style.display = "none";
}

// 为所有可点击图片添加事件监听器
document.addEventListener("DOMContentLoaded", function() {
  const clickableImages = document.querySelectorAll('.device-image[onclick]');
  clickableImages.forEach(function(img) {
    img.addEventListener('click', function() {
      openImageModal(this.src, this.alt);
    });
  });
});

// 视频模态框功能
function openVideoModal(videoSrc, title) {
    // 创建视频模态框HTML
    let videoModal = document.getElementById('videoModal');
    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'videoModal';
        videoModal.className = 'modal';
        videoModal.innerHTML = `
            <div class="modal-content" style="max-width: 95vw; max-height: 95vh; margin: 2.5vh auto; padding: 0; background: black; border-radius: 8px;">
                <span class="close" onclick="closeVideoModal()" style="position: absolute; top: 10px; right: 25px; color: white; font-size: 35px; font-weight: bold; z-index: 1001; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); cursor: pointer;">&times;</span>
                <video id="modalVideo" controls style="width: 100%; height: auto; max-width: 95vw; max-height: 85vh; object-fit: contain; border-radius: 8px;">
                    <source src="" type="video/mp4">
                    您的浏览器不支持视频播放。
                </video>
                <div class="modal-caption" id="videoCaption" style="text-align: center; color: white; padding: 15px; font-size: 16px; background: rgba(0,0,0,0.7); margin-top: 10px; border-radius: 5px;"></div>
            </div>
        `;
        document.body.appendChild(videoModal);
    }
    
    // 获取视频元素
    const video = document.getElementById('modalVideo');
    
    // 重置视频状态
    video.pause();
    video.currentTime = 0;
    
    // 设置视频源和标题
    video.src = videoSrc;
    document.getElementById('videoCaption').textContent = title;
    
    // 添加视频加载错误处理
    video.onerror = function() {
        console.error('视频加载失败:', videoSrc);
        document.getElementById('videoCaption').innerHTML = `
            <div style="color: #ff6b6b; font-size: 16px;">
                ⚠️ 视频加载失败<br>
                <span style="font-size: 14px; opacity: 0.8;">请检查文件路径: ${videoSrc}</span>
            </div>
        `;
        
        // 隐藏视频元素，显示错误信息
        video.style.display = 'none';
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'text-align: center; padding: 60px 20px; color: #ff6b6b; font-size: 18px; background: rgba(0,0,0,0.8); border-radius: 8px; margin: 20px;';
        errorDiv.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">📹</div>
            <div>视频文件无法加载</div>
            <div style="font-size: 14px; margin-top: 15px; opacity: 0.7; word-break: break-all;">${videoSrc}</div>
        `;
        video.parentNode.insertBefore(errorDiv, video.nextSibling);
    };
    
    // 添加视频加载成功处理
    video.onloadeddata = function() {
        video.style.display = 'block';
        // 移除可能存在的错误提示
        const errorDiv = video.parentNode.querySelector('div[style*="color: #ff6b6b"]');
        if (errorDiv) {
            errorDiv.remove();
        }
    };
    
    // 显示模态框
    videoModal.style.display = 'block';
    
    // 尝试自动播放（带错误处理）
    setTimeout(() => {
        video.play().catch(e => {
            console.log('自动播放失败（浏览器策略限制）:', e);
            // 显示播放提示
            const playHint = document.createElement('div');
            playHint.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: white; padding: 15px 25px; border-radius: 8px; font-size: 16px; z-index: 1002; pointer-events: none;';
            playHint.innerHTML = '▶️ 点击播放按钮开始观看';
            video.parentNode.style.position = 'relative';
            video.parentNode.appendChild(playHint);
            
            // 3秒后自动隐藏提示
            setTimeout(() => {
                if (playHint.parentNode) {
                    playHint.remove();
                }
            }, 3000);
        });
    }, 100);
    
    // 点击模态框外部关闭
    videoModal.onclick = function(event) {
        if (event.target === videoModal) {
            closeVideoModal();
        }
    };
    
    // ESC键关闭视频模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeVideoModal();
        }
    });
}

// 关闭视频模态框
function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    if (videoModal) {
        videoModal.style.display = 'none';
        if (video) {
            video.pause();
            video.currentTime = 0;
            video.src = ''; // 清空视频源以释放资源
        }
        
        // 清理错误提示和播放提示
        const errorDivs = videoModal.querySelectorAll('div[style*="color: #ff6b6b"], div[style*="pointer-events: none"]');
        errorDivs.forEach(div => div.remove());
        
        // 重置视频显示状态
        if (video) {
            video.style.display = 'block';
        }
    }
}