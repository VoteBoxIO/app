/** Парсит строку из window.Telegram.WebApp.initDataUnsafe.start_param */
export const parseStartParam = (param: string | undefined) => {
  if (!param) return { ref: null, box: null }

  try {
    const [refPart, boxPart] = param.split('=')
    const ref = refPart?.split('ref_')[1]
    const box = boxPart?.split('box_')[1]

    return {
      ref,
      box,
    }
  } catch (error) {
    console.error('Failed to parse start parameter:', error)
    return { ref: null, box: null }
  }
}
