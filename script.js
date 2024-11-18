document.addEventListener('DOMContentLoaded', function () {
  // Initialize Cards with Video and Play Button
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Add the video
    const video = document.createElement('video');
    video.src = './radio photos/Short Video.mp4';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.objectFit = 'cover';
    video.style.zIndex = '1';
    video.style.display = 'none'; // initially hide the video
    card.appendChild(video);

    let hoverTimeout;

    // Play the video on hover with a delay
    card.addEventListener('mouseenter', () => {
      hoverTimeout = setTimeout(() => {
        video.style.display = 'block'; // Show the video
        video.play(); // Play the video
      }, 2000); // 2-second delay
    });

    // Pause the video, hide it, and clear the delay when hover ends
    card.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout); // Cancel the timeout if it hasn't executed yet
      video.style.display = 'none'; // Hide the video
      video.pause(); // Pause the video
      video.currentTime = 0; // Reset to the beginning
    });

    // Add the play button
    const playButton = document.createElement('div');
    playButton.style.position = 'absolute';
    playButton.style.bottom = '10px';
    playButton.style.right = '10px';
    playButton.style.width = '50px';
    playButton.style.height = '50px';
    playButton.style.borderRadius = '50%';
    playButton.style.background = 'linear-gradient(to bottom, #005596, #ce1127)';
    playButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    playButton.style.display = 'flex';
    playButton.style.justifyContent = 'center';
    playButton.style.alignItems = 'center';
    playButton.style.cursor = 'pointer';
    playButton.style.zIndex = '2';

    // Add the play icon
    const playIcon = document.createElement('i');
    playIcon.style.width = '0';
    playIcon.style.height = '0';
    playIcon.style.borderLeft = '15px solid white';
    playIcon.style.borderTop = '10px solid transparent';
    playIcon.style.borderBottom = '10px solid transparent';
    playButton.appendChild(playIcon);

    // Add redirection functionality
    playButton.addEventListener('click', () => {
      window.location.href = 'https://www.youtube.com/watch?v=csquC7HfazE'; // Replace with the desired URL
    });

    card.appendChild(playButton);
  });

  // Initialize Swiper for Tranding Slider
  var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  // Initialize Slides for Tranding Slider
  function initializeSlides(sectionId, slideData) {
    const section = document.querySelector(`#${sectionId}`);
    const slides = section.querySelectorAll('.swiper-slide.tranding-slide');

    slides.forEach((slide, index) => {
      const data = slideData[index % slideData.length]; // Cycle through slideData if slides > data items

      const textElement = document.createElement('div');
      textElement.classList.add('tranding-slide-text');
      textElement.style.zIndex = '6';
      textElement.innerHTML = `
        <b>${data.title}</b> - <b>${data.location} – ${data.date}</b><br><br>
        ${data.description}<br><br>
        <b>${data.date} • ENGLISH • SOUTH AFRICA • RECORDINGS</b>
      `;
      slide.appendChild(textElement);

      const playButton = slide.querySelector('.play-button');
      const playButtonContainer = slide.querySelector('.play-button-container');

      playButton.addEventListener('click', () => {
        playButtonContainer.style.display = 'none';
        textElement.style.display = 'none';

        const audio = new Audio(data.audioSrc);
        audio.load();

        const rotatingImage = document.createElement('img');
        rotatingImage.src = data.imageSrc;
        rotatingImage.classList.add('rotating-image');

        const progressBar = document.createElement('input');
        progressBar.type = 'range';
        progressBar.classList.add('progress-bar');
        progressBar.min = 0;
        progressBar.max = 100;
        progressBar.value = 0;

        const currentTimeDisplay = document.createElement('span');
        currentTimeDisplay.classList.add('current-time');
        currentTimeDisplay.textContent = "0:00";

        const durationDisplay = document.createElement('span');
        durationDisplay.classList.add('duration');
        durationDisplay.textContent = "0:00";

        const timeContainer = document.createElement('div');
        timeContainer.classList.add('time-container');
        timeContainer.appendChild(currentTimeDisplay);
        timeContainer.appendChild(durationDisplay);

        const playPauseButton = document.createElement('ion-icon');
        playPauseButton.name = 'pause-outline';
        playPauseButton.classList.add('play-pause-button');

        const skipButton = document.createElement('ion-icon');
        skipButton.name = 'play-forward-outline';
        skipButton.classList.add('skip-button');

        const rewindButton = document.createElement('ion-icon');
        rewindButton.name = 'play-back-outline';
        rewindButton.classList.add('rewind-button');

        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('controls-container');
        
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');
        buttonWrapper.appendChild(rewindButton);
        buttonWrapper.appendChild(playPauseButton);
        buttonWrapper.appendChild(skipButton);
        
        controlsContainer.appendChild(timeContainer);
        controlsContainer.appendChild(progressBar);
        controlsContainer.appendChild(buttonWrapper);

        slide.appendChild(rotatingImage);
        slide.appendChild(controlsContainer);

        audio.play();
        playPauseButton.name = 'pause-outline';
        rotatingImage.style.animationPlayState = 'running';

        audio.addEventListener('loadedmetadata', () => {
          const durationMinutes = Math.floor(audio.duration / 60);
          const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
          durationDisplay.textContent = `${durationMinutes}:${durationSeconds}`;
        });

        audio.addEventListener('timeupdate', () => {
          const currentMinutes = Math.floor(audio.currentTime / 60);
          const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
          currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds}`;
          progressBar.value = (audio.currentTime / audio.duration) * 100;
        });

        progressBar.addEventListener('input', (event) => {
          const newTime = (event.target.value / 100) * audio.duration;
          audio.currentTime = newTime;
        });

        playPauseButton.addEventListener('click', () => {
          if (audio.paused) {
            audio.play();
            playPauseButton.name = 'pause-outline';
            rotatingImage.style.animationPlayState = 'running';
          } else {
            audio.pause();
            playPauseButton.name = 'play-outline';
            rotatingImage.style.animationPlayState = 'paused';
          }
        });

        rewindButton.addEventListener('click', () => {
          audio.currentTime = Math.max(0, audio.currentTime - 10);
        });

        skipButton.addEventListener('click', () => {
          audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        });

        const cancelButton = document.createElement('ion-icon');
        cancelButton.name = "close-outline";
        cancelButton.classList.add('cancel-button');
        cancelButton.style.position = "absolute";
        cancelButton.style.top = "10px";
        cancelButton.style.left = "10px";
        slide.appendChild(cancelButton);

        cancelButton.addEventListener('click', () => {
          playButtonContainer.style.display = 'block';
          textElement.style.display = 'block';
          rotatingImage.remove();
          controlsContainer.remove();
          cancelButton.remove();
          audio.pause();
          audio.currentTime = 0;
        });
      });
    });
  }

  // Slide data for Guest section
  const guestSlideData = [
    {
      title: "Dr. Linda Mayer’s guidance for carrer success",
      description: "On the Ground Breaker Show this past Wednesday, October 2nd, 2024, we took a deep dive into diverse fields of study with Plug-A-Graduate, hosted by Polelo N Madisa. Listeners joined us from 7 pm to 9 pm, gaining valuable insights from special guest Dr. Linda Mayer, Managing Director at IIE Rosebank College. It was an enlightening evening packed with inspiration and expert advice for graduates and aspiring professionals alike!",
      date: "2 October 2024",
      location: "Pretoria, Soshanguve",
      audioSrc: './radio podcast/Dr Linda Meyer.mp3',
      imageSrc: './radio photos/fm logo.png',
    },
        // Add data for other slides
        {
          title: "Mrs Nokuthula Makhanya",
          description: "Last night on the Ground Breaker Show, PLUG-A-GRADUATE with Polelo N Madisa featured a captivating segment from 19:00 to 21:00. The spotlight was on Nokuthula Makhanya, Managing Director at NPM Consulting (PTY) LTD, as she shared invaluable insights on how to break into the job market. With a deep commitment to professional integrity, Nokuthula inspired listeners with her journey of resilience, adaptability, and a passion for workplaces.",
          date: "5 October 2024",
          location: "Pretoria, Soshanguve",
          audioSrc: './radio podcast/Nokuthula Makhanya.mp3',
          imageSrc: './radio photos/fm logo.png',
        },

            // Add data for other slides
    {
      title: "Mr Oupa Segalwe",
      description: "Earlier, you caught PLUG-A-GRADUATE with Polelo N Madisa on the Ground Breaker, featuring his guest, Oupa Segalwe, the Head of Communication and Stakeholder Relations at the South African Weather Service. Mr. Segalwe shared insights from his new book, Lucas Mangope: A Life – Unpacking the Biography and the Journey to Publication. An interesting fact: he previously worked for TUT FM between 2003 and 2004.",
      date: "12 October 2024",
      location: "Pretoria, Soshanguve",
      audioSrc: './radio podcast/Oupa Segalwe.mp3',
      imageSrc: './radio photos/fm logo.png',
    },

    {
      title: "Mr Obakeng Aubrey Moeketsi",
      description: "Earlier this month, listeners tuned in for a special live broadcast of the popular weekly show, Plug-A-Graduate, hosted by Obakeng Aubrey Moeketsi, straight from the Tshwane University of Technology Pretoria Campus on Friday, June 7th. On TUT FM 96.2, we brought you a dynamic event with industry experts and seasoned entrepreneurs, sharing practical skills and insights on how to achieve greatness.",
      date: "03 November 2024",
      location: "Pretoria, Soshanguve",
      audioSrc: './radio podcast/Obakeng Aubrey Moeketsi.m4a',
      imageSrc: './radio photos/fm logo.png',
    },

    {
      title: "Mrs Reabetswe Dire",
      description: "Ealier on today’s insightful episode of Plug-A-Graduate on the Ground Breaker Show, host Obakeng Mooketsi, also known as OBK, had the pleasure of welcoming Reabetswe Dire, the CEO of Edenvinne. They dove deep into how to transform your academic knowledge into a source of income. Whether you’re a fresh graduate or looking to leverage your qualifications for entrepreneurial success, this conversation was packed with actionable tips to guide you on your career journey.",
      date: "19 November 2024",
      location: "Pretoria, Soshanguve",
      audioSrc: './radio podcast/Rearabetswe Dire.mp3',
      imageSrc: './radio photos/fm logo.png',
    },

    {
      title: "Mr Shalate Davhana",
      description: "The show discussed how it became a game-changer for recent graduates, seasoned job seekers, and aspiring entrepreneurs navigating the competitive job market. In our pilot episode, we welcomed esteemed guests: Mrs. Kedibone Mahapa, TUT FM 96.2 Station Manager; Dr. Roelien Brink, Director of Cooperative Education; and Shalate, Manager of Alumni Relations and Fundraising.",
      date: "15 November 2024",
      location: "Location for Slide 2",
      audioSrc: './radio podcast/Shalate Davhana.mp3',
      imageSrc: './radio photos/fm logo.png',
    },
  ];

  // Slide data for Alumni section
  const alumniSlideData = [
    {
      title: "Alumni Inspiration Talk",
      description: "Listen to inspiring stories from our alumni who have made significant contributions...",
      date: "15 September 2024",
      location: "TUT Campus Auditorium",
      audioSrc: './radio podcast/alumni-audio.mp3',
      imageSrc: './radio photos/fm logo.png',
    },
        // Add data for other slides
        {
          title: "Slide 2 Title",
          description: "Description for Slide 2...",
          date: "Date for Slide 2",
          location: "Location for Slide 2",
          audioSrc: './radio podcast/slide2-audio.mp3',
          imageSrc: './radio photos/fm logo.png',
        },
  ];

  initializeSlides("tranding", guestSlideData);   // Guest section
  initializeSlides("alumni", alumniSlideData);    // Alumni section

  
});

