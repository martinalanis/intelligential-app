export const formatDate = (arg) => {
  const date = new Date(arg)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}
