// 基本配置
// const url = "http://4hknyi.natappfree.cc"
// const url = "http://192.168.3.27"
// const url = "http://192.168.3.56"
// const url = "http://localhost"

const url = "http://49.232.143.139"
// const url = "http://120.79.95.187"

export const baseUrl = `${url}:8083`
export const baseUrlCom = `${url}:8060` //公共接口
export const resourseUrl = baseUrl //静态资源路径
export const upload = `${baseUrl}/file/upload`
export const systemCode = "project-management"; //当前系统的systemCode ,有且唯一
export const DICT = {
  BUSINESS: "API_BUSINESS_CODE", //行业类型
  PROJECT_MANAGEMENT_SUBTYPE: "PROJECT_MANAGEMENT_SUBTYPE" //子类型
}

// 项目状态
export const projectState = [{
    name: '全部',
    id: ""
  },
  {
    name: '意向',
    id: 0
  },
  {
    name: '中标',
    id: 1
  },
  {
    name: '合同',
    id: 2
  },
  {
    name: '实施',
    id: 3
  },
  {
    name: '验收',
    id: 4
  },
  {
    name: '发票',
    id: 5
  },
  {
    name: '回款',
    id: 6
  },
]
export const customTypeList = [{
    id: 1,
    name: '本科学校'
  },
  {
    id: 2,
    name: '高职学校'
  },
  {
    id: 3,
    name: '中职学校'
  },
  {
    id: 4,
    name: '技师（工）学校'
  },
  {
    id: 5,
    name: '基教学校'
  },
  {
    id: 6,
    name: '政府部门'
  },

]
export const projectTypeList = [{
    id: '',
    name: '全部'
  },
  {
    id: 4,
    name: '创新创业'
  },
  {
    id: 1,
    name: '产教融合'
  },
  {
    id: 2,
    name: '师资培养'
  },
  {
    id: 3,
    name: '实训基地'
  },

]
// 角色区分
// userType:1超管 2普通管理员 5校内老师,6校外老师 11学生 12校友 100未知
//统计用颜色
export const colorLists = [
  "#668B8B",
  "#98F5FF",
  "#FAEBD7",
  "#E6E6FA",
  "#2F4F4F",
  "#778899",
  "#6495ED",
  "#8470FF",
  "#4169E1",
  "#87CEEB",
  "#48D1CC",
  "#66CDAA",
  "#666699",
  "#20B2AA",
  "#BDB76B",
  "#A0522D",
  "#A52A2A",
  "#F08080",
  "#B03060",
  "#9370DB",
  "#008B8B"
]
export default {}
