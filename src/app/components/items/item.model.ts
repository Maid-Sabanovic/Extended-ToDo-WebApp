export class Item {
    public id: number;
    public description: string;
    public isComplete: boolean;

    constructor(id: number, description: string, isComplete: boolean) {
        this.id = id;
        this.description = description;
        this.isComplete = isComplete;
    }
    
  }