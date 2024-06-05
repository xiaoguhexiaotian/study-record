import { AGGTYPE, defalutTimeWindowMap, dimensionConfig, NaturalType, TumblingType } from "./constant"


export const handlePointWindowParam = function (pointWindowParam: any) {
  const tempData: any = pointWindowParam.map((item: any) => {
    const { windowParam = null } = item
    if (windowParam) {
      return { ...item, ...timeWindowOptionHandle(windowParam) }
    }
  })
  return tempData
}

// 处理 时间窗数据 以供 选择器使用
const timeWindowOptionHandle = (windowParam: any) => {
  const key = Object.keys(windowParam)[0]
  const { dimension, unit, offset, start, end } = windowParam[key]
  const { label } = dimensionConfig[dimension] || {}
  if (key === 'Tumbling') {
    return {
      label: !offset ? `${unit}${label}` : `${unit}${label}-${offset}`,
      value: `${dimension}_${unit}_${offset}`
    }
  }
  if (key === 'Natural') {
    if ([NaturalType.WEEK, NaturalType.MONTH].includes(dimension)) {
      return {
        label: `${label}${offset?.offset ? offset?.offset : 1}`,
        value: `${dimension}_${unit}_${offset?.offset}_${offset?.hms}`
      }
    }
    return {
      label: `${unit}${label}`,
      value: `${dimension}_${unit}`
    }
  }
  if (key === 'Period') {
    return {
      label: `${start}_${end}`,
      value: `${start}_${end}`
    }
  }
}

export function getKeyByWindowParam(item: any) {
  if (item instanceof Array) {
    const res = item.map((el) => el.Shift).sort((a, b) => a - b)
    return res.join('_')
  }
  const obj = item.Tumbling || item.Natural || item.Period || item.Shift
  if ('Tumbling' in item) {
    return `${obj.dimension}_${obj.unit}_${obj.offset}`
  }
  if ('Natural' in item) {
    return `${obj.dimension}_${obj.unit}_${obj.offset?.offset}_${obj.offset?.hms}`
  }
  if ('Period' in item) {
    return `${item.start}_${item.end}`
  }
  return `Shift_${item.Shift}`
}

export const isDefaultWindowParam = function (windowParam: any) {
  for (const key in windowParam) {
    const value = windowParam[key]
    if (key === 'Tumbling') {
      const { dimension, unit, offset } = value
      if (dimension === 'SECOND' || (dimension === 'MINUTE' && unit !== '1') || (dimension === 'HOUR' && (unit !== '1' || offset !== '00:00:00')) || (dimension === 'DAY' && (unit !== '1' || offset !== '00:00:00'))) {
        return false
      }
    } else if (key === 'Natural') {
      const { dimension, offset } = value
      if (dimension === 'WEEK' && (offset.offset !== '1' || offset.hms !== '00:00:00')) {
        return false
      } else if (dimension === 'MONTH' && (offset.offset !== '1' || offset.hms !== '00:00:00')) {
        return false
      }
    } else if (key === 'Period') {
      return false
    }
  }
  return true
}

const timeWindowList = ['MINUTE', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR', 'CustomDur', 'Shift', 'CustomPeriod']
export const getPointWindowParamList = (id: string) => {
  const result: any = []
  const AGGTYPEList = Object.values(AGGTYPE)
  for (let i = 0; i < 5; i++) {
    const obj = {
      pointId: id,
      aggregateAttrId: id,
      timeWindowParam: i <= 2 ? handleThumblingWindow(timeWindowList[i]) : handleThumblingWindow(timeWindowList[i]),
      timeWindow: timeWindowList[i],
      aggregateTypeList: AGGTYPEList.slice(0, i + 1)
    }
    result.push(obj)
  }
  return new Promise((resolve) => {
    result.push({
      pointId: id,
      aggregateAttrId: id,
      timeWindowParam: {
        Tumbling: {
          dimension: TumblingType.MINUTE,
          unit: 1
        }
      },
      timeWindow: TumblingType.SECOND,
      aggregateTypeList: AGGTYPEList
    })
    return resolve(result)
  })
}

const handleThumblingWindow = (dimension: string) => {
  return {
    Tumbling: {
      unit: 10,
      dimension
    }
  }
}

const handleNaturalWindow = (dimension: string) => {
  const obj: any = {
    Natural: {
      unit: 1,
      dimension
    }
  }
  if (['WEEK', 'MONTH'].includes(dimension)) {
    obj.Natural.offset = {
      hms: '00:00:00', offset: 1
    }
  }
  return obj
}
