import { makeAutoObservable } from "mobx"

export default class BasketStore {
  constructor() {
    this._items = []

    makeAutoObservable(this)
  }
  pushItem(item) {
    this._items.push(item)
  }
  removeItem(item) {
    this._items.filter((i) => i.id !== item.id)
  }
  setItems(items) {
    this._items = items
  }

  get items() {
    return this._items
  }
}
