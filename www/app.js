let currentQuestion = 0;
let score = 0;
let myChart = null;

const pytania = [
    { pytanie: "Ile lumenów ma typowa żarówka LED 10W?", odpowiedzi: { A: "200 lm", B: "800 lm", C: "1500 lm", D: "400 lm" }, poprawna: "B" },
    { pytanie: "Jaki jest główny cel audytu oświetlenia LED?", odpowiedzi: { A: "Zwiększenie zużycia energii", B: "Zmniejszenie kosztów energii", C: "Zmiana koloru światła", D: "Zwiększenie napięcia" }, poprawna: "B" },
    { pytanie: "Co oznacza jednostka kWh?", odpowiedzi: { A: "Moc chwilowa", B: "Napięcie", C: "Zużycie energii", D: "Natężenie prądu" }, poprawna: "C" },
    { pytanie: "Jakie dane są potrzebne do obliczenia oszczędności energii?", odpowiedzi: { A: "Kolor światła", B: "Czas świecenia i moc", C: "Marka żarówki", D: "Typ oprawy" }, poprawna: "B" },
    { pytanie: "Co oznacza ROI w kontekście modernizacji oświetlenia?", odpowiedzi: { A: "Zużycie energii", B: "Koszt instalacji", C: "Czas zwrotu inwestycji", D: "Moc światła" }, poprawna: "C" },
    { pytanie: "Która żarówka zużywa mniej energii?", odpowiedzi: { A: "Tradycyjna 60W", B: "LED 10W", C: "Halogen 50W", D: "Wszystkie tyle samo" }, poprawna: "B" },
    { pytanie: "Jaką funkcję pełni kalkulator w aplikacji?", odpowiedzi: { A: "Robi zdjęcia", B: "Liczy zużycie energii i oszczędności", C: "Zmienia kolor światła", D: "Steruje lampą" }, poprawna: "B" },
    { pytanie: "Co można porównać na wykresie w aplikacji?", odpowiedzi: { A: "Kolory światła", B: "Ceny żarówek", C: "Zużycie energii przed i po modernizacji", D: "Wielkość opraw" }, poprawna: "C" },
    { pytanie: "Dlaczego LED jest bardziej efektywny niż żarówka tradycyjna?", odpowiedzi: { A: "Ma większy rozmiar", B: "Zużywa mniej energii przy tej samej jasności", C: "Jest cięższy", D: "Działa na wyższym napięciu" }, poprawna: "B" },
    { pytanie: "Do czego służy aparat w aplikacji?", odpowiedzi: { A: "Liczenia energii", B: "Dokumentowania opraw oświetleniowych", C: "Zmiany ustawień", D: "Tworzenia wykresów" }, poprawna: "B" },
    { pytanie: "Co trzeba znać, aby obliczyć ROI?", odpowiedzi: { A: "Kolor światła", B: "Koszt inwestycji i oszczędności", C: "Typ kabla", D: "Wysokość lampy" }, poprawna: "B" },
    { pytanie: "Jakie jest główne źródło oszczędności przy LED?", odpowiedzi: { A: "Wyższa temperatura", B: "Niższe zużycie energii", C: "Większa masa", D: "Krótszy czas działania" }, poprawna: "B" },
    { pytanie: "Co oznacza lumen (lm)?", odpowiedzi: { A: "Zużycie energii", B: "Jasność światła", C: "Napięcie", D: "Czas świecenia" }, poprawna: "B" },
    { pytanie: "Jak aplikacja pomaga w audycie?", odpowiedzi: { A: "Zmienia instalację elektryczną", B: "Analizuje i oblicza dane o oświetleniu", C: "Naprawia lampy", D: "Zwiększa napięcie" }, poprawna: "B" },
    { pytanie: "Który element NIE należy do funkcji aplikacji?", odpowiedzi: { A: "Kalkulator oszczędności", B: "Wykres zużycia energii", C: "Aparat do zdjęć", D: "Sterowanie klimatyzacją" }, poprawna: "D" }
];

window.onload = () => {
    const btnStart = document.getElementById("startQuiz-btn");
    const btnNext = document.getElementById("nextQuestion-btn");
    const scoreTxt = document.getElementById("score-txt");
    const scoreNapis = document.getElementById("score-napis");
    const headerGame = document.getElementById("headerGame");

    if (btnStart) {
        btnStart.addEventListener("click", () => {
            displayQuestions(currentQuestion);
            btnStart.classList.add("hidden");
            scoreTxt.classList.remove("hidden");
            scoreNapis.classList.remove("hidden");
            headerGame.classList.add("hidden");
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (currentQuestion < pytania.length - 1) {
                currentQuestion++;
                displayQuestions(currentQuestion);
                resetQuizButtonsClasslist();
            } else {
                scoreTxt.innerText = `Koniec quizu! Twój wynik to: ${score} / ${pytania.length}`;
                btnNext.classList.add("hidden");
                document.getElementById("question-txt").innerText = "Dziękujemy za udział!";
                document.querySelector(".question-grid").classList.add("hidden"); 
            }
        });
    }

    document.querySelectorAll('[data-odpowiedz]').forEach(btn => {
        btn.addEventListener('click', () => {
            const wszystkiePrzyciski = document.querySelectorAll('[data-odpowiedz]');
            wszystkiePrzyciski.forEach(b => b.disabled = true);

            const selectedAns = btn.textContent.slice(0, 1);
            const rightAns = pytania[currentQuestion].poprawna;
            if (selectedAns === rightAns) {
                btn.classList.add("poprawna");
                score += 1;
                scoreTxt.textContent = score;
            } else {
                btn.classList.add("zla");
            }
        });
    });

    const canvas = document.getElementById('ledCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffc409';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2 - 10, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#666';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Tu będzie animacja HTML5 Canvas', canvas.width / 2, canvas.height - 15);
    }

    const savedData = localStorage.getItem('ledCalcData');
    const oldWInput = document.getElementById('oldW');
    if (savedData && oldWInput) {
        const data = JSON.parse(savedData);
        document.getElementById('oldW').value = data.oldW;
        document.getElementById('newW').value = data.newW;
        document.getElementById('hours').value = data.hours;
        document.getElementById('price').value = data.price;
    }

    const input = document.getElementById("cameraInput");
    if (input) {
        input.addEventListener("change", function () {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageData = e.target.result;
                    let arr = JSON.parse(localStorage.getItem("savedArrWithImages")) || [];
                    arr.push(imageData);
                    localStorage.setItem("savedArrWithImages", JSON.stringify(arr));
                    renderGallery();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const modal = document.getElementById("image-modal");
    const closeModal = document.getElementById("close-modal");

    if (closeModal && modal) {
        closeModal.addEventListener("click", function() {
            modal.classList.add("modal-hidden");
            modal.classList.remove("modal-visible");
        });

        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                modal.classList.add("modal-hidden");
                modal.classList.remove("modal-visible");
            }
        });
    }
// przeliczanie jednostek
const options = [
{
    id: 1,
    name: 'W -> Lm',
},
{
    id: 2,
    name: 'Lm -> W',
},
{
    id: 3,
    name: 'Lm & m2 -> Lx',
},
];

const compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const selectEl = document.querySelector('ion-select');
selectEl.compareWith = compareWithFn;

options.forEach((option, i) => {
    const selectOption = document.createElement('ion-select-option');
    selectOption.value = option;
    selectOption.textContent = option.name;
    selectEl.appendChild(selectOption);
});  
const calcUI = document.getElementById("calc-ui");
const calculateBtn = document.getElementById("calculat-unit-btn");
const input1 = document.getElementById("input1-btn");
const input2 = document.getElementById("input2-btn");
const convOutput = document.getElementById("outputConv");
selectEl.addEventListener('ionChange', () => {
  calcUI.classList.remove("hidden");
  input1.value = "";
  input2.value = "";
  convOutput.value = "";
  switch (selectEl.value.id) {
      case 1:
          input1.placeholder = "Wartość W";
          input2.placeholder = "Skuteczność";
          break;
      case 2:
          input1.placeholder = "Wartość Lm";
          input2.placeholder = "Skuteczność";
          break;
      case 3:
          input1.placeholder = "Wartość Lm";
          input2.placeholder = "Wartość m2";
          break;
  }
});
calculateBtn.addEventListener("click", () => {
  let val1 = parseFloat(input1.value);
  let val2 = parseFloat(input2.value);
  let res = 0;
  switch (selectEl.value.id) {
      case 1:
          res = val1 * val2;
          convOutput.value = res + " Lm";
          break;
      case 2:
          res = val1 / val2;
          convOutput.value = res.toFixed(2) + " W";
          break;
      case 3: 
          res = val1 / val2;
          convOutput.value = res.toFixed(2) + " Lx";
          break;
  }
});}
function resetQuizButtonsClasslist() {
    document.querySelectorAll('[data-odpowiedz]').forEach(btn => {
        btn.classList.remove("poprawna");
        btn.classList.remove("zla");
        btn.disabled = false;
    });
}

function calculateROI() {
    const oldW = parseFloat(document.getElementById('oldW').value);
    const newW = parseFloat(document.getElementById('newW').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const price = parseFloat(document.getElementById('price').value);

    if (isNaN(oldW) || isNaN(newW) || isNaN(hours) || isNaN(price)) {
        alert("Proszę wypełnić wszystkie pola poprawnymi wartościami liczbowymi.");
        return;
    }

    const calcData = { oldW, newW, hours, price };
    localStorage.setItem('ledCalcData', JSON.stringify(calcData));

    const oldYearlyCost = ((oldW * hours) / 1000) * 365 * price;
    const newYearlyCost = ((newW * hours) / 1000) * 365 * price;
    const yearlySavings = oldYearlyCost - newYearlyCost;

    const resultsDiv = document.getElementById('results');
    const saveText = document.getElementById('saveText');

    if (resultsDiv && saveText) {
        resultsDiv.style.display = 'block';
        saveText.innerHTML = `
            Roczny koszt starej żarówki: <strong>${oldYearlyCost.toFixed(2)} PLN</strong><br>
            Roczny koszt żarówki LED: <strong>${newYearlyCost.toFixed(2)} PLN</strong><br>
            Roczna oszczędność: <strong style="color: #2dd36f;">${yearlySavings.toFixed(2)} PLN</strong>
        `;
    }
    drawChart(oldYearlyCost, newYearlyCost);
}

function drawChart(oldCost, newCost) {
    const chartCanvas = document.getElementById('chartCanvas');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    if (myChart != null) {
        myChart.destroy();
    }

    if (typeof Chart !== 'undefined') {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Stara żarówka', 'Zamiennik LED'],
                datasets: [{
                    label: 'Roczny koszt (PLN)',
                    data: [oldCost, newCost],
                    backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(45, 211, 111, 0.7)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(45, 211, 111, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

function displayQuestions(inddex) {
    const pyt = pytania[inddex];
    const trescPytania = document.getElementById("question-txt");
    if (trescPytania) {
        trescPytania.textContent = pyt.pytanie;
    }

    document.querySelectorAll('[data-odpowiedz]').forEach(btn => {
        const litera = btn.dataset.odpowiedz;
        btn.textContent = `${litera}: ${pyt.odpowiedzi[litera]}`;
    });
}

function openCamera() {
    const input = document.getElementById("cameraInput");
    if (input) input.click();
}

function renderGallery() {
    const galleryContainer = document.getElementById("gallery-container");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    let arr = JSON.parse(localStorage.getItem("savedArrWithImages")) || [];

    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    arr.forEach(function(imageData) {
        const imgElement = document.createElement("img");
        imgElement.src = imageData;
        
        imgElement.addEventListener("click", function() {
            if (modalImg && modal) {
                modalImg.src = this.src; 
                modal.classList.remove("modal-hidden");
                modal.classList.add("modal-visible");
            }
        });
        
        galleryContainer.appendChild(imgElement);
    });
}
// symulator barwy swiatla
const kelvinSlider = document.getElementById('kelvin-slider');
const cssBulb = document.getElementById('css-bulb');
const kelvinDisplay = document.getElementById('kelvin-display');
const kelvinDescription = document.getElementById('kelvin-description');

function updateLightColor(kelvin) {
    let r, g, b;
    let description = "";

    if (kelvin < 3300) {
        r = 255;
        g = 214 + ((kelvin - 2700) / 600) * 30; 
        b = 170 + ((kelvin - 2700) / 600) * 50; 
    } else if (kelvin < 5300) {
        r = 255;
        g = 244 + ((kelvin - 3300) / 2000) * 11; 
        b = 220 + ((kelvin - 3300) / 2000) * 35; 
    } else {
        r = 255 - ((kelvin - 5300) / 1200) * 30; 
        g = 255;
        b = 255;
    }

    const rInt = Math.round(r);
    const gInt = Math.round(g);
    const bInt = Math.round(b);

    if(kelvinDisplay) kelvinDisplay.innerText = `${kelvin} K`;
    if(kelvinDescription) kelvinDescription.innerText = description;
    
    if (cssBulb) {
        cssBulb.style.backgroundColor = `rgb(${rInt}, ${gInt}, ${bInt})`;
        cssBulb.style.boxShadow = `
            0 0 50px 20px rgba(${rInt}, ${gInt}, ${bInt}, 0.6), 
            0 0 100px 40px rgba(${rInt}, ${gInt}, ${bInt}, 0.2)
        `;
    }
}

if (kelvinSlider) {
    kelvinSlider.addEventListener('ionInput', (e) => {
        updateLightColor(e.target.value);
    });
    

    updateLightColor(kelvinSlider.value || 4000);
}
let selectValue = document.querySelector('ion-select');
selectValue.addEventListener('ionChange', (e) => {
    //console.log(`${e.detail.value}`);
  });
