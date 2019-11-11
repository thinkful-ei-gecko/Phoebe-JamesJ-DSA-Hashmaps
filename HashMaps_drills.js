//1.
const HashMap = require('./HashMap')

function main() {
  const lor = new HashMap()
  // lor.MAX_LOAD_RATIO = 0.5;
  // lor.SIZE_RATIO = 3;

  lor.set('Hobbit', 'Bilbo')
  lor.set('Hobbit', 'Frodo')
  lor.set('Wizard', 'Gandolf')
  lor.set('Human', 'Aragon')
  lor.set('Elf', 'Legolas')
  lor.set('Maiar', 'The Necromancer')
  lor.set('Maiar', 'Sauron')
  lor.set('Ringbearer', 'Gollum')
  lor.set('LadyOfLight', 'Galadriel')
  lor.set('HalfElven', 'Arwen')
  lor.set('Ent', 'Treebeard')

  // console.log(JSON.stringify(lor))

  // Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?
  // Yes

  // console.log(JSON.stringify(lor.get('Maiar'))); //Sauron
  // console.log(JSON.stringify(lor.get('Hobbit'))); //Frodo
  // Yes, there is a discrepancy because we have two values for key Maiar and Hobbit and it's only returning one for each (last instance inserted). Since they share the key name instead of adding a new item to the hash map, it's updating the value for the key.
  // Capacity after hashing is 24 because if the hash map's capacity exceeds 50% (4th set) it increases in capacity from 8 to 24 (threefold)
}

// main()

//2.
// console.log(map1.get(str1)); // 20
// console.log(map2.get(str3)); // 10
// Because for all strings the key itself is identical, even though different variables are being used to pass the value it, it's merely updating the value for one key. This is why for both maps, the most recently set value is what is being returned.

//3.
// 1) https://share.getcloudapp.com/2NuA8mXO
// 2) https://share.getcloudapp.com/bLupbBK4

//4. Remove duplicates
function removeDup(str) {
  const hm = new HashMap()

  for (let i = 0; i < str.length; i++) {
    hm.setUniqueKey(str[i], i)
  }
  // If we need to return the string, you would just need to index thru the string again and order the keys by the value

  // console.log(JSON.stringify(hm))
}
// removeDup('google all that you think can think of')
//There are a lot of nulls because it gives us a map with a capacity of 2x the input

// 5. Any permutation a palindrome

function containsPalindrome(string) {
  const hmPalindrome = new HashMap()
  for (let i = 0; i < string.length; i++) {
    hmPalindrome.setWithCounter(string[i])
  }
  let counter = 0
  for (let j = 0; j < hmPalindrome._hashTable.length; j++) {
    // If a key/value exists at a given index and it has an odd
    // number of occurrences, increment a counter
    if (
      hmPalindrome._hashTable[j] &&
      hmPalindrome._hashTable[j].value % 2 !== 0
    ) {
      counter++
    }
    // If there is ever more than one instance of an odd occurrence of
    // a letter, the work can no longer be a palindrome
    if (counter > 1) {
      return false
    }
  }
  return true
}

// console.log(containsPalindrome('north'))

// 6. Anagram grouping
// Write an algorithm to group a list of words into anagrams.
// For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'],
// the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].

let testArray = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']

// hash map for each word, where key is word and value is _hashTable
// for each word, if its hashmap matches another, combine that word with
// starting word and remove checked word from group

function anagramize(arr) {
  const resultArray = []
  const masterHashMapArray = []
  for (let i = 0; i < arr.length; i++) {
    let tempMap = new HashMap()
    for (let j = 0; j < arr[i].length; j++) {
      tempMap.setWithCounter(arr[i][j])
    }
    masterHashMapArray.push({
      word: arr[i],
      hashTable: tempMap._hashTable,
    })
  }
  // return masterHashMapArray
  for (let k = 0; k < masterHashMapArray.length; k++) {
    let tempArr = []
    let tempHash = masterHashMapArray[k]['hashTable'] 
    tempArr.push(masterHashMapArray[k]['word'])
    masterHashMapArray.slice(0,1)
    for (let l = 0; l < masterHashMapArray.length; l++) {
      if (
        tempHash ===
        masterHashMapArray[l]['hashTable']
      ) {
        tempArr.push(masterHashMapArray[l]['word'])
        masterHashMapArray.slice(l, l + 1)
      }
    }
    resultArray.push(tempArr)
  }
}

function angrm(arr) {
  let masterObj = {}
  for (let i = 0; i < arr.length; i++) {
    let tempHash = new HashMap()
    for (let j = 0; j < arr[i].length; j++) {
      tempHash.setWithCounter(arr[i][j])
    }
    masterObj[arr[i]] = tempHash._hashTable
  }
  return masterObj
}

// kiss version
function simpleAnagram(arr) {
  let hashMap = new HashMap()
  arr.forEach(word => {
    let sorted = word.split('').sort().join('') 
    if (hashMap.get(sorted) === undefined) {
      hashMap.set(sorted, [word])
    } else {
      let temp = hashMap.get(sorted)
      hashMap.set(sorted, [...temp, word])
    }
  })
  return hashMap._hashTable
}

console.log(simpleAnagram(testArray))
