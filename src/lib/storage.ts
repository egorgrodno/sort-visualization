const getValue = (key: string) => (): string | null => {
  return localStorage.getItem(key)
}

const putValue = (key: string) => (value: string): void => {
  return localStorage.setItem(key, value)
}

export const newStorage = (key: string) => {
  const prettyKey = `sv::${key}`

  return {
    get: getValue(prettyKey),
    put: putValue(prettyKey),
  }
}
