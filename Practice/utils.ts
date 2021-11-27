export const startButton = document.querySelector('#btn-1');
export const stopButton = document.querySelector('#btn-2');
export const fetchButton = document.querySelector('#btn-3');
export const clearButton = document.querySelector('#btn-4');

const result: HTMLElement = document.querySelector('.result');

export const title: HTMLElement = document.querySelector('.title');
export const description: HTMLElement = document.querySelector('.description');
export const bpi: HTMLElement = document.querySelector('.bpi');
export const image: HTMLImageElement = document.querySelector('#image');

let count: HTMLBodyElement = document.querySelector('.setCount');

export const setCount = (value: number) => {
  count.innerText = value.toString();
};

export const setBpi = (value: any) => {
  bpi.innerText = JSON.stringify(value, null, 4);
};

export const setImage = (src: string) => {
  image.src = src;
}; // end setImage

export const setTitle = (value: string) => {
  title.innerText = value;
}; // end setTitle

export const setDescription = (value: string) => {
  description.innerText = value;
};

export const setResult = (value: any) => {
  console.log(value);
  result.innerText = JSON.stringify(value, null, 4);
};

export const clearResult = () => {
  result.innerText = '';
};
