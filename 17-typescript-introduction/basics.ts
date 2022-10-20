// Primitive types: number, string, boolean
// More complex types: arrays, objects

// Primitives
let age: number;
let userName: string;
let isDeveloper: boolean;

// Complex types
let hobbies: string[] = ["Sports", "Cooking"]; // Array type

// General object declaration, like in JavaScript
let personNonTyped = {
  name: "Henrique",
  age: 29,
};

// Type definition: TypeScript feature
let person: {
  name: string;
  age: number;
};

person = {
    name: 'Henrique',
    age: 29,
    // Object form is not flexible anymore: code breaks with the extra property below
    // test: false
}
