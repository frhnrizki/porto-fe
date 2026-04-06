export const useSubmitTestimonial = () => {
    const config = useRuntimeConfig();
    const loading = ref(false);
    const error = ref<string | null>(null);
    const success = ref(false);

    const submit = async (payload: { name: string; email: string; rating: number; message: string }) => {
        loading.value = true;
        error.value = null;
        success.value = false;

        try {
            const apiUrl = `${config.public.apiBase}/testimonials`;

            const data = await $fetch<any>(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payload
            });
            
            success.value = true;
            return data;
        } catch (e: any) {
            error.value = e?.message || 'Failed to submit testimonial. Please try again later.';
            console.error('Testimonial submission error:', e);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        success,
        submit
    };
};
