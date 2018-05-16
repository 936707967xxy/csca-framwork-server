import axios from 'axios'

let options = [{
    value: 1,
    label: '身份证明'
  },
  {
    value: 2,
    label: '收入证明'
  },
  {
    value: 3,
    label: '信用报告'
  },
  {
    value: 4,
    label: '银行流水'
  },
  {
    value: 5,
    label: '申请单'
  },
  {
    value: 6,
    label: '补充材料信息'
  }
];


export function imgType() {
  axios.get('/sys/annex/imgtype.do')
  .then(function (response) {
    options = response.data;
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  return options;
}

export function getImgTypeLabel(val){
  for(var i=0;i<options.length;i++){
    if(val == options[i].value){
      return options[i].label;
    }
  }
}
