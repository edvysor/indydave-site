(function () {
    'use strict';
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    header.classList.toggle('scrolled', window.scrollY > 40);

    var toggle = document.getElementById('mobileToggle');
    var nav = document.getElementById('mainNav');
    var backdrop = document.getElementById('navBackdrop');

    function closeNav() {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (backdrop) backdrop.classList.remove('visible');
    }

    function openNav() {
        nav.classList.add('open');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        if (backdrop) backdrop.classList.add('visible');
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            if (nav.classList.contains('open')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close when tapping backdrop
        if (backdrop) {
            backdrop.addEventListener('click', closeNav);
        }

        // Close when tapping a nav link
        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - hh, behavior: 'smooth' });
            }
        });
    });

    var revealEls = document.querySelectorAll('.exp-card, .pillar, .path-card, .trust-item, .inquiry-form-wrap, .why-intro, .final-cta-inner');
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    function checkReveal() {
        var trigger = window.innerHeight * 0.88;
        revealEls.forEach(function (el) {
            if (el.getBoundingClientRect().top < trigger) el.classList.add('visible');
        });
    }
    window.addEventListener('scroll', checkReveal, { passive: true });
    setTimeout(checkReveal, 100);

    var form = document.getElementById('inquiryForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your interest! Form handling will be connected soon. Please email travel@indydave.com directly.');
        });
    }
})();
