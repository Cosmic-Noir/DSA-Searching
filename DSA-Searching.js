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

console.log(binarySearch(sortedArray, 78, 0, 92));
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

console.log(findBook(library));
