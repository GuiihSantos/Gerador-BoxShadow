class BoxShadowGenerator {
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    bluer,
    bluerRef,
    spread,
    spreadRef,
    previewBox,
    rule,
    webkitRule,
    mozRule,
    rulesArea
  ) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.bluer = bluer;
    this.bluerRef = bluerRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
    this.rulesArea = rulesArea;
  }

  initialize() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.bluerRef.value = this.bluer.value;
    this.spreadRef.value = this.spread.value;

    this.applyRule();
    this.showRule();
  }

  applyRule() {
    this.previewBox.style.boxShadow = `${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.bluerRef.value}px ${this.spreadRef.value}px #000`;
    this.currentRule = this.previewBox.style.boxShadow;
  }

  showRule() {
    this.rule.innerText = this.currentRule;
    this.webkitRule.innerText = this.currentRule;
    this.mozRule.innerText = this.currentRule;
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "bluer":
        this.bluerRef.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        break;
    }

    this.applyRule();
    this.showRule();
  }

  copyPassword() {
    this.boxShadowRules = `box-shadow: ${this.currentRule}; -webkit-box-shadow: ${this.currentRule}; -moz-box-shadow: ${this.currentRule};`;

    navigator.clipboard
      .writeText(this.boxShadowRules)
      .then(() => {
        alert("Regras de box-shadow copiadas para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar as regras: ", err);
      });
  }
}

// Seleção de elementos
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");

const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");

const bluer = document.querySelector("#bluer");
const bluerRef = document.querySelector("#bluer-value");

const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const previewBox = document.querySelector("#box");

const rulesArea = document.querySelector("#rules-area");
const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

// Construtor
const boxShadow = new BoxShadowGenerator(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  bluer,
  bluerRef,
  spread,
  spreadRef,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

boxShadow.initialize();

// Eventos
horizontal.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("horizontal", value);
});

vertical.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("vertical", value);
});

bluer.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("bluer", value);
});

spread.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("spread", value);
});

rulesArea.addEventListener("click", () => {
  boxShadow.copyPassword();
});
