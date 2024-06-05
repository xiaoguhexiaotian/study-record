// export const handlePointWindowParam = function (pointWindowParam: any) {
//   const tempData: any = pointWindowParam.map((item: any) => {
//     const { windowParam = null } = item
//     if (windowParam) {
//       for (const key in windowParam) {
//         if (key === 'Tumbling') {
//           const { dimension, unit, offset } = windowParam[key]

import { AGGTYPE, type TumblingType } from "./constant"

//           if (dimension === 'SECOND' && unit != '10') {
//             return {
//               ...item,
//               label: `${unit}秒`,
//               value: `${unit}_SECOND`
//             }
//           }

//           if (dimension === 'MINUTE' && unit != '1') {
//             return {
//               ...item,
//               label: `${unit}分`,
//               value: `${unit}_MINUTE`
//             }
//           }

//           if (dimension === 'HOUR' && (unit != '1' || offset != '00:00:00')) {
//             return {
//               ...item,
//               label: `${unit}小时`,
//               value: `${unit}_HOUR`
//             }
//           }

//           if (dimension === 'DAY' && (unit != '1' || offset != '00:00:00')) {
//             return {
//               ...item,
//               label: `${unit}天`,
//               value: `${unit}_DAY`
//             }
//           }
//         }
//         if (key === 'Natural') {
//           const { dimension, offset } = windowParam[key]

//           if (dimension === 'WEEK' && (offset.offset !== '1' || offset.hms !== '00:00:00')) {
//             return {
//               ...item,
//               label: `周${offset.offset}-${offset.hms}`,
//               value: `${offset.offset}_${offset.hms}_WEEK`
//             }
//           }

//           if (dimension === 'MONTH' && (offset.offset !== '1' || offset.hms !== '00:00:00')) {
//             return {
//               ...item,
//               label: `${offset.offset}号-${offset.hms}`,
//               value: `${offset.offset}_${offset.hms}_MONTH`
//             }
//           }
//         }
//         if (key === 'Period') {
//           const { start, end } = windowParam[key]
//           return {
//             ...item,
//             label: `${start}-${end}`,
//             value: `${start}-${end}`
//           }
//         }
//       }
//     }
//   })
// }

export const handlePointWindowParam = function (pointWindowParam: any) {
  const tempData: any = pointWindowParam.map((item: any) => {
    const { windowParam = null } = item
    if (windowParam) {
      for (const key in windowParam) {
        if (key === 'Tumbling') {
          const { dimension, unit, offset } = windowParam[key]
          return handleTumbling(dimension, unit, offset, item)
        }
        if (key === 'Natural') {
          const { dimension, offset } = windowParam[key]
          return handleNatural(dimension, offset, item)
        }
        if (key === 'Period') {
          const { start, end } = windowParam[key]
          return handlePeriod(start, end, item)
        }
      }
    }
  })
  console.log(tempData, 1111)

}

const handleTumbling = (dimension: string, unit: string, offset: string, item: any) => {
  if (dimension === 'SECOND' && unit != '10') {
    return {
      ...item,
      label: `${unit}秒`,
      value: `${unit}_SECOND`
    }
  }

  if (dimension === 'MINUTE' && unit != '1') {
    return {
      ...item,
      label: `${unit}分`,
      value: `${unit}_MINUTE`
    }
  }

  if (dimension === 'HOUR' && (unit != '1' || offset != '00:00:00')) {
    return {
      ...item,
      label: `${unit}小时`,
      value: `${unit}_HOUR`
    }
  }

  if (dimension === 'DAY' && (unit != '1' || offset != '00:00:00')) {
    return {
      ...item,
      label: `${unit}天`,
      value: `${unit}_DAY`
    }
  }
}

const handleNatural = (dimension: string, offset: { hms: string, offset: string }, item: any) => {
  if (dimension === 'WEEK' && (offset.offset !== '1' || offset.hms !== '00:00:00')) {
    return {
      ...item,
      label: `周${offset.offset}-${offset.hms}`,
      value: `${offset.offset}_${offset.hms}_WEEK`
    }
  }

  if (dimension === 'MONTH' && (offset.offset !== '1' || offset.hms !== '00:00:00')) {
    return {
      ...item,
      label: `${offset.offset}号-${offset.hms}`,
      value: `${offset.offset}_${offset.hms}_MONTH`
    }
  }
}

const handlePeriod = (start: string, end: string, item: any) => {
  return {
    ...item,
    label: `${start}-${end}`,
    value: `${start}-${end}`
  }
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
