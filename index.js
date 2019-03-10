const alphaPos = new AlphaPos()
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')

// 新增訂單
addDrinkButton.addEventListener('click', function () {
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')

  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  const drink = new Drink(drinkName, sugar, ice)

  alphaPos.addDrink(drink)
})

// 刪除訂單
orderLists.addEventListener('click', function (event) {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

// 結帳&清空訂單
checkoutButton.addEventListener('click', function () {
  alert(`Total amount of drinks:$${alphaPos.checkout()}`)
  // 清空訂單
  alphaPos.clearOrder(orderLists)
})

function AlphaPos() { }
// 選取客人的需求function
AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

// 增加訂單function
AlphaPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
  <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">x</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>

    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">
        $ <span data-drink-price>${drink.price()}</span>
      </div>
    </div>
  </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

// 刪除訂單function
AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

// 結算總金額function
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(function (drink) {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

// 清空訂單function
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(function (card) {
    card.remove()
  })
}


function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green':
      return 50
    case 'Matcha Latte':
    case 'Black Tea Latte':
      return 55
    default:
      alert('No this drink')
  }
}