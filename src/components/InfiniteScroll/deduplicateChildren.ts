export const deduplicateChildren = (array: any[], prop: string): any[] => {
    if (!array || !Array.isArray(array) || array.length === 0) {
      return array;
    }
  
    return array.filter((obj, pos, arr) => {
      return arr.map((mapObj: any) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };