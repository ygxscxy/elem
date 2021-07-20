/* 启动node.js接口服务：node app.js */
const express = require('express')
const url = require('url')
var app = express()
//引入中间件
const bodyParser = require('body-parser')

// 请求体解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 解决跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})


// 写入json文件
var fs = require('fs')

app.get('/api/homeSwipe', (req, res) => {
  res.json(require('./datas/homeSwipe.json'))
})

// 处理get请求
app.get('/api/citylist', (req, res) => {
  res.json(require('./datas/cityName.json'))
})

app.get('/api/foodtype', (req, res) => {
  res.json(require('./datas/home.json'))
})

app.get('/api/filter', (req, res) => {
  res.json(require('./datas/HomeFilter.json'))
})

function addUser(phone) {
  //现将json文件读出来
  fs.readFile('./datas/usersAddress.json', function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);//将字符串转换为json对象
    person[phone] = {
      id: phone,
      myAddress: []
    }
    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./datas/usersAddress.json', str, function (err) {
      if (err) {
        console.error(err);
      }
    })
  })
}

app.get('/api/login', (req, res) => {
  let parseObj = url.parse(req.url, true)
  let { phone } = parseObj.query
  if (require('./datas/usersAddress.json')[phone]) {
    let data = require('./datas/usersAddress.json')[phone]
    res.json(data ? data : null)
  } else {
    console.log(parseObj.query.phone);
    addUser(parseObj.query.phone)
    let data = require('./datas/usersAddress.json')[parseObj.query.phone]
    res.json(data ? data : null)
  }
})


app.get('/api/list', (req, res) => {
  // /api/list?offset=0&len=8
  /* 通过offset和len切割数据返回前台 */
  let parseObj = url.parse(req.url, true)
  let { offset, len } = parseObj.query
  offset = parseInt(offset)
  len = parseInt(len)
  const totalResult = require('./datas/list.json').items
  const sliceResult = totalResult.slice(offset, offset + len)
  const data = { data: sliceResult, total: totalResult.length }
  res.json(data)
})

app.get('/api/detail', (req, res) => {
  let parseObj = url.parse(req.url, true)
  let { id } = parseObj.query
  const data = require('./datas/detail.json')[id]
  res.json(data ? data : null)
})

app.get('/api/comments', (req, res) => {
  const data = require('./datas/comments.json')
  res.json(data ? data : null)
})

app.get('/api/merchants', (req, res) => {
  const data = require('./datas/merchants.json')
  res.json(data ? data : null)
})


app.get('/api/searchGoods', (req, res) => {
  let parseObj = url.parse(req.url, true)
  let { name } = parseObj.query
  const totalResult = require('./datas/search.json').data

  let data = totalResult.filter((val) => {
    return val.name.includes(name)
  })
  res.json(data ? data : null)
})




function writeJson(params, id) {
  //现将json文件读出来
  fs.readFile('./datas/usersAddress.json', function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();//将二进制的数据转换为字符串
    person = JSON.parse(person);//将字符串转换为json对象
    person[id]["myAddress"].push(params);//将传来的对象push进数组对象中
    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./datas/usersAddress.json', str, function (err) {
      if (err) {
        console.error(err);
      }
      // console.log('----------新增成功-------------');
    })
  })
}

const data = {
  status: 200,
  msg: "添加地址成功"
}
// 添加收货地址
app.post('/api/addaddress/:id', (req, res) => {
  // console.log(req.body);
  writeJson(req.body, req.params.id)
  res.json(data ? data : null);
});
// 获取所有收获地址
app.get('/api/getalladdress', (req, res) => {
  let parseObj = url.parse(req.url, true)
  let { user_id } = parseObj.query
  const totalResult = require('./datas/usersaddress.json')[user_id]
  res.json(totalResult ? totalResult : null)
})


// 删除json文件 传入要删除的
function deleteJson(user_id, address_id) {
  fs.readFile('./datas/usersAddress.json', function (err, data) {
    if (err) {
      return console.error(err);
    }
    var person = data.toString();
    person = JSON.parse(person);
    //把数据读出来删除
    const address_item = person[user_id]
    for (var i = 0; i < address_item['myAddress'].length; i++) {
      if (address_id == address_item['myAddress'][i].id) {
        //console.log(person.data[i])
        address_item['myAddress'].splice(i, 1);
      }
    }
    person.total = address_item['myAddress'].length;
    var str = JSON.stringify(person);
    //然后再把数据写进去
    fs.writeFile('./datas/usersAddress.json', str, function (err) {
      if (err) {
        console.error(err);
        return { status: 400, 'msg': "删除失败" }
      }
    })
  })
  return { status: 200, msg: "删除成功" }
}

// 传递一个用户id，和一个地址id
app.get('/api/deleteaddress', (req, res) => {
  let parseObj = url.parse(req.url, true)
  let { user_id, address_id } = parseObj.query
  console.log(user_id, address_id);
  console.log(user_id, address_id);
  let data = deleteJson(user_id, address_id)
  res.json(data ? data : null)
})

const { fork } = require('child_process');

// node监听本地文件发生变化，重新启动服务
async function kill(child, callback) {
  if (process.platform === "win32") {
    const _child = execa('taskkill /pid ' + child.pid + ' /T /F', [], {
      shell: true,
      cwd
    });
    try {
      await _child;
    } catch (e) {
      console.log('error: ', e);
    }
    callback();
  } else {
    child.kill();
    callback();
  }
}

function fangdou(func, timeout) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this)
    }, timeout)
  }
}

const restart = fangdou(() => {
  console.log('准备重启中...')
  kill(child, () => {
    startTask()
  })
}, 500)
fs.watch('./datas/usersAddress.json', restart);

function changeJson(id, params) {
  fs.readFile('./datas/usersAddress.json', function (err, data) {
    if (err) {
      console.error(err);
    }
    var person = data.toString();
    person = JSON.parse(person);
    //把数据读出来,然后进行修改
    for (var i = 0; i < person[id]['myAddress'].length; i++) {
      if (params.id == person[id]['myAddress'][i].id) {
        for (var key in params) {
          if (person[id]['myAddress'][i][key]) {
            person[id]['myAddress'][i][key] = params[key];
          }
        }
      }
    }
    person.total = person[id]['myAddress'].length;
    var str = JSON.stringify(person);
    //console.log(str);
    fs.writeFile('./datas/usersAddress.json', str, function (err) {
      if (err) {
        console.error(err);
        return { status: 400, msg: "修改失败" }
      } else {
        return { status: 200, msg: "修改成功" }
      }
    })
  })
  return { status: 200, msg: "修改成功" }

}


// 更新收货地址
app.post('/api/updateaddress', (req, res) => {
  let { user_id, data } = req.body
  console.log(user_id, data);
  let res222 = changeJson(user_id, data)
  res.json(res222 ? res222 : null)
})

// 开启监听
app.listen(4000, () => {
  console.log('4000端口已经启动')
})
