'use-client'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  const initBotpress = () => {
    window.botpressWebChat.init({
      composerPlaceholder: 'Chat with bot',
      botConversationDescription:
        'This chatbot was built surprisingly fast with Botpress',
      botId: 'b6cf7b0a-6c47-49c4-893b-3c81b3b479dd',
      hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
      messagingUrl: 'https://messaging.botpress.cloud',
      clientId: 'b6cf7b0a-6c47-49c4-893b-3c81b3b479dd',
    })
  }

  return (
    <>
      <Component {...pageProps} />
      <Script
        src='https://cdn.botpress.cloud/webchat/v0/inject.js'
        onLoad={() => {
          initBotpress()
        }}
      />
    </>
  )
}
