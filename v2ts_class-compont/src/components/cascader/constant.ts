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
  Period = 'Period',
  TimeLength = 'TimeLength'
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
