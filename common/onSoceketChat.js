 import Config from './config.js';
 // import User from './user.js';
 export default{
     //socket地址
      url:Config.websocket,
      //连接状态
      IsOpen:false,
      //SocketTask
      SocketTask:false,
      //是否上线（会员id绑定客户端id 验证用户身份 通过则绑定）
      IsOnline:false,
      //当前聊天对象（进入聊天页面获取）
      CurrentToUser:{
          userid:0,//判断userid是否为0，当前用户处于什么场景下
          username:"",
          userpic:""
      },
      //连接
      Open(){
          if(this.IsOpen)return;//防止重复连接
          //连接
          this.SocketTask = uni.connectSocket({
              url:this.url,
              complete:(e)=>{
				  
			  }
          });
          if(!this.SocketTask)return;
          //监听开启
          this.SocketTask.onOpen(()=>{
              //连接成功将连接状态设置为已连接
              this.IsOpen = true;
          });
          //监听消息
          this.Message();
          //监听关闭
          this.SocketTask.onClose(()=>{
              this.IsOpen = false;
            this.SocketTask = false;
          });
          //监听错误
          this.SocketTask.onError((e)=>{
              this.IsOpen=false;
            this.SocketTask = false;
          })
      
    },
	//用户绑定
	async UserBind(client_id){
		let res = await that.$api('chat.single',{
			type:'bind',
			user_id:client_id,
		},{
			header: {
				'Accept':'application/json',
				'Authorization':'Bearer '+uni.getStorageSync('access_token')
			},
		})
		console.log(res)
		//错判断
		 //成功处理
		 return this.resultUserBind(res.data)
		},
	 //监听信息
	Message(){
	    //接受服务器消息
	    this.SocketTask.onMessage((e)=>{
	    //字符串转换json
	    let res = JSON.parse(e.data);
	    /*
	    {
	        type:"bind",
	        status:true//绑定成功
	    }
	    */
	    //绑定返回结束
	if(res.type=='bind')return this.UserBind(res);//服务器返回client-id下一步执行用户绑定
	    if(res.type!=='text') return;//接受的信息不是信息就return
	    //全局通知接口
	    uni.$emit('UserChat',res);
	    //存储到chatdetail（与某用户的聊天记录）
	    this.__UpdateChatdetail(res);//（默认接受信息）
	    //更新chatlist（当前会话置顶，修改chatlist中当前会话的data和time显示
	    this.__UpdateChatlist(res);
	    //总未读数+1 修改tabbar信息数
	    //当前聊天对象与from_id不同 未读数加1
	    //只要当前用户与某一用户没有处于聊天界面时执行未读书+1
	    if(this.CurrentToUser.userid!==res.from_id){
	        this.__UpdateNoReadNum({type:"add"})
	    }
	
	 })
	     console.log('监听信息')
	},
	
	//用户绑定结果
	resultUserBind(res){
	    if(res.status && res.type=='bind'){
	        //该为上线状态
	        this.IsOnline = true;
	        //获取总未读数，并且渲染到tabbar的badge
	        this.initTabbarBadge();
	        //获取未读信息
	        // this.getChatMessages();
	        return;
	    }
	    //绑定失败，断开连接
	    uni.showToast({
	    title:res.msg,
	    icon:"none"
	    })
	    this.SocketTask.close();
	},
	
	//初始化tabber信息
	    initTabbarBadge(){
	        //获取总未读数
	        console.log('初始化tabber未读数');
	        let noreadnum = uni.getStorageSync('noreadnum'+User.userinfo.id);
	        if(noreadnum && noreadnum>0){
	            //设置tabber角标
	            return uni.setTabBarBadge({
	                index:Config.TabbarIndex,
	            text:noreadnum>99?'99+':noreadnum.toString()
	            });
	        }
	        return uni.removeTabBarBadge({
	            index:Config.TabbarIndex
	        })
	    },
		
		getChatMessages(){
		    console.log('test未读')
		    $.post('chat/get',{},{
		        header: {
		            'Accept':'application/json',
		            'Authorization':'Bearer '+uni.getStorageSync('access_token')
		        }
		    }).then(datas=>{
		        let data = datas.data.data
		    if(data.length>0){
		        for(let i = 0;i<data.length;i++){
		             let msg = data[i]
		             uni.$emit('UserChat',msg);
		             //存储到chatdetail（与某用户的聊天记录）
		             this.__UpdateChatdetail(msg);//（默认接受信息）
		             //更新chatlist（当前会话置顶，修改chatlist中当前会话的msg和time显示
		             this.__UpdateChatlist(msg);
		             //总未读数+1 修改tabbar信息数
		             //当前聊天对象与from_id不同 未读数加1
		             //    //只要当前用户与某一用户没有处于聊天界面时执行未读书+1
		             if(this.CurrentToUser.userid!==msg.from_id){
		                this.__UpdateNoReadNum({type:"add"})
		             }
		        }
		    }
		    })
		},
	
	//存储到chatdetail(与某用户的聊天记录)
	__UpdateChatdetail(res,issend = false){
	    /*发送和接受都要调用函数存储，
	    1.判断是不是发送 发送 issend=true 接受 issend=false (默认接受信息)
	    如果是发送userid = 当前要发送用户id
	    如果是接受userid = 发送消息的用户id
	    */
	    let userid = issend ? this.CurrentToUser.userid : res.from_id;
	    //获取旧数据
	    let list = uni.getStorageSync('chatdetail_'+User.userinfo.id+'_'+userid);//与某用户的聊天记录
	    list = list ? JSON.parse(list):[];
	    //追加
	    list.push(this.__format(res,{type:"chatdetail",isme:issend,olddata:list}));
	    //存储
	    uni.setStorage({
	        key:'chatdetail_'+User.userinfo.id+'_'+userid,
	    data:JSON.stringify(list)
	    })
	
	},
	
	  __format(data,options={}){

	     switch(options.type){        
	         case "chatdetail"://聊天详情记录
	         let list = options.olddata; //旧数据
	         let chattime = new Date().getTime();//获取当前时间
	         let length = list.length;
	   //       return {
	   //          isme:options.isme,
	   //          userpic:options.isme ? User.userinfo.userpic : data.from_userpic,
	   //          type:data.type,
	   //          data:data.data,
	   //          time:chattime,
	   //          gstime:chattime,
	   //          //Time.gettime.getChatTime(chattime,(length)>0)?list[length-1].time:0)
				// break;
				// 	}
			}},
			
			 //更新chatlist （将当前会话置顶，修改chatlist中当前会话的data和time显示）
			__UpdateChatlist(res){
			    //获取旧数据
			    let chatlist = uni.getStorageSync('chatlist'+User.userinfo.id);
			    chatlist = chatlist ? JSON.parse(chatlist):[];
			    //判断是否已经存在该会话 ，存在：将当前会话置顶，不存在；追加至头部
			    let index = chatlist.findIndex((item)=>{
			        //发送和接受消息的用户id
			        return item.userid == res.to_id || item.userid == res.from_id;
			
			    })
			    //不存在
			    if(index == -1){
			     let obj = this.__format(res,{type:"chatlist"}); 
			     //忽略本人发送
			     if(res.from_id!==User.userinfo.id){
			         obj.noreadnum=1;
			     }
			     chatlist.unshift(obj); 
			    }else{
			        //存在 将当前会话置顶，修改chatlist中当前会话的data和time显示
			        chatlist[index].data = res.data;
			        chatlist[index].type = res.type;
			        chatlist[index].time = res.time;
			        //当前聊天对象不是该id ,未读书加1（排除本人发送消息）
			        if(res.from_id !== User.userinfo.id && this.CurrentToUser.userid!==chatlist[index].userid){
			            chatlist[index].noreadnum++;//不处在聊天对象中
			        }
			        //置顶当前会话
			        chatlist = this.__toFirst(chatlist,index);
			    }
			    //存储到本地
			    uni.setStorage({
			        key:'chatlist'+User.userinfo.id,
			    data:JSON.stringify(chatlist)
			    })
			},
			
			switch(options,type){
			     // case "chatlist"://新增会话
			     // let obj = {
			     //     userid:data.from_id,
			     //     userpic:data.from_userpic,
			     //     username:data.from_username,
			     //     time:data.time,//最新消息时间戳
			     //     data:data.data,
			     //     noreadnum:0 //未读数
			     // };
			     // //本人发送的消息
			     // if(data.from_id == User.userinfo.id){
			     //     obj.userid = this.CurrentToUser.userid;
			     //     obj.userpic = this.CurrentToUser.userpic;
			     //     obj.username = this.CurrentToUser.username;
			     // }
			     // return obj;
			     // break;
		},	
		
		//数组置顶
		__toFirst(arr,index){
		    if(index!=0){
		        arr.unshift(arr.splice(index,1)[0]);
		    }
		    return arr;
		},
		
		__UpdateNoReadNum(options = {}){
		    //获取总未读数
		    let noreadnum = uni.getStorageSync('noreadnum'+User.userinfo.id);
		    noreadnum = noreadnum || 0;
		    //接受信息增加
		    if(options.type == 'add'){
		        noreadnum++;
		        //响铃振动提示
		        this.__Nofify();
		    }else{
		        noreadnum-=options.num;//读取信息减少 
		    }
		    noreadnum = noreadnum > 0 ? noreadnum : 0;
		    //修改tabbar信息数
		    this.__UpdateTabbarBadege(noreadnum);
		    //存储
		    uni.setStorage({
		        key:'noreadnum'+User.userinfo.id,
		    data:noreadnum
		    })
		},
		//消息提示
		__Nofify(){
		uni.vibrateLong()  
		},
		
		__UpdateTabbarBadege(num){
		    if(num && num > 0){
		        return uni.setTabBarBadge({
		            index:Config.TabbarIndex,
		        text:num > 99 ? '99+':num.toString()
		        });
		    }
		    return uni.removeTabBarBadge({
		        index:Config.TabbarIndex
		    })
		},
		
		//发送消息
		send(data){
		    //发送的格式
		    let senddata = this.__format(data,{type:"send"});
		    //存储到chatdetail
		    this.__UpdateChatdetail(senddata,true);
		    //存储到chatlist(将当前会话置顶，修改时间内容)
		    this.__UpdateChatlist(senddata);
		    //发送服务器（交由页面做）
		    return senddata;
		},
		//读取当前会话
		Read(item){
		    if(!item.noreadnum)return;
		    let chatlist = uni.getStorageSync('chatlist'+User.userinfo.id);
		    chatlist = chatlist ? JSON.parse(chatlist):[];
		    //拿到当前会话
		    let index = chatlist.findIndex((value)=>{
		        return value.userid == item.userid;
		    });
		    let oldnoreadnum = chatlist[index].noreadnum
		    //会话存在 未读消息=0
		    if(index!==-1){
		        chatlist[index].noreadnum = 0;
		        //存储
		        uni.setStorage({
		            key:"chatlist"+User.userinfo.id,
		       data:JSON.stringify(chatlist)
		        })
		        //更新tabber的角标
		        this.__UpdateNoReadNum({type:"read",num:item.noreadnum});
		    }
		},
		
		
		
		
	}