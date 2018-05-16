<template>
  <div class="role-box">
    <el-row class="search-box">
      <el-col :span="24">
          <div class="grid-content bg-purple-dark">
              <el-form :inline="true" :model="listQuery" class="demo-form-inline">
                <el-form-item label="角色">
                  <el-input v-model="listQuery.roleName" placeholder="角色名称" size="small"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="searchRole" size="small">查询</el-button>
                </el-form-item>
              </el-form>
          </div>
        </el-col>
    </el-row>

    <el-row class="toolbar">
      <el-col :span="24">
          <div class="grid-content bg-purple-dark">
              <el-button type="primary" size="small" @click="handleCreate" v-if="checkPermiss('role_create')">添加</el-button>
         			<el-button type="success" size="small" @click="handleUpdate" v-if="checkPermiss('role_update')">修改</el-button>
              <el-button type="warning" size="small" @click="handleGrant" v-if="checkPermiss('role_grant')">授权</el-button>
         			<el-button type="danger" size="small" @click="remove" v-if="checkPermiss('role_remove')">删除</el-button>
          </div>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
          <div class="grid-content bg-purple-dark">
              <el-table :data="tableData" border style="width: 100%" cell-class-name="cell-class" @selection-change="selchage">
                <el-table-column
                type="selection"
                width="55">
              </el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
                <el-table-column prop="roleDesc" label="描述" width="360"></el-table-column>
                <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button @click="handleClickEdit(scope.row)" size="mini" v-if="checkPermiss('role_update')">修改</el-button>
                    <el-button @click="handleClickDel(scope.row)" size="mini" type="danger" v-if="checkPermiss('role_remove')">删除</el-button>
                    <el-button @click="handleGrant(scope.row)" size="mini" type="warning" v-if="checkPermiss('role_grant')">授权</el-button>
                  </template>
                </el-table-column>
              </el-table>
          </div>
      </el-col>
    </el-row>

    <el-row style="margin-top:20px;">
      <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[30, 60, 90, 120]"
              :page-size="30"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
		  <el-form :model="componentModel"  ref="componentModel">
		    <el-form-item label="角色名称" :label-width="formLabelWidth">
		      <el-input v-model="componentModel.roleName" ></el-input>
		    </el-form-item>
		    <el-form-item label="描述" :label-width="formLabelWidth">
		      <el-input v-model="componentModel.roleDesc" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
	      <el-button @click="dialogFormVisible=false" size="small">取 消</el-button>
	      <el-button v-if="dialogStatus=='create'" type="primary" @click="create" size="small">确 定</el-button>
	      <el-button v-else type="primary" @click="update" size="small">确 定</el-button>
	    </div>
		</el-dialog>

    <el-dialog :title="grantTitle" :visible.sync="dialogGrantVisible" width="30%" style="padding-left:40px;">
      <el-tree :data="treeData" ref="roleTree" show-checkbox node-key="nodeKey" check-strictly default-expand-all></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGrantVisible=false" size="small">取 消</el-button>
        <el-button  type="primary" @click="grant" size="small">确 定</el-button>
      </div>
    </el-dialog>

</div>
</template>

<script>
import { fetchData, findById, updateData,removeData,createData } from '@/apis/httpapis'
//import { fetchData, fetchPv } from '@/apis/httpapis'
export default {
  name: 'Role',
  data () {
    return {
      grantTitle:"角色授权",
      tableData:null,
      total: null,
      listQuery: {
        page: 1,
        rows: 30,
        roleName: ''
      },
      dialogFormVisible: false,
      dialogGrantVisible:false,
	    componentModel: {
        roleId:'',
	      roleName: '',
	      roleDesc: '',
	      ascription: '',
	    },
      formLabelWidth: '120px',
      dialogStatus:'',
      textMap: {
        update: '修改组件',
        create: '创建组件'
      },
      multipleSelection: [],
      changeOnSelect:true,
      showAllLevels:false,
      autoExpandParent:true,
      checkStrictly:false,
      defaultExpandedKeys:[''],
      treeData: [{}],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getPager()
  },
  methods: {
      getPager(){
        fetchData('/sys/role/pager.do',this.listQuery).then(response => {
        	//console.log("response" +JSON.stringify(response));
          this.tableData = response.data.pageData
          this.total = response.data.recordCount
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.rows = val
        this.getPager();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.page = val;
        this.getPager();
      },
      searchRole() {
        this.getPager();
      },
      handleClickEdit(row){
      	this.componentModel = row;
      	this.dialogStatus = 'update'
	      this.dialogFormVisible = true
      	console.dir(row);
      },
      handleClickDel(row){
      	this.removeOne(row.roleId);
      },
      handleCreate(){
      	this.componentModel = {
		      roleName: '',
		      roleDesc: '',
		      ascription: '',
		    }
      	this.dialogStatus = 'create'
      	this.dialogFormVisible = true
      },
      handleUpdate() {//添加点击弹窗
        var nodes = this.multipleSelection;
	      if (null === nodes || '' === nodes || nodes.length < 1) {
	        this.$message({
	          message: '警告,请选择要修改的组件!',
	          type: 'warning'
	        });
	        return;
	      }
	      if (nodes.length > 1) {
	        this.$message({
	          message: '警告,只支持单数据修改!',
	          type: 'warning'
	        });
	        return;
	      }
	      var id = nodes[0].roleId;
	      this.findById(id);
	      this.dialogStatus = 'update'
	      this.dialogFormVisible = true
	    },
      handleGrant(node){//授权
        //console.info(JSON.stringify(node.roleId));
        var id = node.roleId;
        if (undefined === id || null === id || '' === id) {
          var nodes = this.multipleSelection;
          if (null === nodes || '' === nodes || nodes.length < 1) {
            this.$message({
              message: '警告,请选择要授权的角色!',
              type: 'warning'
            });
            return;
          }
          if (nodes.length > 1) {
            this.$message({
              message: '警告,只支持单数据授权!',
              type: 'warning'
            });
            return;
          }
          id = nodes[0].roleId;
        }
        this.componentModel.roleId = id;
        this.dialogGrantVisible = true;
        fetchData('/sys/components/tree.do').then(response => {
          //console.info("#######" + JSON.stringify(response.data))
          this.treeData = response.data
        })

        //获取该角色的资源 /sys/role/permiss.do
        fetchData('/sys/role/permiss.do?id='+id).then(response => {
          //console.info("#######" + JSON.stringify(response.data))
          //this.defaultExpandedKeys = response.data
          this.$refs.roleTree.setCheckedKeys(response.data);
        })
      },
		  create(){
	      var url = "/sys/role/create.do";
	      createData(url,this.componentModel)
	      .then(response => {
	        var result = response.data
	        if (result.success) {
	          this.$message({
	            message: result.msg,
	            type: 'success'//success/warning/info/error
	          });
	          this.dialogFormVisible = false
	          this.getPager();
	        }else{
	            this.$message({
	              message: result.msg,
	              type: 'warning'
	            });
	        }
	      })
	    },
    	update(){
	      var url="/sys/role/update.do";
	      updateData(url,this.componentModel)
	      .then(response => {
	        var result = response.data
	        if (result.success) {
	          this.$message({
	            message: result.msg,
	            type: 'success'//success/warning/info/error
	          });
	          this.dialogFormVisible = false
	          this.getPager();
	        }else{
	            this.$message({
	              message: result.msg,
	              type: 'warning'
	            });
	        }
	     	})
    	},
    	selchage(selection){
    		this.multipleSelection=selection;
      },
	   	remove(){
	      var nodes = this.multipleSelection;
	      if (null === nodes || '' === nodes || nodes.length < 1) {
	        return;
	      }
	      for(var i =0; i<nodes.length; i++){
	      	this.removeOne(nodes[i].roleId);
	      }
	    },
	    removeOne(id){
	    	var url="/sys/role/remove.do?roleId=" + id;
      	removeData(url).then(response => {
	        var result = response.data
	        if (result.success) {
	          this.$message({
	            message: result.msg,
	            type: 'success'//success/warning/info/error
	          });
	          this.dialogFormVisible = false
	         	this.getPager();
	        }else{
	            this.$message({
	              message: result.msg,
	              type: 'warning'
	            });
	        }
	      })
	    },
	    findById(id){
	      findById('/sys/role/query.do?roleId='+id)
	      .then(response => {
	        this.componentModel = response.data
	      })
	    },
      grant(){
        //角色ID
        const roleId = this.componentModel.roleId;

        //获取所有选择的树
        const cptKeys = this.$refs.roleTree.getCheckedKeys();

        const data = {
          roleId:roleId,
          cptKeys:cptKeys.join(',')
        }

        fetchData('/sys/role/grant.do',data).then(response => {
          const result = response.data;
          if (result.success) {
            this.$message({
              message: result.msg,
              type: 'success'//success/warning/info/error
            });
            this.dialogGrantVisible = false;
          }else{
            this.$message({
              message: result.msg,
              type: 'warning'//success/warning/info/error
            });
          }
        })
      },
      checkPermiss(cpt){
        return this.checkAction(cpt);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
   .el-table td, .el-table th{
    padding: 6px 0px;
  }

 .search-box,
	.toolbar {
		margin: 10px 5px 10px 30px;
	}


  .cell-class{
    height: 20px;
    padding: 6px 0px;
  }
</style>
