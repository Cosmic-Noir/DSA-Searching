// How many searches?
const sorted = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];

function binarySearch(array, value, start, end) {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  console.log(start, end);
  if (item == value) {
    return index;
  } else if (item < value) {
    return binarySearch(array, value, index + 1, end);
  } else if (item > value) {
    return binarySearch(array, value, start, index - 1);
  }
}

// binarySearch(sorted, 8, 0, 9);
/* Prints:
0 9
0 3
2 3
3 3 */

// binarySearch(sorted, 16, 0, 9);
/* Prints
0 9
5 9
8 9 */

// Linear vs Binary
const myArray = [
  89,
  30,
  25,
  32,
  72,
  70,
  51,
  42,
  25,
  24,
  53,
  55,
  78,
  50,
  13,
  40,
  48,
  32,
  26,
  2,
  14,
  33,
  45,
  72,
  56,
  44,
  21,
  88,
  27,
  68,
  15,
  62,
  93,
  98,
  73,
  28,
  16,
  46,
  87,
  28,
  65,
  38,
  67,
  16,
  85,
  63,
  23,
  69,
  64,
  91,
  9,
  70,
  81,
  27,
  97,
  82,
  6,
  88,
  3,
  7,
  46,
  13,
  11,
  64,
  76,
  31,
  26,
  38,
  28,
  13,
  17,
  69,
  90,
  1,
  6,
  7,
  64,
  43,
  9,
  73,
  80,
  98,
  46,
  27,
  22,
  87,
  49,
  83,
  6,
  39,
  42,
  51,
  54,
  84,
  34,
  53,
  78,
  40,
  14,
  5
];

// Linear

const linearSearch = (array, value) => {
  let returnVal = "Sorry nothing found";
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      returnVal = i;
    }
  }
  return returnVal;
};

// console.log(linearSearch(myArray, 1000));

// Binary

let sortedArray = myArray.sort();

// console.log(binarySearch(sortedArray, 78, 0, 92));
// Binary took 6 searches.

// Find a Book - Dewey Decimal Index Categorizes books into 10 large topics, then divided into sub divisions. Then subdivisions are divided into classes.
// Reads in three parts, the 'library', 'dewey number', and 'title'. So. Since the Library and dewey number are sorted, we can do a binary search (more efficient), and then once into titles, then we can linearly search for the title in that division.

const findBook = (library, dewey, title) => {
  let start = 0;
  let end = library.length;
  while (start < end) {
    let middle = Math.floor((start + end) / 2);
    if (library[middle].dewey == dewey) {
      // library.dewey is a match, now find title
      if (library[middle].title == title) {
        return library[middle];
      } else {
        // must search for title linearly
        for (let index = middle + 1; library[index].dewey == dewey; index++) {
          if (library[index].title == title) {
            return library[index];
          }
        }
        for (let index = middle - 1; library[index].dewey == dewey; index--) {
          if (library[index].title == title) {
            return library[index];
          }
        }
        // Still no found title
        return null;
      }
      if (library[middle].dewey < dewey) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
  }
  // Unable to find library
  return null;
};

const library = [
  "005.133 Mike Cowlishaw: The REXX Language",
  "005.133 Sams: Teach Yourself C++ In 21 Days",
  "005.133 Bjarne Stroustrup: The C++ Programming Language",
  "005.2762 Douglas Crockford: JavaScript: The Good Parts",
  "005.2762 David Flanagan: JavaScript: The Definitive Guide",
  "005.44684 Meinhard Schmidt: Windows Vista for Dummies",
  "220.52081 Zondervan: NIV Study Bible",
  "231.7652 Dr Russell Humphries: Starlight and Time",
  "623.82509051 Frederick Thomas Jane: Jane's Fighting Ships",
  "796.8092 Chuck Norris: The Official Chuck Norris Fact Book"
];

// console.log(findBook(library));

// Searching in a BST

// Implement Different tree traversals

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // if tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    // If tree already exists, then start at the root and compare to key being inserted. If key is less than node's value, then move left, and vice versa.
    else if (key < this.key) {
      // If existing node does not hav e aleft child, then insert node as left child of that node, passing 'this' as the parent.
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      // If node has has a left child, recursively call the insert method
      else {
        this.left.insert(key, value);
      }
    } else {
      // If key is > than node's key, then do right side
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  // Retrieval follows the same pattern as insertion, checking key against the key stored in the node and recursively flowing left or right. Average case would be O(n), best case would be O(1) if item was at the root
  find(key) {
    // if Item is found at the root, then return that value
    if (this.key == key) {
      return this.value;
    }
    // if item is less than root, go left, if left child exists, then recursively check its left and/or right child
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    // same, but right sided
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // Item not found
    else {
      throw new Error("Key Error");
    }
  }

  // Removal - Three scenarios when you find the item you want to remove: item has no children, 1 child, or 2 children.
  // If no children, simply detach from parent.
  // If one child, then you must make the parent of the node being removed the parent of the child of the node being removed, then remove the node.
  // Node with two children - You must find the MINIMUM value in the RIGHT MOST subtree. Go ALL the way down the right most tree to the left hand side. , then we replace the node being removed with that minimum value.
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = succesor.key;
        this.value = succesor.value;
        successor.remove(successor.key);
      }
      // If node only has a left child, then replace the node with its left child
      else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      }
      // If node has no children, then simply remove it and any references to it
      else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key error");
    }
  }

  // _replaceWith - used to find the node to replace that has children
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfs(values = []) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }
}

let newTree = new BinarySearchTree();

newTree.insert(25);
newTree.insert(15);
newTree.insert(50);
newTree.insert(10);
newTree.insert(24);
newTree.insert(35);
newTree.insert(70);
newTree.insert(4);
newTree.insert(12);
newTree.insert(18);
newTree.insert(31);
newTree.insert(44);
newTree.insert(66);
newTree.insert(90);
newTree.insert(20);

// console.log(newTree);

// console.log(newTree.dsf);

// Find next commanding Officer - Should be in order from left to right...

// bfs(tree, values = []) {
//         const queue = new Queue();
//         const node = tree.root;
//         queue.enqueue(node);
//         while (queue.length) {
//             const node = queue.dequeue(); //remove from the queue
//             values.push(node.value); // add that value from the queue to an array

//             if (node.left) {
//                 queue.enqueue(node.left); //add left child to the queue
//             }

//             if (node.right) {
//                 queue.enqueue(node.right); // add right child to the queue
//             }
//         }

//         return values;
//     }

// }

// Max Profit

const profit = array => {
  let profit = 0;
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 1) {
      profit -= array[i];
    } else {
      profit += array[i];
    }
  }
  return profit;
};

const prices = [128, 97, 121, 123, 98, 97, 105];

console.log(profit(prices));
