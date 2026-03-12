export const useApi = () => {
    const config = useRuntimeConfig()

    return async <T>(request: string, opts?: any) => {
        const token = useCookie('auth.token')

        try {
            return await $fetch<T>(request, {
                baseURL: config.public.apiBase || 'http://localhost:3000',
                ...opts,
                headers: {
                    ...opts?.headers,
                    ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
                }
            })
        } catch (error: any) {
            if (error.response?.status === 401) {
                token.value = null
                navigateTo('/login')
            }
            throw error
        }
    }
}
