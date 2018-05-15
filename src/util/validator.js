/**
 * @author 池樱千幻
 * 表单校验
 * 将所有校验写在一个文件中 只调用这一个文件即可 
 * 该写法可能会导致属性的重复引用
 *  后续解决该问题
 * 
 * 返回一个对象 键为校验名称 值为一个数组 单个属性可以进行多次校验 
 * 进行多次校验的时候 按照数组顺序进行校验 这样的方式规避了通用校验方法 多次使用时导致的的顺序问题 jQuery的validator就有这样的问题
 * eg: 现有三种校验规则 A B C 多次校验时 会按照 A=>B=>C来进行校验 即满足A时再去校验B 满足B时 再去校验C
 * 以下列出常用属性
 * message 校验失败时显示的文字内容
 * trigger 何种方式触发校验 blur/change
 * required 是否必填 true 必填
 * min 最小长度
 * max 最大长度
 * type 数据类型 -- 是否严格校验?
 * validator 校验规则 该规则是个方法 方法内使用callback(new Error('错误信息')); 这个回调来向页面上输出错误信息
 * 自定义校验规则 与属性规则一样 都会按照顺序进行校验
 * 
 */


export default {
  name: [{
      required: true,
      message: "请输入活动名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 5,
      message: "长度在 4 到 5 个字符",
      trigger: "blur"
    }
  ],
  region: [{
    required: true,
    message: "请选择活动区域",
    trigger: "change"
  }],
  date1: [{
    type: "date",
    required: true,
    message: "请选择日期",
    trigger: "change"
  }],
  date2: [{
    type: "date",
    required: true,
    message: "请选择时间",
    trigger: "change"
  }],
  type: [{
    type: "array",
    required: true,
    message: "请至少选择一个活动性质",
    trigger: "change"
  }],
  resource: [{
    required: true,
    message: "请选择活动资源",
    trigger: "change"
  }],
  desc: [{
    required: true,
    message: "请填写活动形式",
    trigger: "blur"
  }],
  mail: [{
      required: true,
      message: "请填写邮箱",
      trigger: "blur"
    },
    {
      validator: (rule, value, callback) => {
        const regExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        !regExp.test(value) && callback(new Error('请输入正确的邮箱地址'))
      },
      trigger: 'blur'
    }
  ]
}
