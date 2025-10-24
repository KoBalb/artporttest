import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppProps } from "next/app"
import { useState } from "react"

export default function MyApp({ Component, pageProps }: AppProps) {
  // создаём один экземпляр QueryClient
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}