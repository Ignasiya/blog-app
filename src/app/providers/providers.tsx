import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { FallbackError } from '@/shared/ui/FallbackError'
import { NetworkStatus } from '@/shared/ui/NetworkStatus'
import { persistor, store } from '../store'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={FallbackError}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <NetworkStatus>{children}</NetworkStatus>
        </Provider>
      </PersistGate>
    </ErrorBoundary>
  )
}
