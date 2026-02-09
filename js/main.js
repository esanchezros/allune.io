/* ============================================
   Allune.io — Main JavaScript
   ============================================ */

(function () {
	'use strict';

	// --- Navbar scroll effect ---
	const navbar = document.getElementById('navbar');

	function handleNavbarScroll() {
		if (window.scrollY > 40) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	}

	window.addEventListener('scroll', handleNavbarScroll, { passive: true });

	// --- Mobile menu toggle ---
	const mobileToggle = document.getElementById('mobile-toggle');
	const navLinks = document.getElementById('nav-links');

	mobileToggle.addEventListener('click', function () {
		mobileToggle.classList.toggle('active');
		navLinks.classList.toggle('open');
	});

	// Close mobile menu when a link is clicked
	navLinks.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', function () {
			mobileToggle.classList.remove('active');
			navLinks.classList.remove('open');
		});
	});

	// --- Dark / Light theme toggle ---
	const themeToggle = document.getElementById('theme-toggle');
	const savedTheme = localStorage.getItem('allune-theme');

	if (savedTheme) {
		document.documentElement.setAttribute('data-theme', savedTheme);
	} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.documentElement.setAttribute('data-theme', 'dark');
	}

	themeToggle.addEventListener('click', function () {
		const current = document.documentElement.getAttribute('data-theme');
		const next = current === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('allune-theme', next);
	});

	// --- Scroll-triggered animations ---
	var animatedElements = document.querySelectorAll('.animate-on-scroll');

	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -40px 0px',
			}
		);

		animatedElements.forEach(function (el) {
			observer.observe(el);
		});
	} else {
		// Fallback: show everything immediately
		animatedElements.forEach(function (el) {
			el.classList.add('visible');
		});
	}

	// --- Smooth scroll for anchor links (fallback for browsers without native support) ---
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			var targetId = this.getAttribute('href');
			if (targetId === '#') return;

			var target = document.querySelector(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
})();
