import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccBg = document.querySelector(".cc")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    amexgold: ["#c8c3a7", "#e3dec3", "#918750"],
    amexrosegold: ["#f7ded3", "#f0eae8", "#ac8f81"],
    amexplatinum: ["#b5b8ba", "#f4f5f5", "#868a8c"],
    amexblue: ["#566991", "#ccd2de", "#073982"],
    amexgreen: ["#b4deb6", "#bdc5bd", "#5a6f5b"],
    vini: ["white", "silver", "black"],
    visa: ["#436d99", "#2d57f2", "#07051B"],
    mastercard: ["#df6f29", "#c69347", "#FF3C21"],
    cielo: ["#ffffff", "#5a646e", "#00aeef"],
    elo: ["#C95C49", "#FFCB05", "#C95C49"],
    hipercard: ["#822124", "#D7474E", "#D7474E"],
    diners: ["", "blue", "silver"],
    discover: ["", "", "orange"],
    jcb: ["", "", "gold"],
    maestro: ["", "", "blue"],
    default: ["", "silver", "black"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
  ccBg.style.backgroundColor = colors[type][2]
  ccBg.style.borderRadius = "20px"
}

setCardType("vini")

globalThis.setCardType = setCardType

// Creating the masks
// expiration date
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// security code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

// card number validation
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 000000 00000",
      regex: /^34[1]\d{0,13}/,
      cardtype: "amexgold",
    },
    {
      mask: "0000 000000 00000",
      regex: /^34[2]\d{0,13}/,
      cardtype: "amexrosegold",
    },
    {
      mask: "0000 000000 00000",
      regex: /^34[3]\d{0,13}/,
      cardtype: "amexblue",
    },
    {
      mask: "0000 000000 00000",
      regex: /^34[4]\d{0,13}/,
      cardtype: "amexgreen",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[7]\d{0,13}/,
      cardtype: "amexplatinum",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^606282|^3841(?:[0|4|6]{1})0/,
      cardtype: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "discover",
    },
    {
      mask: "0000 000000 0000",
      regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
      cardtype: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:35\d{0,2})\d{0,12}/,
      cardtype: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    // console.log(foundMask)
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

// button click action
const addButton = document
  .querySelector("#add-card")
  .addEventListener("click", () => {
    alert("card added")
  })

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

// function to change the cardholder name
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  // console.log(cardHolder.value.length)
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "CHARLES FROST" : cardHolder.value
})

// function to change the cvc
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

// function to change the number
cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

// function to change the expiration date
expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .cc-expiration .value")
  ccExpiration.innerHTML = date.length === 0 ? "07/30" : date
}