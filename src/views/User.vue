<template>
    <div>
        <div class="header">
            <div>
                <el-button type="primary" @click="dialogVisible = true">新增用户</el-button>
            </div>
             <div>
                <el-form :mode="userForm" class="search" :inline="true">
                    <div>
                        <el-form-item>
                            <el-input placeholder="请输入内容" v-model="userForm.name"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item>
                            <el-button type="primary" @click="searchSub">搜索</el-button>
                        </el-form-item>
                    </div>
                </el-form>
             </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model.trim="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number.trim="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.gender" placeholder="请选择">
                    <el-option 
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.addr"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                    v-model="form.birth"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onSubmit()">取 消</el-button> 
                <el-button type="primary" @click="sub(form)">确 定</el-button>
            </span>
            </el-dialog>
            <div class="bdy">
                <template>
                <el-table
                :data="tableData"
                :key="tableData.id"
                style="width: 100%">
                <el-table-column
                    prop="birth"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex==1 ?"男":'女' }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button
                    size="mini" 
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
                </el-table-column>
                </el-table>
              
                <div class="block">
                <el-pagination
                    :data="tableData"
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="current"
                    class="elb"
                    >
                </el-pagination>
                </div>

            </template>
            </div>
    </div>
</template>
<script>
import { getUser,addUser,editUser,deleteUser, } from '@/api/index';
export default{
    data(){
        return{
            dialogVisible: false,
            form: {
            name:'',
            age:'',
            sex:'',
            birth:'',
            addr:""
          },
          options:[
            {
                value:"选项一",
                label:"男"
            },
            {
                value:"选项二",
                label:"女"
            }
          ],
          rules:{
            name:[
                // 光标聚集
                {required:true,message:"姓名",tigger:'red'},
                //文字输入
                {min:2,max:4,message:"长度在3-4个字符",tigger:'red'}
            ],
            age:[
                {type:'number',message:'请输入数字类型',tigger:'red',},
                {type:'number',required:true,min:1,max:99,message:"范围在1-99之间"}
                
            ],
          
          },
          tableData:[],
          //弹窗类型
          modelType:0,
          //条数
          total:0,
          pageData:{
            page:1,
            limit:20 
          },
          userForm:{
            name:""
        }
     }
    },
    methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
      ,
      onSubmit(){
        this.dialogVisible=false
        this.$nextTick(function(){
          this.form.gender=''
          this.$refs['form'].resetFields()
        })
      
      
      },
      sub(){
       this.$refs['form'].validate((vaid)=>{
        if(vaid){
           if(this.modelType==0){
            addUser(this.form).then((req)=>{
                this.getList()
                
            })
            
           }else{
            editUser(this.form).then(()=>{
                this.getList()
            })
           }
        }else{
            return false
        }
       })
       this.dialogVisible=false
      },
      handleEdit(i){
        this.modelType=1
        this.dialogVisible=true
        this.form=JSON.parse(JSON.stringify(i))
      },
      handleDelete(i){
        this.modelType=0
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        deleteUser(i).then(()=>{
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
       
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getList(){
        console.log(this.pageData)
        getUser({params:{...this.userForm,...this.pageData}}).then(({data})=>{
        
        this.tableData=data.list
        this.total=data.count||0
      })
      },
      current(val){
       this.pageData.page=val
       this.getList()
       
      },
      searchSub(){
        this.getList()
      }
    },
    mounted(){
     this.getList()
        
    }
    
    
}
</script>
<style scoped lang="less">
.bdy{
    height: 750px;
    overflow-y: scroll;
}
.header{
    display: flex;
    justify-content: space-between;
    .search{
        display: flex;
    }
}
.block{
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: right;
    .elb{
        padding: 0;
    }
   
}
</style>