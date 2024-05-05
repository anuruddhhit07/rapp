export class ClassName {
    private static instance: ClassName | null = null;
  
    // type YScaleKeys = keyof typeof this.yScaleConfig;
    private constructor() {
     
    }
  
    static getInstance(): ClassName {
      if (!ClassName.instance) {
        ClassName.instance = new ClassName();
      }
      return ClassName.instance;
    }

}