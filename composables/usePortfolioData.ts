export const usePortfolioData = () => {
    const hero = {
        name: 'Farhan',
        headline: 'Farhan is learning to solve problems through design and meaningful user experiences.',
        availability: '2 projects left in April',
        photoUrl: '/pageweb/Img.png' // Utilizing local image as requested
    };

    const projects = [
        {
            id: 1,
            title: 'Telkomsel Redesign',
            category: 'UX Case Study',
            imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
            link: '#'
        },
        {
            id: 2,
            title: 'E-commerce App',
            category: 'UI/UX Design',
            imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop',
            link: '#'
        },
        {
            id: 3,
            title: 'Fintech Dashboard',
            category: 'Web Design',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
            link: '#'
        },
        {
            id: 4,
            title: 'Smart Home IoT',
            category: 'Mobile App',
            imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop',
            link: '#'
        }
    ];

    const companies = [
        { name: 'BRIN', logoUrl: '/pageweb/Brin.png' },
        { name: 'Telkomsel', logoUrl: '/pageweb/telkomsel.png' },
        { name: 'Airnav', logoUrl: '/pageweb/Airnav.png' },
        { name: 'Telkom University', logoUrl: '/pageweb/telyu.png' }
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Rindu Mustika Pratiwi',
            role: 'Project Manager at GIK',
            text: 'Farhan Rizki is a talented UI/UX designer with strong visual hierarchy, deep user empathy, and strategic thinking. A great mix of creativity and analysis in every design decision.',
            avatarUrl: 'https://i.pravatar.cc/150?u=rindu'
        },
        {
            id: 2,
            name: 'Budi Santoso',
            role: 'CEO at StartupX',
            text: 'Working with Farhan has been an absolute pleasure. His attention to detail and ability to understand our product vision made the design process seamless.',
            avatarUrl: 'https://i.pravatar.cc/150?u=budi'
        },
        {
            id: 3,
            name: 'Siti Aminah',
            role: 'Frontend Developer',
            text: 'The UI components Farhan delivered were perfectly organized and incredibly easy to translate into code. He truly understands how developers work.',
            avatarUrl: 'https://i.pravatar.cc/150?u=siti'
        }
    ];

    const faqs = [
        {
            question: 'What is your design process?',
            answer: 'I start with understanding the problem and user needs, followed by wireframing, high-fidelity design, and prototyping. I iterate based on feedback at each stage.'
        },
        {
            question: 'Do you also do frontend development?',
            answer: 'Yes! I build modern web applications using tools like Nuxt 3, Vue, and TailwindCSS.'
        },
        {
            question: 'Are you available for freelance projects?',
            answer: 'I am currently open to freelance opportunities. Feel free to reach out via email to discuss your project.'
        }
    ];

    return {
        hero,
        projects,
        companies,
        testimonials,
        faqs
    };
};
