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

