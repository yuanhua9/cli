/**
 * slogon
 */

const slogonList = [
  `
  Angel

  `,

  `
  Angel

  `,
];

function shuffle(arr) {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

module.exports = shuffle(slogonList);
