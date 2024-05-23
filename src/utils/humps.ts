import humps from 'humps'

export function camelize(obj: any): any {
  if (!obj) return obj

  if (Array.isArray(obj)) {
    return obj.map(item => camelize(item))
  }

  if (typeof obj === 'object') {
    const camelizedObj: any = {}
    Object.keys(obj).forEach(key => {
      const camelizedKey = humps.camelize(key)
      camelizedObj[camelizedKey] = camelize(obj[key])
    })
    return camelizedObj
  }

  return obj
}

export function decamelize(obj: any): any {
  if (!obj) return obj

  if (Array.isArray(obj)) {
    return obj.map(item => decamelize(item))
  }

  if (typeof obj === 'object') {
    const camelizedObj: any = {}
    Object.keys(obj).forEach(key => {
      const camelizedKey = humps.decamelize(key)
      camelizedObj[camelizedKey] = decamelize(obj[key])
    })
    return camelizedObj
  }

  return obj
}
