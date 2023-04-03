const api_key = ""; //! Your Api KEY
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

// elements 

const currency_one = document.getElementById("currency_one")
const currency_two = document.getElementById("currency_two")

const list_one = document.querySelector("#list_one")
const list_two = document.querySelector("#list_two")

const amount = document.querySelector("#amount")

const buttonCalc = document.querySelector("#calculate")
const result = document.querySelector("#result")

fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options;
        for(let item of items){
        options += `<option value="${item[0]}">${item[1]}</option>`
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    });

    buttonCalc.addEventListener("click" , function(){
        const from = currency_one.value;
        const fromTo = currency_two.value;
        const amountValue = amount.value;

        fetch(url + "/latest/" + from)
            .then(res => res.json())
            .then(data => {
                const success = (data.conversion_rates[fromTo] * amountValue).toFixed(2)
                result.innerHTML = `<div class="card border-primary">
                        <div class="card-body text-center" style="font-size: 30px;">
                            ${amountValue} ${from}= ${success} ${fromTo}
                        </div>
                    </div>`
            })
    })
