var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var passedPizza = _(products).filter(function(pizza) {
        return pizza.containsNuts === false && !(_(pizza.ingredients).any(function(ingredient) {
          return ingredient === "mushrooms";
        }));
      });

      productsICanEat.push(passedPizza);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */

    var result = _.range(0, 1000).reduce(function(acc, cur) {
      if (cur % 3 === 0 || cur % 5 === 0) {
        acc = acc + cur;
      }
      return acc;
    }, sum);

    expect(233168).toBe(result);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    //get ingredients array of all pizzas
    //flatten ingredients array
    //reduce the array to an obj of ingredient name : counts pairs
    var allIngredients = _(products).map(function(pizza) {
      return pizza.ingredients;
    })

    var flattenedIngredients = _(allIngredients).flatten()

    var ingredientCount = _(flattenedIngredients).reduce(function(count, ingredient) {
      count[ingredient] = (count[ingredient] || 0) + 1;
      return count;
    }, {});

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  
  
  it("should find the largest prime factor of a composite number", function largestPrime(number) {
    //turn input into a range array
    //if input % item in range is 0, item is a factor
    //filter items in factor array to prime factors
    //find the largest prime factor using reduce

    var allFactors = _(_.range(2,number)).filter(function(element) {
      return number % element === 0;
    });

    var primeFactors = _(allFactors).filter(function(element) {
      var elementRange = _.range(2, element);
      return _(elementRange).all(function(item) {
        return element % item !== 0;
      })
    });

    return _(primeFactors).reduce(function(max, cur) {
      if (cur > max) {
        max = cur;
      }
      return max;
    }, primeFactors[1]);

    expect(largestPrime(2080)).toBe(13);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function largestPalindromeOfProductOfTwoThreeDigitNums() {
    //descending range of all product of two 3 digit numbers (from 999*999 to 100*100)
    //find the first one that is a palindrome
    //to find palindrome reversed number string equal to the original number strings
    var allProducts = [];
    for (i = 100; i < 1000; i++) {
      for (j = 100; j < 1000; j++) {
        allProducts.push([i] * [j]);
      }
    }

    var desendingProducts = _(allProducts).sortBy(function(num1, num2) {
      return num2 - num1;
    });

    return _(desendingProducts).find(function(num) {
      var splitNum = num.toString().split("");
      var reverseArr = []
      for (i = splitNum.length - 1; i >= 0; i--) {
        reverseArr.push(splitNum[i]);
      }
      return num === parseInt(reverseArr.join(""));
    });
  }

  it("should find the smallest number divisible by each of the numbers 1 to 20", function divisibleByOneToTwenty() {
    //find all unique prime numbers between 1-20
    //check each number, if it's not divisible by any between 2 to this number, then it's prime
    //product of all prime numbers
    var range = _.range(2,21);

    var primeNums = [];
    _(range).each(function(num) {
      var subRange = _.range(2,num);
      var isPrime = _(subRange).all(function(element) {
        return num % element !== 0;
      });
      if (isPrime && primeNums.indexOf(num) === -1) {
        primeNums.push(num);
      };
    });

    return _(primeNums).reduce(function(acc, cur) {
      return acc * cur;
    }, 1);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function sumSquareDiff(num1, num2) {
    var sub = (num1*num1 + num2*num2) - (num1 + num2) * (num1 + num2)
    if (sub >= 0) {
      return sub;
    } else {
      return 0 - sub;
    }
  });

  it("should find the 10001st prime", function findTenThousandOnePrime() {
    var count = 1;
    var currentNum = 2;
    var primeNum = 0;
    

    while(count < 10002) {
      var subRange = _.range(2, currentNum);
      var isPrime = _(subRange).all(function(element) {
        return currentNum % element !== 0;
      });

      if (isPrime) {
        primeNum = currentNum;
        count++;
        currentNum++;
      } else {
        currentNum++;
      }
    }

    return primeNum;

  });

});
