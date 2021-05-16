export const formatDate = (arg) => {
  const date = new Date(arg)
  return `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}
