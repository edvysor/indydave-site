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

        if (backdrop) {
            backdrop.addEventListener('click', closeNav);
        }
    }

    // Handle all anchor links — including mobile nav links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // If mobile nav is open, close it first, then scroll after a short delay
                if (nav && nav.classList.contains('open')) {
                    closeNav();
                    setTimeout(function () {
                        var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
                        var top = target.getBoundingClientRect().top + window.scrollY - hh;
                        window.scrollTo({ top: top, behavior: 'smooth' });
                    }, 450);
                } else {
                    var hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
                    var top = target.getBoundingClientRect().top + window.scrollY - hh;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            }
        });
    });

    // Handle external links in mobile nav (Book Online)
    // These work naturally since they have full URLs, not hash links

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
