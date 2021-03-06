const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  passagewayId: state => state.user.passagewayId,
  uid: state => state.user.uid
}
export default getters
