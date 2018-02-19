
export default {
  name: 'Manager Bob',
  isAdmin: true,
  changeUser: function (name, isAdmin) {
    this.name = name
    this.isAdmin = isAdmin
  }
}
