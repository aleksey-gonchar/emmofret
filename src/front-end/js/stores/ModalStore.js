import Dispatcher from '../dispatcher.js'
import ModalConstants from '../constants/ModalConstants.js'
import Backbone from 'backbone'

let schema = {
  id: 'schemas/modals',
  title: 'Modal',
  type: 'object',
  properties: {
    name: { type: 'string', required: true },
    isOpen: { type: 'string', required: true },
    isShaking: { type: 'boolean' },
    shakeStyle: { type: 'string' }
  }
}
let Model = Backbone.Model.extend({
  type: 'modal',
  schema: schema
})

let Collection = Backbone.Collection.extend({
  model: Model,

  initialize: function () {
    this.dispatchToken = Dispatcher.register(this.dispatchCallback.bind(this))
  },

  dispatchCallback: function (payload) {
    let self = this

    switch (payload.actionType) {
      case ModalConstants.SHAKE_MODAL:
        self.shake(payload.data)
        break
      case ModalConstants.SHOW_MODAL:
        self.show(payload.data)
        break
      case ModalConstants.HIDE_MODAL:
        self.hide(payload.data)
        break
      default:
        // no op
    }
  },

  getState: function () {
    return this.toJSON()
  },

  hide (modalName) {
    this.findWhere({ name: modalName }).set('isOpen', false)
  },

  shake (modalName) {
    let modal = this.findWhere({ name: modalName })
    modal.set({
      isShaking: true,
      shakeStyle: 'horizontal'
    })

    setTimeout(function () {
      modal.set('isShaking', false)
    }, 300)
  },

  show: function (modalName) {
    this.where({ isOpen: true }).forEach((modal) => {
      modal.set('isOpen', false)
    })

    this.findWhere({ name: modalName }).set('isOpen', true)
  }

})

let data = [
  {
    name: 'login',
    isOpen: false
  },
  {
    name: 'sign-up',
    isOpen: false
  }
]

let Store = new Collection(data)

export default Store
