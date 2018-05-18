/**
 * @author 池樱千幻
 * 表单校验
 * 该表单校验依赖于elementUi 的async-validator插件与form插件 
 * 错误信息显示位置的自定义 还未找到 目前只能放在下面或同一行
 * 将所有校验写在一个文件中 只调用这一个文件即可 
 * 该写法可能会导致属性的重复引用
 *  后续解决该问题
 * 
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
 *  --- type 数据类型 半严格校验 
 *              eg : type=> string ,文本框类型 无  输入123 校验通过
 *                   type=> string ,文本框类型 number   输入123 校验通过
 *                   type=> number ,文本框类型 无   输入123 校验不通过 即 输入的123 为字符串
 *                   type=> number ,文本框类型 number   输入123 校验不通过 必须要使用transform 函数 将value转换成number才能通过 有点特殊
 *      注1: 这里有个default的问题 如果type不写 会被默认为string 
 *      注2: type 的string与number 都有min 和 max 属性 但是含义不同 
 *            string的min与max 含义是字符串长度在min与max之间 
 *            number的min与max 含义是数字的值在min与max之间 
 *            
 * validator 校验规则 该规则是个方法 方法内使用callback(new Error('错误信息')); 这个回调来向页面上输出错误信息
 * 自定义校验规则 与属性规则一样 都会按照顺序进行校验
 * 
 * @version 1.0 表单验证第一版 第二版将会尝试解决该文件的重复引用 表单各属性直接的依赖未解决
 * 
 * @version 2.0 解决了文件重复引用,以及表单各属性的依赖 但是引发了另一个问题 在各属性依赖的时候 如果B的校验依赖A 那么A的值在改变的时候 B的校验信息 同时会出来 (原因未知)
 */
const validator = (relyData = {}) => {
  return {
    name: [{
        type: "number",
        required: true,
        message: "请输入活动名称",
        trigger: "blur",
        transform(value) {
          return Number(value);
        },
      },
      {
        type: "number",
        min: 3,
        max: 5,
        message: "数值范围在 3 到 5 之间",
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
    mail: [{
      type: "email",
      message: "请填写正确的邮箱",
      trigger: "blur"
    }],
    phone: [{
      type: "regexp",
      validator: (rule, value, callback) => {
        if (value != "") {
          !/^1[345789]\d{9}$/.test(value) ? callback(new Error('请输入正确的手机号码')) : callback();
        }
      },
      trigger: 'blur'
    }],
    idCord: [{
      required: true,
      message: "请填写身份证号码",
      trigger: "blur"
    }, {
      validator: (rule, value, callback) => {
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(value) &&
          callback(new Error('请输入正确的身份证号码'))
      },
      trigger: 'blur'
    }],
    floatNumber: [{
      required: true,
      message: "请填写${占位符}",
      trigger: "blur"
    }, {
      validator: (rule, value, callback) => {
        !/^[0-9]+(.[0-9]{1,2})?$/.test(value) ? callback(new Error('请输入正确的两位以内小数')) : callback();
      },
      transform(value) {
        return value.trim();
      },
      trigger: 'blur'
    }],
    password: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
      },
      {
        min: 6,
        message: "请输入6位以上密码",
        trigger: "blur"
      }
    ],
    againPwd: [{
        min: 6,
        message: "请输入6位以上确认密码",
        trigger: "blur"
      },
      {
        validator: (rule, value, callback) => {
          if (value !== "") {
            if (value != relyData.password) {
              callback(new Error('两次密码不一致'))
            } else {
              callback()
            }
          }
        },
        trigger: 'change'
      }

    ]
  }
}
const expValid = (validArray = [], relyData = {}) => {
  let expData = {};
  const validatorObj = validator(relyData);
  if (validArray.length == 0) {
    return validatorObj;
  }
  for (let index = 0; index < validArray.length; index++) {
    const element = validArray[index];

    if (validatorObj.hasOwnProperty(element)) {
      expData[element] = validatorObj[element];
    }
  }
  return expData;
}





export default expValid
