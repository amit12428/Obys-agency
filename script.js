function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let t1 = gsap.timeline();

  t1.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  t1.to(".line h2", {
    animationName: "now",
    opacity: 1,
  });

  t1.from(".line1-part1", {
    opacity: 0,
    onStart: function () {
      let h5Timer = document.querySelector(".line1-part1 h5");

      let grow = 0;
      h5Timer.innerHTML = `<h5>${grow}</h5>`;

      let id = setInterval(function () {
        h5Timer.innerHTML = ++grow;
        //   console.log(grow);
        if (grow === 100) {
          clearInterval(id);
        }
      }, 35);
    },
  });

  t1.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 3,
    display: "none",
  });

  t1.from("#page1", {
    y: 1600,
    opacity: 0,
    delay: 0.2,
    duration: 0.6,
    //   ease: "Power4",
  });

  t1.from("#nav", {
    opacity: 0,
  });

  t1.from(".hero-line h1, #hero3 h2", {
    y: 150,
    stagger: 0.2,
  });

  t1.from(
    "#page2",
    {
      opacity: 0,
    },
    "-=1.2",
  );
}

function cursorAnimation() {
  document.addEventListener("mousemove", function (event) {
    gsap.to(".crsr", {
      x: event.x + "px",
      y: event.y + "px",
    });
  });

  //// Shery.mouseFollower();
  Shery.makeMagnet(".nav-part2 h4");

  let videoContainer = document.querySelector("#video-container");
  let videoCursor = document.querySelector(".video-cursor");
  let video = document.querySelector("#myVideo");

  videoContainer.addEventListener("mouseenter", () => {
    videoContainer.addEventListener("mousemove", function (e) {
      gsap.to(videoCursor, {
        x: e.x - 1200,
        y: e.y - 100,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(videoCursor, {
      x: "70%",
      y: "-10",
    });
  });

  let flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      videoCursor.innerHTML = `<i class="ri-pause-line"></i>`;
      video.play();
      gsap.to(videoCursor, {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      videoCursor.innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to(videoCursor, {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function h1SlidingAnimation() {
  gsap.to(".elem h1", {
    transform: "translateX(calc(-100% - 4px))",
    duration: 10,
    ease: "none",
    repeat: -1,
  });

  gsap.from(".line2", {
    transform: "translateX(calc(-100% - 4px))",
    duration: 15,
    ease: "none",
    repeat: -1,
  });
}

function sheryAnimation() {
  Shery.imageEffect(".imgs", {
    style: 5,
    debug: false,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: "1", range: [-9999999, 9999999] },
      aspect: { value: 0.7272749932567818 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.31, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.4, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 6.87, range: [0, 100] },
    },
    gooey: true,
  });
}

function videoCursor() {
  document.addEventListener("mousemove", function (even) {
    gsap.to("#flag", {
      x: even.x,
      y: even.y,
    });
  });

  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1,
    });
  });

  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0,
    });
  });
}

loadingAnimation();
cursorAnimation();
h1SlidingAnimation();
locomotiveAnimation();
sheryAnimation();
videoCursor();
