<template>
<div class="financial" id="financial">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>信用卡</span>
    </div>
    <el-collapse v-model="activeName">
      <el-collapse-item title="item.openingBank + '&nbsp;&nbsp;卡号'+item.cardNumber + '&nbsp;&nbsp;额度'+ item.limitMoney"  name="1" v-for="(item,index) in financialModel.creditCards" :key="index">
        <el-table :data="item.cardBills" border>
          <el-table-column prop="billsDate" label="账单日" width="180" type="expand">
            <template slot-scope="props">
							<el-table :data="props.row.cardBillsInfos" border style="width: 96%">
								<el-table-column prop="tranDate" label="时间"></el-table-column>
								<el-table-column prop="tranDesc" label="消费简述"></el-table-column>
								<el-table-column prop="postAmt" label="消费金额"></el-table-column>
							</el-table>
						</template>
          </el-table-column>
          <el-table-column prop="repaymentDate" label="还款日"></el-table-column>
          <el-table-column prop="minniMoney" label="最小还款"></el-table-column>
          <el-table-column prop="currentstermShouldmoney" label="当期应还款"></el-table-column>
          <el-table-column prop="repaymentStatus" label="还款状态"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-card>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>储蓄卡</span>
    </div>

    <el-form ref="savingsCard" :model="savingsCard" label-width="80px" size="small" style="padding:20px;">
      <el-form-item label="开户行">
        <el-input v-model="savingsCard.openBranch" style="width:240px;" disabled></el-input>
      </el-form-item>
      <el-form-item label="开户时间">
        <el-date-picker
          v-model="savingsCard.openDate"
          placeholder="选择时间" style="width:240px;" disabled>
        </el-date-picker>
        <!-- <el-input v-model="savingsCard.openDate" style="width:240px;"></el-input> -->
      </el-form-item>
      <el-form-item label="卡号">
        <el-input v-model="savingsCard.cardNumber" style="width:240px;" disabled></el-input>
      </el-form-item>
    </el-form>

    <el-row style="text-align: center;padding-bottom:8px;">
      <el-col :lg="3" :xl="2" :offset="1" style="padding-left:6px;">#</el-col>
      <el-col :span="5">网银</el-col>
      <el-col :span="5">个人账户</el-col>
      <el-col :span="5">合计</el-col>
    </el-row>

    <el-row :gutter="20" v-for="(item,index) in savingsBills" :key="index" class="Savings-deposit-card">
      <el-col :lg="3" :xl="2" :offset="1" style="text-align:right;">第{{ item.sortNum }}月</el-col>
      <el-col :span="5"><el-input size="mini" v-model.number="item.netSumMoney" disabled></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model.number="item.selfSumMoney" disabled></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model.number="item.sumMoney" disabled></el-input></el-col>
    </el-row>

    <el-row :gutter="20" class="Savings-deposit-card">
      <el-col :lg="3" :xl="2" :offset="1" style="text-align:right;">平均值</el-col>
      <el-col :span="5"><el-input size="mini" v-model.number="savingsCard.netAvg" disabled></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model.number="savingsCard.selfAvg" disabled></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model.number="savingsCard.sumAvg" disabled></el-input></el-col>
    </el-row>

    <!-- <el-row :gutter="20">
      <el-col :span="2" :offset="1">极差</el-col>
      <el-col :span="5"><el-input size="mini" v-model="savingsCard.netRange"></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model="savingsCard.selfRange"></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model="savingsCard.sumRange"></el-input></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="2" :offset="1">标差系数</el-col>
      <el-col :span="5"><el-input size="mini" v-model="savingsCard.netCoeff"></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model="savingsCard.selfCoeff"></el-input></el-col>
      <el-col :span="5"><el-input size="mini" v-model="savingsCard.sumCoeff"></el-input></el-col>
    </el-row> -->
  </el-card>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'

import {
  findById,
  createDataJson
} from '@/apis/httpapis'

export default {
  name: "financial",
  props: {
    applyId: String
  },
  data() {
    return {
      coll: [""],
      activeName: '1',
      savingsCard:{
        cardNumber:"",
        openBranch:"",
        openDate:"",
        scId:"",
        applyId:"",
        netAvg:0,
        selfAvg:0,
        sumAvg:0,
        netRange:0,
        selfRange:0,
        sumRange:0,
        netCoeff:0,
        selfCoeff:0,
        sumCoeff:0,
        savingsBills:[{
          sbId:"",
          sdId:"",
          sortNum:1,
          netSumMoney:0,
          selfSumMoney:0,
          sumMoney:0
        },{
          sbId:"",
          sdId:"",
          sortNum:2,
          netSumMoney:0,
          selfSumMoney:0,
          sumMoney:0
        },{
          sbId:"",
          sdId:"",
          sortNum:3,
          netSumMoney:0,
          selfSumMoney:0,
          sumMoney:0
        },{
          sbId:"",
          sdId:"",
          sortNum:4,
          netSumMoney:0,
          selfSumMoney:0,
          sumMoney:0
        },{
          sbId:"",
          sdId:"",
          sortNum:5,
          netSumMoney:0,
          selfSumMoney:0,
          sumMoney:0
        },{
          sbId:"",
          sdId:"",
          sortNum:6,
          netSumMoney:0,
          selfSumMoney:0,
          sumMoney:0
        }]
      }
    };
  },
  created() {
    const applyId = this.applyId
    this.$store.dispatch('LoadFinancial', applyId)
/*    var url = "/sys/savingscard/findbyapplyid.do?applyId="+applyId;
    findById(url).then(response => {
      this.savingsCard = response.data;
    })*/
  },
  computed: {
    financialModel:{
      get () {
        return this.$store.state.audit.financialModel;
      },
      set (value) {
        this.$store.commit('SET_FINANCIAL', value)
      }
    },
    savingsBills:function(){
      let savingsBills = [];
      let netSum = 0;
      let selfSum = 0;
      let sum_ = 0;
      if(this.savingsCard.savingsBills!=null){
      	const length_ = this.savingsCard.savingsBills.length;
      	for (let i = 0; i < length_; i++) {
        let obj = this.savingsCard.savingsBills[i]
        //console.info("####"+JSON.stringify(obj));
        const sumMoney = obj.netSumMoney + obj.selfSumMoney;
        obj.sumMoney = sumMoney;
        netSum += obj.netSumMoney;
        selfSum += obj.selfSumMoney;
        sum_ += obj.sumMoney;
     	  }
      	this.savingsCard.netAvg = (netSum / length_).toFixed(2);
	      this.savingsCard.selfAvg = (selfSum / length_).toFixed(2);
	      this.savingsCard.sumAvg = (sum_ / length_).toFixed(2);
      }
      return  this.savingsCard.savingsBills;
    }
  },
  mounted() {

  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Savings-deposit-card{height:40px;}
.clearfix span{font-size: 18px;font-weight: bold;}
.box-card{margin-bottom:15px;}
</style>
