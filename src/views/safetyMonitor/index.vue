<template>
  <div class="app-container">安全监测</div>
</template>

<style scoped lang="scss">

</style>
<script>
  // const net = require('net');
  export default {
    name: 'test',
    data() {
      return {

      }
    },
    sockets: {
      connect() {
        alert(1)
        console.log('socket connected')
      },
      disconnect() {
        alert(2)
      }
    },
    mounted() {
      // console.log(this.$socket)
      // this.$socket.emit('connect', function(res) {
      //   console.log(res)
      // })
      // this.$socket.emit('connect')
      // this.$soket.onopen
      // setTimeout(() => {
      //   this.$socket.emit('test', 222)
      // }, 3000);
    },
    methods: {
      onSokentMessge(val) {
        console.log(val)
      }
    }
  }
  // const client = new net.Socket();
  // client.connect(3000,'127.0.0.1',function(){
  //     console.log('已连接到服务器端。');
  //     client.write('你好。');
  // })
  // client.setEncoding('utf8');
  // console.log(net)
</script>
