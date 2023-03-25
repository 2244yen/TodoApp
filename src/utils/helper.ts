export const setItem = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
  const value = window.localStorage.getItem(key)
  try {
    return value ? JSON.parse(value) : value
  } catch {
    return value
  }
}
