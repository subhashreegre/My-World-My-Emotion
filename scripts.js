// Lightbox functionality for images
const images = document.querySelectorAll('.gallery-item img');
images.forEach(image => {
    image.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = <img src="${image.src}" alt="Full-size Art"><span class="close">&times;</span>;
        document.body.appendChild(lightbox);
        lightbox.querySelector('.close').addEventListener('click', () => {
            lightbox.remove();
        });
    });
});

// Smooth scroll for navigation
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img.lazy');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            entry.target.classList.remove('lazy');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

lazyImages.forEach(image => observer.observe(image));

// Scroll to Top button functionality
const scrollToTopButton = document.getElementById('scrollToTop');

window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

scrollToTopButton.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Image Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.querySelectorAll('.gallery-item img');
    slides.forEach(slide => slide.style.display = "none");

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 2000); // Change image every 2 seconds
}