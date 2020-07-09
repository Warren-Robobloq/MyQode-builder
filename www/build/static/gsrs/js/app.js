'use strict';

var SEP = {};
SEP.Node = {};
SEP.ele ={};
SEP.App ={};
SEP.ai ={};
var LOCAL ={};
var SY ={};
SY.Client = 'pc';
SEP.os ={};
SEP.os.version = "1.3.10" ; //version
SEP.os.type = 1 ; // electron:1 ; web: 2; PC调用 GO接口： 3；（自动修正值，不用改）

SEP.appInit = function () {
    try {
        SEP.initType();
        if( SEP.os.type !== 2){
            SEP.initSerial();
            SEP.initOther();
        }
    }
    catch (error) {
        console.error(error);
    }
};

SEP.initSerial = function () {
    try {
        SEP.SerialPort = require('serialport');
        SEP.Avrgirl = require('avrgirl-arduino');
        SEP.avrpizza = require('avr-pizza');
        SEP.write = function (port,hexData,back) {
            try{
                //console.log('发送：' + hexData);
                var buffer = new Buffer(hexData, "hex");
                port.write(buffer, function (err) {
                    if (err) {
                        return console.log('Error: ', err.message)
                    }
                })
                ;
            }catch (error){console.error(error);}
        }
    }
    catch (error) {

        console.error("SEP.initSerial ",error);
    }
};
SEP.initType =function() {
    try{
        SEP.Node.os = require('os');
    }catch(error){
        if(SEP.os.type == 1 )SEP.os.type = 2 ;//自动修正参数
    }
}
SEP.initOther =function() {
    const EventEmitter = require('events');
    class MyEmitter extends EventEmitter {};
    SEP.Node.process = process;
    SEP.Node.fs = require('fs');
    SEP.Node.http = require('http');
    SEP.Node.exec = require("child_process").exec;
    SEP.Node.execSync = require("child_process").execSync;
    SEP.Node.spawn = require("child_process").spawn;
    SEP.Node.process = process;
    //SEP.Node.os = require('os');
    SEP.Node.emitter = new MyEmitter();
    const {shell, remote, ipcRenderer} = require('electron');
    const isDev = require('electron-is-dev');
    SEP.ele.isDev = isDev;
    SEP.ele.shell =shell;
    SEP.ele.remote = remote;
    SEP.ele.ipcRenderer = ipcRenderer;
    SEP.Node.request = require('request');
    SEP.Node.ncp = require('ncp').ncp;
    SEP.Node.mkdirp = require('mkdirp');
    //SEP.Node.baiduAi = require("../node/baidu-ai").speech;
    let dir = '';
    if (__dirname.indexOf('app.asar') !== -1) {
        const reg = /app.asar.+$/g;
        dir = __dirname.replace(reg, '');
    } else {
        dir = `${__dirname}/../`;
    }
    SEP.ele.dir = `${dir}`;

};

SEP.appInit();

//myserial

//gsApp
