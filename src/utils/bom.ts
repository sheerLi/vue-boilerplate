/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 使用 setTimeout 实现 interval
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param options 配置
 * @returns NodeJs.Timeout
 */
export function setCustomInterval(
  fn: (args?: any) => any,
  delay: number,
  options?: { immediate?: boolean },
) {
  let timer: NodeJS.Timeout | null = null

  const excute = () => {
    fn()
    timer = setTimeout(excute, delay)
  }

  // 立即执行一次
  if (options?.immediate) {
    fn()
  }

  timer = setTimeout(excute, delay)

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  return {
    cancel,
  }
}
