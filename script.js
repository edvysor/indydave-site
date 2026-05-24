(function () {
    'use strict';

    // Header scroll state
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    header.classList.toggle('scrolled', window.scrollY > 40);

    // Mobile nav elements
    var toggle = document.getElementById('mobileToggle');
    var nav = document.getElementById('mainNav');
    var backdrop = document.getElementById('navBackdrop');

    function closeNav() {
        if (!nav) return;
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (backdrop) backdrop.classList.remove('visible');
    }

    function openNav() {
        if (!nav) return;
        nav.classList.add('open');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        if (backdrop) backdrop.classList.add('visible');
    }

    // Toggle button
    if (toggle && nav) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (nav.classList.contains('open')) {
                closeNav();
            } else {
                openNav();
            }
        });
    }

    // Backdrop click to close
    if (backdrop) {
        backdrop.addEventListener('click', closeNav);
    }

    // Scroll to a target section
    function scrollToTarget(targetEl) {
        // Ensure body scroll is restored before attempting to scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        var hh = 80;
        try {
            hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
        } catch(e) {}

        var top = targetEl.getBoundingClientRect().top + window.pageYOffset - hh;
        window.scrollTo({ top: top, behavior: 'smooth' });
    }

    // Attach click handlers directly to each nav link inside the mobile nav
    if (nav) {
        var navLinks = nav.querySelectorAll('a[href^="#"]');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var href = this.getAttribute('href');
                var targetEl = document.querySelector(href);

                if (!targetEl) return;

                // Close nav immediately
                closeNav();

                // Wait for nav animation to complete, then scroll
                setTimeout(function () {
                    scrollToTarget(targetEl);
                }, 500);
            });
        });
    }

    // Handle anchor links outside the mobile nav (hero CTAs, footer links, etc.)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        // Skip if this link is inside the mobile nav (already handled above)
        if (nav && nav.contains(anchor)) return;

        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                scrollToTarget(target);
            }
        });
    });

    // Scroll reveal
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

    // Form placeholder
    var form = document.getElementById('inquiryForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your interest! Form handling will be connected soon. Please email travel@indydave.com directly.');
        });
    }
})();
