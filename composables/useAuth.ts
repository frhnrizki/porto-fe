export const useAuth = () => {
    const token = useCookie('auth.token')
    const $api = useApi()

    const login = async (email: string, password: string) => {
        try {
            const response: any = await $api('/auth/login', {
                method: 'POST',
                body: { email, password }
            })
            token.value = response.access_token
            return true
        } catch (error) {
            console.error('Login failed', error)
            return false
        }
    }

    const logout = () => {
        token.value = null
        navigateTo('/login')
    }

    const isLoggedIn = computed(() => !!token.value)

    return {
        token,
        login,
        logout,
        isLoggedIn
    }
}
