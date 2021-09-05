export default class Option {
  modality;
  price;
  isSelected;

  constructor(modality = "default", price = 0) {
    this.modality = modality;
    this.price = price;
    this.isSelected = false;
  }
}
