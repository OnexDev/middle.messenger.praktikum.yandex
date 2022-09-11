export type BlockProps = {
    styles?: string[],
    attrs?: Record<string, any>
    events?: Record<string, (...args: any[]) => void>
}
