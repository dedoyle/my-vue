import MyVue from '../source/index'

let vm = new MyVue({
  el: '#app',
  data() {
    return {
      message: '大家好',
      wife: {
        name: 'angelababy',
        age: 28,
      },
      list: [{ id: 1, name: 'apple' }],
    }
  },
})
// vm._data.message = '迪丽日巴'
// vm._data.wife = {
//   name: '迪丽热巴',
//   age: 30,
// }
// vm.wife.name = '萨瓦迪卡'
// vm.list = [1]
// vue2 这个是无法监听的，只能通过 this.$set
// vm.list[0] = {id: 1, name: 'orange'}
// vm.list.push({ id: 2, name: 'banana' })
// vm.list[1].name = 'perl'
