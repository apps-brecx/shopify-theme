// if (!customElements.get('recipient-form')) {
//   customElements.define(
//     'recipient-form',
//     class RecipientForm extends HTMLElement {
//       constructor() {
//         super();
//         this.recipientFieldsLiveRegion = this.querySelector(`#Recipient-fields-live-region-${this.dataset.sectionId}`);
//         this.checkboxInput = this.querySelector(`#Recipient-checkbox-${this.dataset.sectionId}`);
//         this.checkboxInput.disabled = false;
//         this.hiddenControlField = this.querySelector(`#Recipient-control-${this.dataset.sectionId}`);
//         this.hiddenControlField.disabled = true;
//         this.emailInput = this.querySelector(`#Recipient-email-${this.dataset.sectionId}`);
//         this.nameInput = this.querySelector(`#Recipient-name-${this.dataset.sectionId}`);
//         this.messageInput = this.querySelector(`#Recipient-message-${this.dataset.sectionId}`);
//         this.sendonInput = this.querySelector(`#Recipient-send-on-${this.dataset.sectionId}`);
//         this.offsetProperty = this.querySelector(`#Recipient-timezone-offset-${this.dataset.sectionId}`);
//         if (this.offsetProperty) this.offsetProperty.value = new Date().getTimezoneOffset().toString();

//         this.errorMessageWrapper = this.querySelector('.product-form__recipient-error-message-wrapper');
//         this.errorMessageList = this.errorMessageWrapper?.querySelector('ul');
//         this.errorMessage = this.errorMessageWrapper?.querySelector('.error-message');
//         this.defaultErrorHeader = this.errorMessage?.innerText;
//         this.currentProductVariantId = this.dataset.productVariantId;
//         this.addEventListener('change', this.onChange.bind(this));
//         this.onChange();
//       }

//       cartUpdateUnsubscriber = undefined;
//       variantChangeUnsubscriber = undefined;
//       cartErrorUnsubscriber = undefined;

//       connectedCallback() {
//         this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
//           if (event.source === 'product-form' && event.productVariantId.toString() === this.currentProductVariantId) {
//             this.resetRecipientForm();
//           }
//         });

//         this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
//           if (event.data.sectionId === this.dataset.sectionId) {
//             this.currentProductVariantId = event.data.variant.id.toString();
//           }
//         });

//         this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartError, (event) => {
//           if (event.source === 'product-form' && event.productVariantId.toString() === this.currentProductVariantId) {
//             this.displayErrorMessage(event.message, event.errors);
//           }
//         });
//       }

//       disconnectedCallback() {
//         if (this.cartUpdateUnsubscriber) {
//           this.cartUpdateUnsubscriber();
//         }

//         if (this.variantChangeUnsubscriber) {
//           this.variantChangeUnsubscriber();
//         }

//         if (this.cartErrorUnsubscriber) {
//           this.cartErrorUnsubscriber();
//         }
//       }

//       onChange() {
//         if (this.checkboxInput.checked) {
//           this.enableInputFields();
//           this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormExpanded;
//         } else {
//           this.clearInputFields();
//           this.disableInputFields();
//           this.clearErrorMessage();
//           this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormCollapsed;
//         }
//       }

//       inputFields() {
//         return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput];
//       }

//       disableableFields() {
//         return [...this.inputFields(), this.offsetProperty];
//       }

//       clearInputFields() {
//         this.inputFields().forEach((field) => (field.value = ''));
//       }

//       enableInputFields() {
//         this.disableableFields().forEach((field) => (field.disabled = false));
//       }

//       disableInputFields() {
//         this.disableableFields().forEach((field) => (field.disabled = true));
//       }

//       displayErrorMessage(title, body) {
//         this.clearErrorMessage();
//         this.errorMessageWrapper.hidden = false;
//         if (typeof body === 'object') {
//           this.errorMessage.innerText = this.defaultErrorHeader;
//           return Object.entries(body).forEach(([key, value]) => {
//             const errorMessageId = `RecipientForm-${key}-error-${this.dataset.sectionId}`;
//             const fieldSelector = `#Recipient-${key}-${this.dataset.sectionId}`;
//             const message = `${value.join(', ')}`;
//             const errorMessageElement = this.querySelector(`#${errorMessageId}`);
//             const errorTextElement = errorMessageElement?.querySelector('.error-message');
//             if (!errorTextElement) return;

//             if (this.errorMessageList) {
//               this.errorMessageList.appendChild(this.createErrorListItem(fieldSelector, message));
//             }

//             errorTextElement.innerText = `${message}.`;
//             errorMessageElement.classList.remove('hidden');

//             const inputElement = this[`${key}Input`];
//             if (!inputElement) return;

//             inputElement.setAttribute('aria-invalid', true);
//             inputElement.setAttribute('aria-describedby', errorMessageId);
//           });
//         }

//         this.errorMessage.innerText = body;
//       }

//       createErrorListItem(target, message) {
//         const li = document.createElement('li');
//         const a = document.createElement('a');
//         a.setAttribute('href', target);
//         a.innerText = message;
//         li.appendChild(a);
//         li.className = 'error-message';
//         return li;
//       }

//       clearErrorMessage() {
//         this.errorMessageWrapper.hidden = true;

//         if (this.errorMessageList) this.errorMessageList.innerHTML = '';

//         this.querySelectorAll('.recipient-fields .form__message').forEach((field) => {
//           field.classList.add('hidden');
//           const textField = field.querySelector('.error-message');
//           if (textField) textField.innerText = '';
//         });

//         [this.emailInput, this.messageInput, this.nameInput, this.sendonInput].forEach((inputElement) => {
//           inputElement.setAttribute('aria-invalid', false);
//           inputElement.removeAttribute('aria-describedby');
//         });
//       }

//       resetRecipientForm() {
//         if (this.checkboxInput.checked) {
//           this.checkboxInput.checked = false;
//           this.clearInputFields();
//           this.clearErrorMessage();
//         }
//       }
//     }
//   );
// }



if (!customElements.get('recipient-form')) {
  customElements.define(
    'recipient-form',
    class RecipientForm extends HTMLElement {
      constructor() {
        super();
        
        this.sectionId = this.dataset.sectionId; // Store section ID for consistency
        this.currentProductVariantId = this.dataset.productVariantId || ""; // Ensure it's set correctly

        console.log("id", this.dataset.productVariantId)
        
        this.recipientFieldsLiveRegion = this.querySelector(`#Recipient-fields-live-region-${this.sectionId}`);
        this.checkboxInput = this.querySelector(`#Recipient-checkbox-${this.sectionId}`);
        this.hiddenControlField = this.querySelector(`#Recipient-control-${this.sectionId}`);
        this.emailInput = this.querySelector(`#Recipient-email-${this.sectionId}`);
        this.nameInput = this.querySelector(`#Recipient-name-${this.sectionId}`);
        this.messageInput = this.querySelector(`#Recipient-message-${this.sectionId}`);
        this.sendonInput = this.querySelector(`#Recipient-send-on-${this.sectionId}`);
        this.offsetProperty = this.querySelector(`#Recipient-timezone-offset-${this.sectionId}`);

        if (this.offsetProperty) {
          this.offsetProperty.value = new Date().getTimezoneOffset().toString();
        }

        this.errorMessageWrapper = this.querySelector('.product-form__recipient-error-message-wrapper');
        this.errorMessageList = this.errorMessageWrapper?.querySelector('ul');
        this.errorMessage = this.errorMessageWrapper?.querySelector('.error-message');
        this.defaultErrorHeader = this.errorMessage?.innerText;

        this.addEventListener('change', this.onChange.bind(this));
        this.onChange();
      }

      cartUpdateUnsubscriber = undefined;
      variantChangeUnsubscriber = undefined;
      cartErrorUnsubscriber = undefined;

connectedCallback() {
    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
        if (event.source === 'product-form' && event.productVariantId.toString() === this.currentProductVariantId) {
            this.resetRecipientForm();
        }
    });

    this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
        if (event.data.sectionId === this.sectionId && event.data.variant.id) {
            this.currentProductVariantId = event.data.variant.id.toString();

            console.log("Updated Variant ID:", this.currentProductVariantId); // ✅ Debugging

            // ✅ Ensure hidden input field is updated correctly
            const variantInput = document.querySelector("#selected-variant-id");
            if (variantInput) {
                variantInput.value = this.currentProductVariantId;
                console.log("Hidden input updated to:", variantInput.value);
            }

            // ✅ Update Shopify form input for correct submission
            const productForm = document.querySelector("form[action='/cart/add']");
            if (productForm) {
                const formVariantInput = productForm.querySelector("input[name='id']");
                if (formVariantInput) {
                    formVariantInput.value = this.currentProductVariantId;
                    console.log("Form input updated to:", formVariantInput.value);
                }
            }
        }
    });

    this.cartErrorUnsubscriber = subscribe(PUB_SUB_EVENTS.cartError, (event) => {
        if (event.source === 'product-form' && event.productVariantId.toString() === this.currentProductVariantId) {
            this.displayErrorMessage(event.message, event.errors);
        }
    });
}


      // disconnectedCallback() {
      //   if (this.cartUpdateUnsubscriber) this.cartUpdateUnsubscriber();
      //   if (this.variantChangeUnsubscriber) this.variantChangeUnsubscriber();
      //   if (this.cartErrorUnsubscriber) this.cartErrorUnsubscriber();
      // }

      connectedCallback() {
    // Hide the form initially
    if (this.recipientFieldsLiveRegion) {
        this.recipientFieldsLiveRegion.style.display = "none";
    }

    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
        if (event.source === 'product-form' && event.productVariantId.toString() === this.currentProductVariantId) {
            this.resetRecipientForm();
        }
    });

    this.variantChangeUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
        if (event.data.sectionId === this.sectionId && event.data.variant.id) {
            this.currentProductVariantId = event.data.variant.id.toString();

            console.log("Updated Variant ID:", this.currentProductVariantId);

            const variantInput = document.querySelector("#selected-variant-id");
            if (variantInput) {
                variantInput.value = this.currentProductVariantId;
            }
        }
    });
}

      onChange() {
        if (!this.checkboxInput) return;

        if (this.checkboxInput.checked) {
          this.enableInputFields();
          if (this.recipientFieldsLiveRegion) {
            this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormExpanded;
          }
        } else {
          this.clearInputFields();
          this.disableInputFields();
          this.clearErrorMessage();
          if (this.recipientFieldsLiveRegion) {
            this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormCollapsed;
          }
        }
      }

      inputFields() {
        return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput].filter(Boolean);
      }

      disableableFields() {
        return [...this.inputFields(), this.offsetProperty].filter(Boolean);
      }

      clearInputFields() {
        this.inputFields().forEach((field) => (field.value = ''));
      }

      enableInputFields() {
        this.disableableFields().forEach((field) => (field.disabled = false));
      }

      disableInputFields() {
        this.disableableFields().forEach((field) => (field.disabled = true));
      }

      displayErrorMessage(title, body) {
        this.clearErrorMessage();
        if (!this.errorMessageWrapper) return;
        
        this.errorMessageWrapper.hidden = false;

        if (typeof body === 'object') {
          this.errorMessage.innerText = this.defaultErrorHeader;
          Object.entries(body).forEach(([key, value]) => {
            const errorMessageId = `RecipientForm-${key}-error-${this.sectionId}`;
            const message = value.join(', ');
            const errorMessageElement = this.querySelector(`#${errorMessageId}`);
            const errorTextElement = errorMessageElement?.querySelector('.error-message');

            if (!errorTextElement) return;
            errorTextElement.innerText = `${message}.`;
            errorMessageElement.classList.remove('hidden');
          });
        } else {
          this.errorMessage.innerText = body;
        }
      }

      clearErrorMessage() {
        if (!this.errorMessageWrapper) return;

        this.errorMessageWrapper.hidden = true;
        if (this.errorMessageList) this.errorMessageList.innerHTML = '';
      }

      resetRecipientForm() {
        if (this.checkboxInput && this.checkboxInput.checked) {
          this.checkboxInput.checked = false;
          this.clearInputFields();
          this.clearErrorMessage();
        }
      }
    }
  );
}


