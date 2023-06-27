<template>
    <div class="box">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统登录</span>
            </div>
            <el-form :label-position="label" :model="form" label-width="60px" :rules="rules" ref="formName">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="form.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" @click="onSubmit" :plain="true">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '@/api/index'
export default{
    name:"Login",
    data() {
        return {
            form:{
                username:"",
                password:""
            },
            label:'right',
            rules:{
                username:[
                    {required:true,message:"输入账号",trigger:'red'}
                ],
                password:[
                     {required:true,message:"输入密码",trigger:'red'}
                ]
            }
        }
    },
    methods:{
        onSubmit(){
            this.$refs['formName'].validate((valid) => {
                // // token 信息
                // const token=Mock.Random.guid()
                // Cookie.set('token',token)
              if(valid){
                getMenu(this.form).then(({data})=>{
                    console.log(data.data.menu)
                    if(data.code==20000){
                        // 添加 token
                     
                        //  菜单权限
                        
                        this.$store.commit('menu/MENU',data.data.menu)
                        
                        this.$store.commit('menu/ROUTER',this.$router)
                        Cookie.set('token',data.data.token)
                      
                        // 路由跳转
                        this.$router.push('/home')
                    }else{
                        this.$message('账号或者密码错误');
                    }
                })
              }
            });
        }
    },
    mounted(){
      console.log(this.$router)
    }
}
</script>
<style scoped lang="less">
.box{
    width: 300px;
    height: 480px;
    margin: 200px auto;
    text-align: center;
    
  
}

</style>