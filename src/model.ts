// общий для всех продуктов
export class Product {
  public id: string;
  public info: {
    id: string,
    info: any[],
    comments: any[],
    images: any[]
  };

  constructor(id: string, info: { id: string; info: object[]; comments: any[]; images: object[] }) {
    this.id = id;
    this.info = info;
  }
}

export class User {
  public id: string;
  public email: string;
  public orders: any[];
  public basket: Product[];

  constructor(id: string, email: string, orders: any[], basket: Product[]) {
    this.id = id;
    this.email = email;
    this.orders = orders;
    this.basket = basket;
  }
}

