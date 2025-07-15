document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .fade-up, .zoom"
    );

    const scrollReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elementTop = el
                .getBoundingClientRect()
                .top;

            if (elementTop < triggerBottom) {
                el
                    .classList
                    .add("show");
            } else {
                el
                    .classList
                    .remove("show");
            }
        });
    };

    scrollReveal(); // on load
    window.addEventListener("scroll", scrollReveal);
});

// Slider opinii klientów
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    let currentIndex = 1;
    const slideWidth = slides[0].offsetWidth;

    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    const updateSlider = () => {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    };

    const handleTransitionEnd = () => {
        const allSlides = document.querySelectorAll(".testimonial-slide");
        if (allSlides[currentIndex].innerHTML.includes("– Michał")) {
            track.style.transition = "none";
            currentIndex = allSlides.length - 2;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }

        if (allSlides[currentIndex].innerHTML.includes("– Anna")) {
            track.style.transition = "none";
            currentIndex = 1;
            track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }
    };

    nextBtn.addEventListener("click", () => {
        const allSlides = document.querySelectorAll(".testimonial-slide");
        if (currentIndex < allSlides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    track.addEventListener("transitionend", handleTransitionEnd);

    // Auto slide
    setInterval(() => {
        currentIndex++;
        updateSlider();
    }, 7000);

    window.addEventListener("resize", () => {
        track.style.transition = "none";
        track.style.transform = `translateX(-${slides[0].offsetWidth * currentIndex}px)`;
    });
});