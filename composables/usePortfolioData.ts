export const usePortfolioData = () => {
    const hero = {
        name: 'Farhan',
        headline: 'Farhan is learning to solve problems through design and meaningful user experiences.',
        availability: '2 projects left in April',
        photoUrl: '/pageweb/Img.png' // Utilizing local image as requested
    };

    const projects: any[] = [];

    const companies = [
        { name: 'BRIN', logoUrl: '/pageweb/Brin.png' },
        { name: 'Telkomsel', logoUrl: '/pageweb/telkomsel.png' },
        { name: 'Airnav', logoUrl: '/pageweb/Airnav.png' },
        { name: 'Telkom University', logoUrl: '/pageweb/telyu.png' }
    ];

    const testimonials: any[] = [];

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
