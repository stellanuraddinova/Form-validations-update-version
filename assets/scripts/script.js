const form = document.querySelector("#form");
const formContent = document.querySelector('#formContent')

const formObject = [
    {type: 'input', name: 'name', label: 'Name'},
    {type: 'input', name: 'surname', label: 'Surname'},
    {type: 'input', name: 'phone', label: 'Phone'},
    {type: 'input', name: 'email', label: 'Email'},
    {type: 'input', name: 'password', label: 'Password'},
    {type: 'input', name: 'rpassword', label: 'Repeat Password'},
]

const errorMessage = (element, message) => {
  element.classList.add("border-red-500");
  element.parentElement.insertAdjacentHTML(
    "beforeend",
    `<p class="mt-[3px] text-[#FE3737] text-sm"> ${message}</p>`
  );
};

const removeErrorMessage = (element) => {
  if (element.parentElement.querySelector("p")) {
    element.parentElement.querySelector("p").remove();
    element.classList.remove("border-red-500");
    return false;
  }
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const handleSubmit = (values) => {
  console.log(values);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let values = {};
  let error = 0;
  for (let element of e.target.elements) {
    removeErrorMessage(element);
    if (element.tagName !== "BUTTON") {
      const value = element.value.trim();
      const message = element.getAttribute("data-message");
      const max = element.getAttribute("data-max");
      const same = element.getAttribute("data-same");
      values[element.name] = value;
      if (!value) {
        errorMessage(element, message);
        error++;
      } else if (max) {
        if (value.length > parseInt(max)) {
          errorMessage(element, `Max ${max} symbol`);
          error++;
        }
      } else if (element.name === "email" && !validateEmail(value)) {
        errorMessage(element, "Write the email format correctly ");
        error++;
      } else if (same) {
        const sameInput = form.querySelector(`[name = "${same}"]`);
        if (
          sameInput &&
          sameInput.value.toString().toLowerCase() !== value.toLowerCase()
        ) {
          errorMessage(element, "Password doesn't match");
          error++;
        }
      }
    }
  }
  if (!error) {
    handleSubmit(values);
  }
});


// const formStart = () => {
//     for (let el of formObject){
//         formContent.insertAdjacentHTML('afterbegin', `
//                 <div class="mb-[10px]">
//                     <label class="flex text-[16px] font-bold mb-[5px]" for="">${el.label}</label>
//                     <input data-max="10" data-message="Please enter name" name="name"
//                         class="border w-full p-[5px] h-[40px] rounded" type="text">
//                 </div>
//             `)
//     }
// }
// formStart();
const formStart = () => {
    for (let el of formObject){
        formContent.innerHTML += (`
                <div class="mb-[10px]">
                    <label class="flex text-[16px] font-bold mb-[5px]" for="">${el.label}</label>
                    <input data-max="10" data-message="Please enter name" name="name"
                        class="border w-full p-[5px] h-[40px] rounded" type="text">
                </div>
            `)
    }
}
formStart();