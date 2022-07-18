const createContainerForExample = () => {
  const container = document.createElement("div");
  container.classList.add("example");

  return container;
};

const addContainerToDOM = (container) => {
  document.body.appendChild(container);
};

const createCustomElement = ({ selector, element }) => {
  customElements.define(selector, element);
  const nodeElement = document.createElement(selector);

  return nodeElement;
};

const appendCustomElementToContainer = (container, element) => {
  container.appendChild(element);
};

const generateCustomElement = ({ selector, element }) => {
  const customElement = createCustomElement({ selector, element });
  const container = createContainerForExample();

  appendCustomElementToContainer(container, customElement);
  addContainerToDOM(container);
};

class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  // This is called when the component is inserted
  connectedCallback() {
    this.innerHTML = "<h2>Custom element</h2>";
  }
}

class CustomShadowElement extends HTMLElement {
  #shadow = null;

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: 'open' });
  }

  // This is called when the component is inserted
  connectedCallback() {
    const h2 = document.createElement("h2");
    h2.textContent = "Custom Element";
    this.#shadow.appendChild(h2);
  }
}

class CustomShadowTemplateElement extends HTMLElement {
  #shadow = null;

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: 'open' });
  }

  // This is called when the component is inserted
  connectedCallback() {
    const template = this.#getTemplate();
    const clonedTemplate = document.importNode(template.content, true);

    this.#shadow.appendChild(clonedTemplate);
  }

  #getTemplate() {
    const template = document.getElementById("custom-shadow-template-el");
    return template;
  }
}

generateCustomElement({ selector: "custom-el", element: CustomElement });
generateCustomElement({ selector: "custom-shadow-el", element: CustomShadowElement });
generateCustomElement({ selector: "custom-shadow-template-el", element: CustomShadowTemplateElement });
