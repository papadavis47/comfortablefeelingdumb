import { debounce } from '../debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls function after wait period', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('resets timer on subsequent calls', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200)

    debounced()
    vi.advanceTimersByTime(100)
    debounced()
    vi.advanceTimersByTime(100)

    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('passes arguments through', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200)

    debounced('hello', 42)
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledWith('hello', 42)
  })

  it('calls on leading edge with immediate flag', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200, true)

    debounced()
    expect(fn).toHaveBeenCalledOnce()
  })

  it('allows new call after cooldown with immediate', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200, true)

    debounced()
    expect(fn).toHaveBeenCalledOnce()

    vi.advanceTimersByTime(200)

    debounced()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
