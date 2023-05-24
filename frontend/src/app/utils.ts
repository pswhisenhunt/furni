function debounce(callback: Function, timeout: number = 300) {
  let timer: string | number | NodeJS.Timeout

  function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timer)
      callback(...args)
    }
    clearTimeout(timer)
    timer = setTimeout(later, timeout)
  }

  executedFunction.cancel = function () {
    clearTimeout(timer)
  }

  return executedFunction
}

export { debounce }