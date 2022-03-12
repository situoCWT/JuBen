/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-03-09 21:46:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-03-11 00:05:25
 */

const ws = require('nodejs-websocket')
let jubenList = require('./jubenList.json')

let users = new Set();//所有连接的用户
let rooms = [];//当前有什么房间
let juben = null;//剧本信息

let server = ws.createServer(connection => {
    connection.on('text', function(result) {
        let data = JSON.parse(result);
        if(data.type && data.type == 'connect'){
            users.add(data.msg)
        }
        else if(data.type && data.type == 'createRoom'){
            //开一个房间
            jubenList.forEach((item)=>{
                if(item.name == data.name){
                    juben = item;
                    juben.createUser = data.user;
                    juben.onlineUsers.push({user:data.user,status:'在线'})
                    rooms.push(juben)
                }
            })
            console.log(rooms)
            connection.sendText(JSON.stringify({msg:juben,type:'update'}))
            server.connections.forEach((item)=>{
                item.sendText(JSON.stringify({msg:data.user + '加入房间',type:'info'}))
            })
        }
        else if(data.type && data.type == 'join'){
            if(!juben){
                //开一个房间
                jubenList.forEach((item)=>{
                    if(item.name == data.name){
                        juben = item;
                    }
                })
            }
            connection.sendText(JSON.stringify({msg:juben,type:'update'}))
            server.connections.forEach((item)=>{
                item.sendText(JSON.stringify({msg:data.user + '加入房间',type:'info'}))
            })
        }else if(data.type && data.type == 'selectUser'){
            juben.userList.forEach((item,index)=>{
                if(item.name == data.person){
                    if(item.user == '选择'){
                        juben.userList[index].user = data.user;
                        server.connections.forEach((item)=>{
                            item.sendText(JSON.stringify({
                                msg:data.user + '选择了角色' + data.person,
                                type:'userSelect',
                                data:juben
                            }))
                        })
                        //判断是不是所有角色都被选择了
                        let allSelect = true;
                        juben.userList.forEach((citem,cindex)=>{
                            if(citem.user == '选择'){
                                allSelect = false;
                            }
                        })
                        if(allSelect){
                            //开始剧本游戏
                            console.log('开始剧本游戏')
                        }
                    }else{
                        connection.sendText(JSON.stringify({
                            msg:'角色已被' + juben.userList[index].user + '选择',
                            type:'error',
                        }))
                    }
                }
            })
        }else if(data.type && data.type == 'getRoom'){
            connection.sendText(JSON.stringify({
                msg:JSON.stringify(rooms),
                type:'getRoom',
            }))
        }else if(data.type && data.type == 'checkInRoom'){
            let sign = false;
            rooms.forEach((item)=>{
                item.onlineUsers.forEach((citem)=>{
                    if(citem.user == data.user && citem.status == '在线'){
                        sign = true;
                        return
                    }
                })
                if(sign){
                    return 
                }
            })
            connection.sendText(JSON.stringify({
                msg:sign,
                type:'checkInRoom',
            }))
        }
        else if(data.type && data.type == 'exitRoom'){
            rooms.forEach((item,index)=>{
                item.onlineUsers.forEach((citem,cindex)=>{
                    if(citem.user == data.user){
                        rooms[index].onlineUsers[cindex].status = '离线'
                    }
                })
            })
        }
        else if(data.type && data.type == 'haertBeat'){
            connection.sendText('ok')
        }
    })
    connection.on('connect', function(code) {
        console.log('开启连接', code)
    })
    connection.on('close', function(code) {
        console.log('关闭连接', code)
        //判断是不是全部离开，是的话重置剧本
    })
    connection.on('error', function(code) {
        // console.log('异常关闭', code)
    })
}).listen(2333);
    