//Form control as a class to handle all form data and form actions
export default class FormControl {
    constructor() {
        this.name;
        this.surname;
        this.phone;
        this.legal;
        this.email;
        this.comment;
        this.querySelectors = {
            name : document.querySelector("#contact-form #name"),
            surname : document.querySelector("#contact-form #surname"),
            phone : document.querySelector("#contact-form #phone"),
            legal : document.querySelector("#contact-form #legal"),
            email : document.querySelector("#contact-form #email")
        }
    }

    //Init method that will create all events on the form and all validators for each input
    initEvents() {
        for (const query in this.querySelectors) {
            this.querySelectors[query].addEventListener("blur", () => {
                if (!this.querySelectors[query].value) {
                    this.querySelectors[query].className = "error";
                }
            });

            this.querySelectors[query].addEventListener("keyup", () => {
                this.querySelectors[query].className = "";
                if (!this.querySelectors[query].value.length) {
                    this.querySelectors[query].className = "error";
                } else {
                    this.querySelectors[query].className = "valid";
                }
               
                if (query === "phone") {
                    const phoneRegex = /^\d{9}$/;
                    this.querySelectors[query].value.match(phoneRegex) ? this.querySelectors[query].className = "valid" : this.querySelectors[query].className = "error";
                }

                if (query === "email") {
                    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    this.querySelectors[query].value.match(emailRegex) ? this.querySelectors[query].className = "valid" : this.querySelectors[query].className = "error";
                }
            });

            this.querySelectors.legal.addEventListener("change", () => {
                this.querySelectors.legal.className = "valid";
                this.querySelectors.legal.nextElementSibling.className = "";
            });

        }
    }

    //Method that will handle actions after submitting form, checking first for empty inputs and then displaying the errors to be fixed
    //When all inputs are valid, save them in the class and commit them.
    handleSubmit() {
        const errorContainer = document.querySelector("#contact-form .errors");
        const ul = document.createElement("ul");
        errorContainer.style.display = "none";

        for (const query in this.querySelectors) {
            if (!this.querySelectors[query].value && query !== "legal") {
                this.querySelectors[query].className = "error";
            }           

            if (query === "legal" && !this.querySelectors[query].checked) {
                this.querySelectors[query].className = "error";
                this.querySelectors[query].nextElementSibling.className = "error-label";
            }
        }

        while (errorContainer.firstChild) {
            errorContainer.removeChild(errorContainer.firstChild);
        }

        for (const query in this.querySelectors) {
            if (this.querySelectors[query].classList.contains("error")) {
                const li = document.createElement("li");
                if (query === "name") {
                    li.innerHTML = `Por favor introduzca su nombre.`;
                }
                if (query === "surname") {
                    li.innerHTML = `Por favor introduzca su apellido.`;
                }
                if (query === "phone") {
                    li.innerHTML = `Por favor introduzca un número de teléfono de 9 dígitos.`;
                }
                if (query === "legal") {
                    li.innerHTML = `Por favor acepte el Aviso Legal.`;
                }
                if (query === "email") {
                    li.innerHTML = `Por favor introduzca un correo electrónico válido.`;
                }
                ul.appendChild(li);
                errorContainer.appendChild(ul);
                errorContainer.style.display = "block";
            } else {
                if (query === "name") {
                    this.name = this.querySelectors[query].value;
                }
                if (query === "surname") {
                    this.surname = this.querySelectors[query].value;
                }
                if (query === "phone") {
                    this.phone = this.querySelectors[query].value;
                }
                if (query === "legal") {
                    this.legal = this.querySelectors[query].value;
                }
                if (query === "email") {
                    this.email = this.querySelectors[query].value;
                }
            }
        }

        if (this.name && this.surname && this.phone && this.legal && this.email) {
            this.comment = document.querySelector("#contact-form #comment").value;

            while (errorContainer.firstChild) {
                errorContainer.removeChild(errorContainer.firstChild);
            }

            const submitBtn = document.querySelector("#contact-form button");
            const spinner = document.createElement("div");
            submitBtn.disabled = true;
            spinner.className = "spinner";
            submitBtn.replaceChild(spinner,submitBtn.childNodes[0]);
            this._commit();
            //Time out to simulate sending data
            setTimeout(() => submitBtn.innerHTML = `¡Gracias!`,2000)
           
        }
    }

    //The data from the class is saved as json and would be ready to be sent.
    _commit() {
        const data = JSON.stringify({"name": this.name, "surname": this.surname, "phone": this.phone, "legal": this.legal, "email": this.email, "comment": this.comment });
        console.log(data);
    }
}