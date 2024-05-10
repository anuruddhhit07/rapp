export interface ChildObject {
    id: number;
    name: string;
    status: boolean;
}

// Define a parent object interface
export interface ParentObject {
    activeChildren: number;
    children: ChildObject[];
    updateParent(child: ChildObject): void;
    getactivechildren(): void;
}

// Define a child object constructor
export function createChildObject(id: number, name: string, status: boolean): ChildObject {
    return {
        id,
        name,
        status,
    };
}

// Create parent object
export const parentObj: ParentObject = {
    activeChildren: 0,
    children: [],
    updateParent(child: ChildObject): void {
        console.log(`Child object with ID ${child.id} has changed status!`);
    },
    getactivechildren(): void {
        this.activeChildren = this.children.filter(child => child.status).length;
    }
};

// Create a Proxy for the parent object to intercept property access
export const proxiedParentObj = new Proxy(parentObj, {
    set(target: ParentObject, prop: keyof ParentObject, value: any): boolean {
        console.log(target);
        if (prop === 'children') {
            target.getactivechildren(); // Trigger getactivechildren when children property is set
        }
        target[prop] = value;
        return true;
    },
    get(target: ParentObject, prop: keyof ParentObject): any {
        console.log(target);
        if (prop === 'children') {
            return new Proxy(target.children, {
                set(target: ChildObject[], prop: keyof ChildObject, value: any): boolean {
                    if (prop === 'status') {
                        (target as any)[prop] = value;
                        (target as any)[0].updateParent(target[0]); // Trigger updateParent when status property of a child is set
                        (target as any)[0].updateParent(target[0]); // Trigger getactivechildren when status property of a child is set
                    }
                    return true;
                }
            });
        }
        return target[prop];
    }
});