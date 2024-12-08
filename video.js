// let video = document.querySelector('video')


// video.addEventListener('mouseenter', () => {
//     video.play();
//   });
// video.addEventListener('mouseleave', () => {
//     video.pause();
//   });

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const progressBar = wrapper.querySelector('.progress-bar');
    const videoId = wrapper.getAttribute('data-video-id');
    
    // Load last watched time
    const lastTime = localStorage.getItem(videoId) || 0;
    video.currentTime = lastTime;
    progressBar.style.width = (lastTime / video.duration) * 100 + '%';

    // Play video on hover
    wrapper.addEventListener('mouseenter', () => {
      video.play();
    });

    // Pause video on mouse leave
    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      localStorage.setItem(videoId, video.currentTime); // Save the last watched time
      progressBar.style.width = (video.currentTime / video.duration) * 100 + '%';
    });

    // Update progress bar during playback
    video.addEventListener('timeupdate', () => {
      progressBar.style.width = (video.currentTime / video.duration) * 100 + '%';
    });

    // Pause video and save time when clicking away
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(videoId, video.currentTime);
    });
  });