const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "AIR FORCE",
    price: 119,
    desc: "eaque molestiae doloribus aspernatur enim vero quis similique minus",
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "JORDAN",
    price: 109,
    desc: "eaque molestiae doloribus aspernatur enim vero quis similique minus",
    colors: [
      {
        code: "gray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "BLAZER",
    price: 115,
    desc: "eaque molestiae doloribus aspernatur enim vero quis similique minus",
    colors: [
      {
        code: "white",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "CRATER",
    price: 99,
    desc: "eaque molestiae doloribus aspernatur enim vero quis similique minus",
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "white",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "HIPPIE",
    price: 89,
    desc: "eaque molestiae doloribus aspernatur enim vero quis similique minus",
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductDesc = document.querySelector(".productDesc");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change text of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$ " + choosenProduct.price;
    currentProductDesc.textContent = choosenProduct.desc;
    currentProductImg.src = choosenProduct.colors[0].img;

    //Passing colors for each item
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

//
//
// Card Input

input_credit_card = function (jQinp) {
  var format_and_pos = function (input, char, backspace) {
    var start = 0;
    var end = 0;
    var pos = 0;
    var value = input.value;

    if (char !== false) {
      start = input.selectionStart;
      end = input.selectionEnd;

      if (backspace && start > 0) {
        // handle backspace onkeydown
        start--;

        if (value[start] == " ") {
          start--;
        }
      }
      // To be able to replace the selection if there is one
      value = value.substring(0, start) + char + value.substring(end);

      pos = start + char.length; // caret position
    }

    var d = 0; // digit count
    var dd = 0; // total
    var gi = 0; // group index
    var newV = "";
    var groups = /^\D*3[47]/.test(value) // check for American Express
      ? [4, 6, 5]
      : [4, 4, 4, 4];

    for (var i = 0; i < value.length; i++) {
      if (/\D/.test(value[i])) {
        if (start > i) {
          pos--;
        }
      } else {
        if (d === groups[gi]) {
          newV += " ";
          d = 0;
          gi++;

          if (start >= i) {
            pos++;
          }
        }
        newV += value[i];
        d++;
        dd++;
      }
      if (d === groups[gi] && groups.length === gi + 1) {
        // max length
        break;
      }
    }
    input.value = newV;

    if (char !== false) {
      input.setSelectionRange(pos, pos);
    }
  };

  jQinp
    .keypress(function (e) {
      var code = e.charCode || e.keyCode || e.which;

      // Check for tab and arrow keys (needed in Firefox)
      if (
        code !== 9 &&
        (code < 37 || code > 40) &&
        // and CTRL+C / CTRL+V
        !(e.ctrlKey && (code === 99 || code === 118))
      ) {
        e.preventDefault();

        var char = String.fromCharCode(code);

        // if the character is non-digit
        // -> return false (the character is not inserted)

        if (/\D/.test(char)) {
          return false;
        }

        format_and_pos(this, char);
      }
    })
    .keydown(function (
      e // backspace doesn't fire the keypress event
    ) {
      if (e.keyCode === 8 || e.keyCode === 46) {
        // backspace or delete
        e.preventDefault();
        format_and_pos(this, "", this.selectionStart === this.selectionEnd);
      }
    })
    .on("paste", function () {
      // A timeout is needed to get the new value pasted
      setTimeout(function () {
        format_and_pos(jQinp[0], "");
      }, 50);
    })
    .blur(function () // reformat onblur just in case (optional)
    {
      format_and_pos(this, false);
    });
};

input_credit_card($("#credit-card"));
