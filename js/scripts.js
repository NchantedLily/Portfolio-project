/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

const player = document.querySelector(' .player');
const video = player.querySelector('.viewer');
const progress = player.querySelector(' .progress');
const progressBar = player.querySelector(' .progress__filled');
const toggle = player.querySelector(' .toggle');
const skipButtons = player.querySelectorAll(' [data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
 
 function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon; 
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX /progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


video.addEventListener('click' , togglePlay);
video.addEventListener('play' , updateButton);
video.addEventListener('pause' , updateButton);
video.addEventListener('timeupdate' , handleProgress);

toggle.addEventListener('click' , togglePlay);
skipButtons.forEach(button => button.addEventListener('click' , skip));
ranges.forEach(range => range.addEventListener('change' , handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove' ,handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove' , (e) => mousedown && scrub(e));
progress.addEventListener('mousedown' , () => mousedown = true);
progress.addEventListener('mouseup' , () => mousedown = false);
