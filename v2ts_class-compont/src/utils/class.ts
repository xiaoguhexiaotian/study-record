class Goods {
  constructor(public name: string, public price: number) {
    this.name = name;
    this.price = price;
  }

  // 折扣
  getPriceWithTax(taxRate: number): number {
    return this.price * (1 - taxRate);
  }
  static getProductInfo() {
    console.log(this.name)
  }
}

export { Goods }