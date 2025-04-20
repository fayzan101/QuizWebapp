export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // Index of the correct answer (0-3)
}

export interface QuizTopic {
  id: string
  title: string
  questions: QuizQuestion[]
}

export const quizData: QuizTopic[] = [
  {
    id: "mvc",
    title: "Multivariable Calculus",
    questions: [
      {
        id: 1,
        question: "What is the gradient of the function f(x, y) = x² + y²?",
        options: ["(2x, 2y)", "(x², y²)", "(2, 2)", "(x, y)"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which of the following is the correct formula for the divergence of a vector field F = (P, Q, R)?",
        options: [
          "∇·F = ∂P/∂x + ∂Q/∂y + ∂R/∂z",
          "∇·F = ∂P/∂x × ∂Q/∂y × ∂R/∂z",
          "∇·F = ∂P/∂x - ∂Q/∂y + ∂R/∂z",
          "∇·F = (∂P/∂x)² + (∂Q/∂y)² + (∂R/∂z)²",
        ],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "What is the Laplacian of f(x, y, z) = x² + y² + z²?",
        options: ["2", "6", "0", "4"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "For a function f(x, y), what does ∂²f/∂x∂y represent?",
        options: [
          "The second partial derivative with respect to x, then y",
          "The second partial derivative with respect to y, then x",
          "The product of the first partial derivatives",
          "The sum of the first partial derivatives",
        ],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "What is the curl of the gradient of a scalar function?",
        options: ["Always zero", "Always one", "Depends on the function", "A unit vector"],
        correctAnswer: 0,
      },
      {
        id: 6,
        question:
          "Which of the following is a necessary condition for a critical point of f(x, y) to be a local maximum?",
        options: [
          "The Hessian matrix is negative definite",
          "The Hessian matrix is positive definite",
          "The Hessian matrix has a zero determinant",
          "The gradient is a non-zero vector",
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: "What is the double integral ∫∫_R xy dA where R is the rectangle [0,1] × [0,2]?",
        options: ["1", "2", "1/2", "1/4"],
        correctAnswer: 2,
      },
      {
        id: 8,
        question: "Which of the following vector fields is conservative?",
        options: ["F(x, y) = (y, -x)", "F(x, y) = (y, x)", "F(x, y) = (x, y)", "F(x, y) = (-y, x)"],
        correctAnswer: 2,
      },
      {
        id: 9,
        question:
          "What is the directional derivative of f(x, y) = x² - y² at the point (1, 1) in the direction of the vector (1, 1)?",
        options: ["0", "√2", "2", "-2"],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: "Which theorem relates a triple integral to a surface integral?",
        options: [
          "Gauss's Divergence Theorem",
          "Green's Theorem",
          "Stokes' Theorem",
          "The Fundamental Theorem of Calculus",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "pf",
    title: "Programming Fundamentals",
    questions: [
      {
        id: 1,
        question: "Which of the following is the correct syntax for a for loop in C?",
        options: ["for (i = 0; i < n; i++)", "for i = 0 to n", "for (i < n; i = 0; i++)", "for (i = 0, i < n, i++)"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'What is the output of the following code?\nint x = 5;\nint y = x++;\nprintf("%d %d", x, y);',
        options: ["5 5", "6 5", "5 6", "6 6"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which data structure operates on the principle of 'First In, First Out' (FIFO)?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "Which of the following is NOT a primitive data type in most programming languages?",
        options: ["Integer", "Float", "Character", "Array"],
        correctAnswer: 3,
      },
      {
        id: 6,
        question:
          "What will be the output of the following recursive function when called with n = 3?\nint func(int n) {\n  if (n <= 1) return 1;\n  return n * func(n-1);\n}",
        options: ["3", "6", "9", "27"],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "Which sorting algorithm has the best average-case time complexity?",
        options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
        correctAnswer: 2,
      },
      {
        id: 8,
        question: "What does the following code do?\nint a = 5, b = 7;\na = a ^ b;\nb = a ^ b;\na = a ^ b;",
        options: [
          "Multiplies a and b",
          "Swaps the values of a and b",
          "Computes the bitwise OR of a and b",
          "Sets both a and b to 0",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "Which of the following is a valid way to declare and initialize an array in C?",
        options: [
          "int arr[5] = {1, 2, 3, 4, 5};",
          "array int[5] = (1, 2, 3, 4, 5);",
          "int arr(5) = {1, 2, 3, 4, 5};",
          "int arr = new int[5]{1, 2, 3, 4, 5};",
        ],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: "What is the purpose of the 'break' statement in a loop?",
        options: [
          "To skip the current iteration and continue with the next one",
          "To terminate the loop immediately",
          "To return a value from a function",
          "To pause the execution of the program",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    questions: [
      {
        id: 1,
        question: "What is polymorphism in OOP?",
        options: [
          "The ability of a class to inherit from multiple parent classes",
          "The ability to create multiple objects from a single class",
          "The ability of an object to take on many forms",
          "The ability to hide implementation details",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which OOP concept is used to hide the implementation details of a class?",
        options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the purpose of a constructor in a class?",
        options: [
          "To destroy objects when they are no longer needed",
          "To initialize objects when they are created",
          "To define the methods that can be called on an object",
          "To restrict access to certain class members",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "Which of the following is NOT a principle of Object-Oriented Programming?",
        options: ["Inheritance", "Encapsulation", "Polymorphism", "Normalization"],
        correctAnswer: 3,
      },
      {
        id: 5,
        question: "What is method overriding in OOP?",
        options: [
          "Defining a method in a subclass with the same name as in the parent class",
          "Defining multiple methods with the same name but different parameters",
          "Hiding class members from external access",
          "Creating multiple instances of the same class",
        ],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: "What is the difference between an abstract class and an interface?",
        options: [
          "Abstract classes can have constructors, interfaces cannot",
          "Interfaces can have implemented methods, abstract classes cannot",
          "A class can implement multiple interfaces but extend only one abstract class",
          "Abstract classes can have fields, interfaces cannot",
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: "What is the 'this' keyword used for in OOP?",
        options: [
          "To refer to the current instance of the class",
          "To refer to the parent class",
          "To create a new instance of a class",
          "To access static members of a class",
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "Which of the following best describes composition in OOP?",
        options: [
          "A class inherits properties and behaviors from another class",
          "A class contains objects of other classes as its members",
          "A class implements multiple interfaces",
          "A class overrides methods from its parent class",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "What is the purpose of the 'final' keyword when applied to a class in Java?",
        options: [
          "The class cannot be instantiated",
          "The class cannot be inherited from",
          "The class cannot be modified at runtime",
          "The class can only be accessed within the same package",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "What is a pure virtual function in C++?",
        options: [
          "A function that has no implementation in the base class",
          "A function that cannot be overridden in derived classes",
          "A function that is defined as both virtual and static",
          "A function that is accessible only within the class",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "dld",
    title: "Digital Logic Design",
    questions: [
      {
        id: 1,
        question: "Which gate is represented by the Boolean expression A * B?",
        options: ["AND gate", "OR gate", "XOR gate", "NAND gate"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What is the output of an XOR gate when both inputs are 1?",
        options: ["0", "1", "Undefined", "Floating"],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "Which of the following is a universal gate?",
        options: ["AND", "OR", "XOR", "NAND"],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: "How many flip-flops are required to build a 4-bit counter?",
        options: ["2", "3", "4", "8"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "What is the Boolean expression for a 2-input NOR gate?",
        options: ["A + B", "A * B", "A ⊕ B", "!(A + B)"],
        correctAnswer: 3,
      },
      {
        id: 6,
        question: "Which of the following is NOT a type of flip-flop?",
        options: ["D flip-flop", "T flip-flop", "JK flip-flop", "AB flip-flop"],
        correctAnswer: 3,
      },
      {
        id: 7,
        question: "What is the simplified form of the Boolean expression (A + B)(A + C)?",
        options: ["A + BC", "A(B + C)", "A + B + C", "AB + AC"],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "How many inputs are needed for a multiplexer with 8 data inputs?",
        options: ["3", "4", "8", "16"],
        correctAnswer: 0,
      },
      {
        id: 9,
        question: "What is the purpose of a Karnaugh map (K-map)?",
        options: [
          "To design sequential circuits",
          "To simplify Boolean expressions",
          "To convert decimal to binary",
          "To implement arithmetic operations",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: "Which of the following is true about a full adder?",
        options: [
          "It adds two 1-bit numbers with a carry-in",
          "It adds two 2-bit numbers",
          "It adds three 1-bit numbers",
          "It adds four 1-bit numbers",
        ],
        correctAnswer: 0,
      },
    ],
  },
]
