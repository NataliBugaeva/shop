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





// для диванов
export class Sofa {
  public id: string;
  public info: Info;

  constructor(id: string, info: Info) {
    this.id = id;
    this.info = info;
  }
}
export class Info {
  public name: string;
  public type: string;
  public length: number;
  public imgLarge: string;
  public imgSmall: string;
  public comments: Array<string>;
  public mechanism: string;
  public bedLength: number;
  public bedWidth: number;
  public material: string;
  public price: number;


  constructor(name: string, type: string, length: number, imgLarge: string, imgSmall: string, comments: [],
              mechanism: string, bedLength: number, bedWidth: number, material: string, price: number) {
    this.name = name;
    this.type = type;
    this.length = length;
    this.imgLarge = imgLarge;
    this.imgSmall = imgSmall;
    this.comments = comments;
    this.mechanism = mechanism;
    this.bedLength = bedLength;
    this.bedWidth = bedWidth;
    this.material = material;
    this.price = price;
  }
}


export class Chair {
  public id: string;
  public info: InfoChair;

  constructor(id: string, info: InfoChair) {
    this.id = id;
    this.info = info;
  }
}

export class InfoChair {
  public name: string;
  public type: string;
  public width: number;
  public height: number;
  public depth: number;
  public imgLarge: string;
  public imgSmall: string;
  public comments: Array<string>;
  public mechanism: string;
  public bedLength: number;
  public bedWidth: number;
  public material: string;
  public price: number;


  constructor(name: string, type: string, width: number, height: number, depth: number,
              imgLarge: string, imgSmall: string, comments: Array<string>, mechanism: string,
              bedLength: number, bedWidth: number, material: string, price: number) {
    this.name = name;
    this.type = type;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.imgLarge = imgLarge;
    this.imgSmall = imgSmall;
    this.comments = comments;
    this.mechanism = mechanism;
    this.bedLength = bedLength;
    this.bedWidth = bedWidth;
    this.material = material;
    this.price = price;
  }
}

export class Table {
  public id: string;
  public info: InfoTable;

  constructor(id: string, info: InfoTable) {
    this.id = id;
    this.info = info;
  }
}

export class InfoTable {
  public name: string;
  public type: string;
  public shape: string;
  public tabletopMaterial: string;
  public supportMaterial: string;
  public length: number;
  public fullLength: number;
  public width: number;
  public height: number;
  public comments: Array<string>;
  public price: number;
  public imgLarge: string;
  public imgSmall: string;

  constructor(name: string, type: string, shape: string, tabletopMaterial: string,
              supportMaterial: string, length: number, fullLength: number, width: number,
              height: number, comments: Array<string>, price: number, imgLarge: string, imgSmall: string) {
    this.name = name;
    this.type = type;
    this.shape = shape;
    this.tabletopMaterial = tabletopMaterial;
    this.supportMaterial = supportMaterial;
    this.length = length;
    this.fullLength = fullLength;
    this.width = width;
    this.height = height;
    this.comments = comments;
    this.price = price;
    this.imgLarge = imgLarge;
    this.imgSmall = imgSmall;
  }
}
