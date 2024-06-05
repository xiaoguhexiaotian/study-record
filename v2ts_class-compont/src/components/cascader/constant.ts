export enum AGGTYPE {
  AVG = 'Avg',
  CUR = 'Cur',
  MAX = 'Max',
  MIN = 'Min',
  RNG = 'Rng',
  STD = 'Std',
  SUM = 'Sum',
  DVE = 'Dve',
  FSM = 'Fsm',
  DSUM = 'Dsum',
  ACC = 'AcC',
  RDVE = 'Rdve',
  DIF = 'Dif'
}
export enum ReportType {
  /**日报 */
  Daily = 1,
  /**月报*/
  Monthly = 2,
  /** 季度报表 */
  Quarterly = 3,
  /**年报 */
  Yearly = 4,
  /** 自由报表*/
  Freedom = 5
}
export const DEFALUT_WINDOWSPARAM = {
  [ReportType.Daily]: {
    Tumbling: { unit: 1, dimentsion: 'HOUR', offset: '00:00:00' }
  },
  [ReportType.Monthly]: {
    Tumbling: { unit: 1, dimentsion: 'DAY', offset: '00:00:00' }
  },
  [ReportType.Quarterly]: {
    Tumbling: { unit: 1, dimentsion: 'DAY', offset: '00:00:00' }
  },
  [ReportType.Yearly]: {
    Natural: {
      unit: 1,
      dimentsion: 'MONTH',
      offset: { hms: '00:00:00', offset: 1 }
    }
  },
  [ReportType.Freedom]: null
}
export enum TumblingType {
  SECOND = "SECOND",
  MINUTE = "MINUTE",
  HOUR = "HOUR",
  DAY = "DAY"
}

export enum NaturalType {
  WEEK = "WEEK",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR"
}
export enum OmitValues {
  Shift = 'Shift',
  Group = 'Group',
  Period = 'Period', // 时间段
  Custom = 'Custom'
}

export const windowsParamOptions = [
  {
    value: TumblingType.SECOND,
    label: '10秒'
  }, {
    value: TumblingType.MINUTE,
    label: '1分钟'
  }, {
    value: TumblingType.HOUR,
    label: '1小时'
  }, {
    value: TumblingType.DAY,
    label: '1天'
  }, {
    value: NaturalType.WEEK,
    label: '1周'
  },
  {
    value: NaturalType.MONTH,
    label: '1月'
  }, {
    value: NaturalType.QUARTER,
    label: '1季度'
  },
  {
    value: NaturalType.YEAR,
    label: '1年'
  },
  {
    value: OmitValues.Shift,
    label: '班次',
    children: [
      {
        Shift: 1,
        value: '1',
        label: '班次1'
      },
      {
        Shift: 2,
        value: '2',
        label: '班次2'
      },
      {
        Shift: 3,
        value: '3',
        label: '班次3'
      },
      {
        Shift: 4,
        value: '4',
        label: '班次4'
      },]
  },
  {
    value: OmitValues.Group,
    label: '班组',
    children: [
      {
        Group: 1,
        value: '1',
        label: '班组1'
      },
      {
        Group: 2,
        value: '2',
        label: '班组2'
      },
      {
        Group: 3,
        value: '3',
        label: '班组3'
      },
      {
        Group: 4,
        value: '4',
        label: '班组4'
      },]
  },
  {
    value: OmitValues.Period,
    label: '自定义时段',
    children: [
      {
        start: '01:00:00',
        end: '03:00:00',
        value: 'Period1',
        label: '01:00:00-03:00:00'
      },
      {
        start: '08:00:00',
        end: '10:00:00',
        value: 'Period2',
        label: '08:00:00-10:00:00'
      },
      {
        start: '15:00:00',
        end: '17:00:00',
        value: 'Period3',
        label: '15:00:00-17:00:00'
      },
    ]
  }
]

export const cellWindowParamOptions = [
  {
    value: TumblingType.MINUTE,
    label: '1分钟'
  }, {
    value: TumblingType.HOUR,
    label: '1小时'
  }, {
    value: TumblingType.DAY,
    label: '1天'
  }, {
    value: NaturalType.WEEK,
    label: '1周'
  },
  {
    value: NaturalType.MONTH,
    label: '1月(自然月)'
  }, {
    value: NaturalType.QUARTER,
    label: '1季度'
  },
  {
    value: NaturalType.YEAR,
    label: '1年'
  },
  {
    value: 'Custom',
    label: '自定义时长'
  },
  {
    value: OmitValues.Shift,
    label: '按班次/班组',
  },
  {
    value: OmitValues.Period,
    label: '自定义时段',
  }
]


export enum SceneType {
  Cell = 'Cell',
  Point = 'Point'
}

export const PointWindowParam = [
  {
    windowParam: {
      Tumbling: {
        dimension: 'SECOND',
        offset: null,
        unit: 60 // 自定义秒
      }
    }
  },
  {
    windowParam: {
      Tumbling: {
        dimension: 'MINUTE',
        offset: null,
        unit: 60  // 自定义分
      }
    }
  },
  {
    windowParam: {
      Tumbling: {
        dimension: 'HOUR',
        offset: '02:02:02',
        unit: 24  // 自定义小时
      }
    }
  },
  {
    windowParam: {
      Tumbling: {
        dimension: 'DAY',
        offset: '01:01:01',
        unit: 24  // 自定义天
      }
    }
  },
  {
    windowParam: {
      Natural: {
        dimension: 'WEEK',
        offset: {
          hms: '01:01:01',// 偏移量
          offset: 5 // 周五
        }
      }
    }
  },
  {
    windowParam: {
      Natural: {
        dimension: 'MONTH',
        offset: {
          hms: '01:01:01',// 偏移量
          offset: 5 // 5号
        }
      }
    }
  },
  {
    windowParam: {
      Period: {
        end: '12:00:00',
        start: '08:30:00'
      }
    }
  },
]
// 时间窗默认数据
export const defalutTimeWindowMap: any = {
  [TumblingType.SECOND]: {
    Tumbling: {
      dimension: TumblingType.SECOND,
      unit: 10
    }
  },
  [TumblingType.MINUTE]: {
    Tumbling: {
      dimension: TumblingType.MINUTE,
      unit: 1
    }
  },
  [TumblingType.HOUR]: {
    Tumbling: {
      dimension: TumblingType.HOUR,
      unit: 1
    }
  },
  [TumblingType.DAY]: {
    Tumbling: {
      dimension: TumblingType.DAY,
      unit: 1
    }
  },
  [NaturalType.WEEK]: {
    Natural: {
      dimension: NaturalType.WEEK,
      offset: { hms: '00:00:00', offset: 1 },
      unit: 1
    }
  },
  [NaturalType.MONTH]: {
    Natural: {
      dimension: NaturalType.MONTH,
      offset: { hms: '00:00:00', offset: 1 },
      unit: 1
    }
  },
  [NaturalType.QUARTER]: {
    Natural: {
      dimension: NaturalType.QUARTER,
      unit: 1
    }
  },
  [NaturalType.YEAR]: {
    Natural: {
      dimension: NaturalType.YEAR,
      unit: 1
    }
  },
}

// 定义每个维度对应的单位和默认值
export const dimensionConfig: any = {
  [TumblingType.SECOND]: { label: '秒', defaultUnit: 10, defaultValue: TumblingType.SECOND },
  [TumblingType.MINUTE]: { label: '分钟', defaultUnit: 1, defaultValue: TumblingType.MINUTE },
  [TumblingType.HOUR]: { label: '小时', defaultUnit: 1, defaultValue: TumblingType.HOUR },
  [TumblingType.DAY]: { label: '天', defaultUnit: 1, defaultValue: TumblingType.DAY },
  [NaturalType.WEEK]: { label: '周', defaultUnit: 1, defaultValue: NaturalType.WEEK },
  [NaturalType.MONTH]: { label: '月', defaultUnit: 1, defaultValue: NaturalType.MONTH },
  [NaturalType.QUARTER]: { label: '季度', defaultUnit: 1, defaultValue: NaturalType.QUARTER },
  [NaturalType.YEAR]: { label: '年', defaultUnit: 1, defaultValue: NaturalType.YEAR },
}

export const testArray = [
  {
    value: TumblingType.SECOND,
    label: '10秒',
    disabled: true,
    windowParam: {
      Tumbling: {
        dimension: TumblingType.SECOND,
        unit: 10
      }
    }
  },
  {
    value: TumblingType.MINUTE,
    label: '1分钟',
    disabled: true,
    windowParam: {
      Tumbling: {
        dimension: TumblingType.MINUTE,
        unit: 1
      }
    }
  },
  {
    value: TumblingType.HOUR,
    label: '1小时',
    disabled: true,
    windowParam: {
      Tumbling: {
        dimension: TumblingType.HOUR,
        unit: 1
      }
    }
  },
  {
    value: TumblingType.DAY,
    label: '1天',
    disabled: true,
    windowParam: {
      Tumbling: {
        dimension: TumblingType.DAY,
        unit: 1
      }
    }
  },
  {
    value: NaturalType.WEEK,
    label: '1周',
    disabled: true,
    windowParam: {
      Natural: {
        dimension: NaturalType.WEEK,
        offset: { hms: '00:00:00', offset: 1 },
        unit: 1
      }
    }
  },
  {
    value: NaturalType.MONTH,
    label: '1月',
    disabled: true,
    windowParam: {
      Natural: {
        dimension: NaturalType.MONTH,
        offset: { hms: '00:00:00', offset: 1 },
        unit: 1
      }
    }
  }, {
    value: NaturalType.QUARTER,
    label: '1季度',
    disabled: true,
    windowParam: {
      Natural: {
        dimension: NaturalType.QUARTER,
        unit: 1
      }
    }
  },
  {
    value: NaturalType.YEAR,
    label: '1年',
    disabled: true,
    windowParam: {
      Natural: {
        dimension: NaturalType.YEAR,
        unit: 1
      }
    }
  },
]