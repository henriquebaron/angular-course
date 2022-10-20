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


// TypeScript can also infer types:
let course = 'Angular - The Complete Guide';
// course = 123; // Thus this line breaks

// Feature that differs TypeScript *a lot* from other languages I knew: Union types
// In this case, the second line does not break, because both types are allowed for that variable
let otherCourse: string | number = 'Angular - The Complete Guide';
otherCourse = 123;

// type keyword: doesn't exist in JavaScript. Creates type aliases.
type Person = {
    name: string;
    age: number;
};

// Variable declared with the 'Person' type alias
let anotherPerson: Person = {
    name: 'Henrique',
    age: 29
};