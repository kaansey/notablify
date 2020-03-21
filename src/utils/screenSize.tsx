export const getMaxScreenSize = () => {
  return {
    width: Math.max(
      document.body.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.clientWidth
    ),
    height: Math.max(
      document.body.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    ),
  }
}
