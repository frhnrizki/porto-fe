/**
 * Composable to handle email links across mobile and desktop.
 * - Mobile: uses mailto: which triggers the native Gmail/Mail app in compose mode.
 * - Desktop: opens Gmail web compose in a new tab.
 */
export const useEmail = () => {
  const email = 'farhanrizki475@gmail.com'
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`
  const mailtoUrl = `mailto:${email}`

  const isMobile = (): boolean => {
    if (!import.meta.client) return false
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
  }

  const openEmail = () => {
    if (isMobile()) {
      // On mobile, mailto: opens the native Gmail app in compose mode
      window.location.href = mailtoUrl
    } else {
      // On desktop, open Gmail web compose in a new tab
      window.open(gmailComposeUrl, '_blank')
    }
  }

  const getEmailLink = () => {
    return isMobile() ? mailtoUrl : gmailComposeUrl
  }

  return { openEmail, getEmailLink, email }
}
