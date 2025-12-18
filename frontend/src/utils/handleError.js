export const handleAxiosError = (err) => {
  if (!err.response) {
    return "errors.network"
  }

  if (err.response.status >= 500) {
    return "errors.server"
  }

  return err.response.data?.message || "errors.unknown"
}
