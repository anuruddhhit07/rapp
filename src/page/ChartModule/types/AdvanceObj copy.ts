// Define a child object interface
export interface ChildObject {
    id: number;
    name: string;
    status: boolean;
    toggleStatus: (parentCallback: (child: ChildObject) => void) => void;
  }
  
  // Define a child object constructor
  export function createChildObject(id: number, name: string, status: boolean): ChildObject {
    return {
      id,
      name,
      status,
      toggleStatus(parentCallback: (child: ChildObject) => void) {
        this.status = !this.status;
        if (typeof parentCallback === 'function') {
          parentCallback(this); // Call the provided callback with the child object
        } else {
          console.error('Parent callback is not a function.');
        }
      }
    };
  }
  
  // Create parent object and callback function
 export  const parentObj = {
    activeChildren:0,
    children: [] as ChildObject[],
    updateParent(child: ChildObject) {
      console.log(`Child object with ID ${child.id} has changed status!`);
    },
    getactivechildren(){
        this.activeChildren=this.children.filter(item=>item.status).length
    }
  };