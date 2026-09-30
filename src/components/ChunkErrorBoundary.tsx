import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; retried: boolean }

export default class ChunkErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, retried: false }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Chunk failed to load (network blip) — reload once automatically
    if (!this.state.retried && error.message.includes('Failed to fetch dynamically imported module')) {
      this.setState({ retried: true, hasError: false })
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="font-display font-800 text-2xl text-[#F0EDE8] mb-3">Page failed to load</p>
            <p className="text-[#7A7672] mb-6 text-sm">A network error interrupted the page. Try refreshing.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-amber"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
