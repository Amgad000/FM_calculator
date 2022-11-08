// changing themes
let themeOne = "css/theme-1.css",
  themeTwo = "css/theme-2.css",
  themeThree = "css/theme-3.css";

let themeFile = document.getElementsByTagName("link")[3];
let themeSpans = document.querySelectorAll(".theme .select span");

if (localStorage.getItem("theme")) {
  themeFile.href = localStorage.getItem("theme");
}
if (localStorage.getItem("span")) {
  themeSpans.forEach((span) => {
    span.classList.remove("active");
    if (span.dataset.theme == localStorage.getItem("span")) {
      span.classList.add("active");
    }
  });
}
themeSpans.forEach((span) => {
  span.addEventListener("click", function () {
    themeSpans.forEach((sp) => {
      sp.classList.remove("active");
    });
    span.classList.add("active");
    if (span.dataset.theme == "one") {
      themeFile.href = themeOne;
      localStorage.setItem("theme", themeOne);
      localStorage.setItem("span", span.dataset.theme);
    } else if (span.dataset.theme == "two") {
      themeFile.href = themeTwo;
      localStorage.setItem("theme", themeTwo);
      localStorage.setItem("span", span.dataset.theme);
    } else if (span.dataset.theme == "three") {
      themeFile.href = themeThree;
      localStorage.setItem("theme", themeThree);
      localStorage.setItem("span", span.dataset.theme);
    }
  });
});

// Creating the calculator
let screen = document.querySelector(".screen");
let keys = document.querySelectorAll(".keybad div");
let keysNum = document.querySelectorAll(".keybad div.num");
let keyOps = document.querySelectorAll(".keybad div.operator");
let del = document.querySelectorAll(".keybad div.del");
let reset = document.querySelectorAll(".keybad div.reset");
let equal = document.querySelectorAll(".keybad div.equal");

let operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
};

keys.forEach((key) => {
  key.onclick = function () {
    if (key.classList.contains("num") || key.classList.contains("operator")) {
      screen.value += key.innerHTML;
      // if (screen.value.length == 3 || screen.value.length == 7) {
      //   screen.value += ",";
      // }
    }
    if (key.classList.contains("equal")) {
      let reg = /(\+|\-|x|\/)/gi;
      let valOne = screen.value.split(reg)[0];
      let valTwo = screen.value.split(reg)[2];
      let operator = screen.value.split(reg)[1];
      screen.value = "";
      // console.log(operations[operator](valOne, valTwo));
      screen.value = operations[operator](+valOne, +valTwo);
    }
    if (key.classList.contains("del")) {
      let number = screen.value;
      let arr = number.split("");
      arr.pop();
      // console.log(arr.join(""));
      screen.value = arr.join("");
    }
    if (key.classList.contains("reset")) {
      screen.value = "";
    }
  };
});
