// c:\Users\frhan\OneDrive\Documents\systeam-apps\frontend\plugins\scroll-animations.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                const delay = el.dataset.revealDelay || '0';
                const duration = el.dataset.revealDuration || '700';

                el.style.transition = `all ${duration}ms cubic-bezier(0.5, 0, 0, 1) ${delay}ms`;

                // Force reflow to ensure the initial state is applied before transition
                void el.offsetHeight;

                el.style.opacity = '1';
                el.style.transform = 'translate(0, 0) scale(1)';

                observer.unobserve(el);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    nuxtApp.vueApp.directive('reveal', {
        mounted(el: HTMLElement, binding) {
            if (isReducedMotion) {
                el.style.opacity = '1';
                el.style.transform = 'none';
                return;
            }

            const options = binding.value || {};
            const direction = options.direction || 'up'; // up, down, left, right, scale, fade
            const distance = options.distance || '40px';

            el.dataset.revealDelay = (options.delay || 0).toString();
            el.dataset.revealDuration = (options.duration || 700).toString();

            el.style.opacity = '0';

            switch (direction) {
                case 'up': el.style.transform = `translateY(${distance})`; break;
                case 'down': el.style.transform = `translateY(-${distance})`; break;
                case 'left': el.style.transform = `translateX(${distance})`; break;
                case 'right': el.style.transform = `translateX(-${distance})`; break;
                case 'scale': el.style.transform = 'scale(0.8)'; break;
                case 'fade': el.style.transform = 'translate(0, 0)'; break;
            }

            revealObserver.observe(el);
        },
        unmounted(el: HTMLElement) {
            revealObserver.unobserve(el);
        }
    });

    // Stagger wrapper directive
    nuxtApp.vueApp.directive('stagger', {
        mounted(el: HTMLElement, binding) {
            if (isReducedMotion) return;

            const interval = binding.value || 100;

            setTimeout(() => {
                const children = Array.from(el.children) as HTMLElement[];
                children.forEach((child, index) => {
                    const baseDelay = parseInt(child.dataset.revealDelay || '0');
                    child.dataset.revealDelay = (baseDelay + (index * interval)).toString();
                });
            }, 0);
        }
    });

    // Parallax directive
    interface ParallaxElement {
        el: HTMLElement;
        speed: number;
        direction: string;
    }

    const parallaxElements: ParallaxElement[] = [];
    let isTicking = false;

    const onScroll = () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                parallaxElements.forEach(({ el, speed, direction }) => {
                    const yPos = -(scrolled * speed);
                    if (direction === 'up') {
                        el.style.transform = `translateY(${yPos}px)`;
                    } else {
                        el.style.transform = `translateY(${-yPos}px)`;
                    }
                });
                isTicking = false;
            });
            isTicking = true;
        }
    };

    if (!isReducedMotion) {
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    nuxtApp.vueApp.directive('parallax', {
        mounted(el: HTMLElement, binding) {
            if (isReducedMotion) return;
            const speed = binding.value?.speed || 0.2;
            const direction = binding.value?.direction || 'up';

            parallaxElements.push({ el, speed, direction });
        },
        unmounted(el: HTMLElement) {
            const index = parallaxElements.findIndex(p => p.el === el);
            if (index > -1) parallaxElements.splice(index, 1);
        }
    });
});
