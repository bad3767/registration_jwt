// new Promise((resolveOuter) => {
//     resolveOuter(
//       new Promise((resolveInner) => {
//         setTimeout(resolveInner, 1000);
//       }),
//     );
//   });
  
//   console.log('resolveOuter: ', new Promise);
  

var products = ['soccer ball', 'cleats', 'socks', 'shorts'];
console.log(products[0]); // 'soccer ball'
console.log(products[3]); // 'shorts'

var twoDimensional = [[41, 13], [7, 29]];
console.log(twoDimensional[0]); // access first array
console.log(twoDimensional[0][1]); // access 13 in first array
