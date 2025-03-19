export function getWeek (adapter: DateAdapter<any>, value: any) {
    const date = adapter.toJsDate(value)
    let year = date.getFullYear()
    let d1w1 = new Date(year, 0, 1)
  
    if (date < d1w1) {
      year = year - 1
      d1w1 = new Date(year, 0, 1)
    } else {
      const tv = new Date(year + 1, 0, 1)
      if (date >= tv) {
        year = year + 1
        d1w1 = tv
      }
    }
  
    const diffTime = Math.abs(date.getTime() - d1w1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
    return Math.floor(diffDays / 7) + 1
  }
  