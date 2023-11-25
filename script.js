function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
}

function drawBars(array) {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach(height => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${height}px`;
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = height;
        bar.appendChild(label);
        arrayContainer.appendChild(bar);
    });
}
const array = generateRandomArray(30); 
drawBars(array);

//Randomize
const random = document.querySelector('#randomize');
random.addEventListener('click', () => {
    const array = generateRandomArray(30); 
    drawBars(array);
});

// BubbleSort
async function bubbleSort(speed) {
    const arrayContainer = document.getElementById('array-container');
    const bars = arrayContainer.children;
    let array = Array.from(bars).map(bar => parseInt(bar.style.height));
    const delayFactor = 100 / speed;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#e74c3c';
            bars[j+1].style.backgroundColor = '#e74c3c';
            await new Promise(resolve => setTimeout(resolve, delayFactor));
            if (array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j].querySelector('.bar-label').textContent = array[j];
                bars[j+1].style.height = `${array[j+1]}px`;
                bars[j+1].querySelector('.bar-label').textContent = array[j+1];
            }
            bars[j].style.backgroundColor = '#3498db';
            bars[j+1].style.backgroundColor = '#3498db';
        }
    }
}
document.getElementById('bubble').addEventListener('click', () => {
    const speed = document.getElementById('speed').value;
    bubbleSort(speed);
});
document.getElementById('speed').addEventListener('input', function () {
    const newSpeed = this.value;
});

//SelectionSort
async function SelectionSort(speed){
    const arrayContainer = document.getElementById('array-container');
    const bars = arrayContainer.children;
    let array = Array.from(bars).map(bar => parseInt(bar.style.height));
    const delayFactor = 100 / speed;
    for(let i=0;i<array.length;i++){
        let min_ind=i
        for(let j=i+1;j<array.length;j++){
            bars[j].style.backgroundColor = '#e74c3c';
            await new Promise(resolve => setTimeout(resolve,delayFactor));
            if(array[min_ind]>array[j]){
                [array[min_ind],array[j]]=[array[j],array[min_ind]]
                bars[j].style.height = `${array[j]}px`;
                bars[j].querySelector('.bar-label').textContent = array[j];
                bars[min_ind].style.height = `${array[min_ind]}px`;
                bars[min_ind].querySelector('.bar-label').textContent = array[min_ind];
            }
            bars[j].style.backgroundColor = '#3498db';
        }
    }
}
document.getElementById('selection').addEventListener('click',()=>{
    const speed=document.getElementById('speed').value;
    SelectionSort(speed)
})

//InsertionSort
async function InsertionSort(speed) {
    const arrayContainer = document.getElementById('array-container');
    const bars = arrayContainer.children;
    let array = Array.from(bars).map(bar => parseInt(bar.style.height));
    const delayFactor = 100 / speed;
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && key<array[j]) {
            bars[j].style.backgroundColor='#e74c3c';
            bars[j+1].style.backgroundColor='#e74c3c';
            await new Promise(resolve=>setTimeout(resolve, delayFactor));
            array[j+1]=array[j];
            bars[j+1].style.height=`${array[j+1]}px`;
            bars[j+1].querySelector('.bar-label').textContent=array[j+1];
            bars[j].style.backgroundColor='#3498db';
            bars[j+1].style.backgroundColor='#3498db';
            j=j-1;
        }

        array[j+1]=key;
        bars[j+1].style.height=`${key}px`;
        bars[j+1].querySelector('.bar-label').textContent=key;
        bars[j+1].style.backgroundColor='#3498db';
    }
}
document.getElementById('insertion').addEventListener('click',()=>{
    const speed=document.getElementById('speed').value;
    InsertionSort(speed);
});

//quicksort
async function partition(arr,low,high,speed,bars) {
    const pivot=arr[high];
    let i=low-1;
    const delayFactor=100/speed;
    for (let j=low;j<=high-1;j++){
        bars[j].style.backgroundColor='#e74c3c';
        bars[high].style.backgroundColor='#e74c3c';
        await new Promise(resolve=>setTimeout(resolve,delayFactor));
        if(arr[j]<pivot) {
            i++;
            [arr[i],arr[j]]=[arr[j],arr[i]];
            [bars[i].style.height, bars[j].style.height]=[bars[j].style.height, bars[i].style.height];
            const labelI=bars[i].querySelector('.bar-label').textContent;
            const labelJ=bars[j].querySelector('.bar-label').textContent;
            bars[i].querySelector('.bar-label').textContent=labelJ;
            bars[j].querySelector('.bar-label').textContent=labelI;
        }
        bars[j].style.backgroundColor='#3498db';
        bars[high].style.backgroundColor='#3498db';
    }

    [arr[i+1],arr[high]]=[arr[high],arr[i+1]];
    [bars[i+1].style.height,bars[high].style.height]=[bars[high].style.height,bars[i+1].style.height];
    const labelIPlus1=bars[i+1].querySelector('.bar-label').textContent;
    const labelHigh=bars[high].querySelector('.bar-label').textContent;
    bars[i+1].querySelector('.bar-label').textContent=labelHigh;
    bars[high].querySelector('.bar-label').textContent=labelIPlus1;
    return i+1;
}

async function quickSort(arr,low,high,speed,bars){
    if (low<high){
        const pi=await partition(arr, low, high, speed, bars);
        await Promise.all([
            quickSort(arr,low,pi-1,speed,bars),
            quickSort(arr,pi+1,high,speed,bars)
        ]);
    }
}
document.getElementById('quick').addEventListener('click',async()=>{
    const speed=document.getElementById('speed').value;
    const containBars=document.getElementById('array-container').children;
    const array=Array.from(containBars).map(bar=>parseInt(bar.style.height));
    await quickSort(array,0,array.length-1,speed,containBars);
});
//MergeSort
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function mergeSort(arr, bars, speedFactor) {
    const n = arr.length;
    if (n < 2) {
      return arr;
    }
    const left = arr.slice(0, Math.floor(n / 2));
    const right = arr.slice(Math.floor(n / 2));
    await mergeSort(left, bars, speedFactor);
    await mergeSort(right, bars, speedFactor);
    let i = 0,
      j = 0,
      k = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        bars[k].style.height = `${arr[k]}px`;
        bars[k].style.backgroundColor = '#e74c3c';
        bars[k].querySelector('.bar-label').textContent = arr[k];
        await sleep(speedFactor);
        i++;
      } else {
        arr[k] = right[j];
        bars[k].style.height = `${arr[k]}px`;
        bars[k].style.backgroundColor = '#e74c3c';
        bars[k].querySelector('.bar-label').textContent = arr[k];
        await sleep(speedFactor);
        j++;
      }
      bars[k].style.backgroundColor = '#3498db';
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = `${arr[k]}px`;
      bars[k].style.backgroundColor = '#e74c3c';
      bars[k].querySelector('.bar-label').textContent = arr[k];
      await sleep(speedFactor);
      i++;
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = `${arr[k]}px`;
      bars[k].style.backgroundColor = '#e74c3c';
      bars[k].querySelector('.bar-label').textContent = arr[k];
      await sleep(speedFactor);
      j++;
      k++;
    }
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = '#3498db';
    }
    return arr;
  }
  document.getElementById('merge').addEventListener('click', async () => {
    const speed = document.getElementById('speed').value;
    const containBars = document.getElementById('array-container').children;
    const array = Array.from(containBars).map(bar => parseInt(bar.style.height));
    const speedFactor = 100 / speed;
    await mergeSort(array, containBars, speedFactor);
  });
  
//shellSort
async function shellSort() {
    const arrayContainer=document.getElementById('array-container');
    const bars=arrayContainer.children;
    const speed=document.getElementById('speed').value;
    const delayFactor=100/speed
    const n=bars.length;
    let gap=1;
    while(gap<n/3) {
        gap=3*gap+1;
    }
    while(gap>0) {
        for(let i=gap;i<n;i++) {
            const currentHeight=parseInt(bars[i].style.height);
            let j=i;
            while(j>=gap && parseInt(bars[j-gap].style.height) > currentHeight) {
                bars[j].style.backgroundColor='#e74c3c';
                bars[j-gap].style.backgroundColor='#e74c3c';
                await new Promise(resolve=>setTimeout(resolve,delayFactor));
                bars[j].style.height=bars[j-gap].style.height;
                bars[j-gap].style.height=`${currentHeight}px`;
                const tempLabel=bars[j].querySelector('.bar-label').textContent;
                bars[j].querySelector('.bar-label').textContent=bars[j-gap].querySelector('.bar-label').textContent;
                bars[j-gap].querySelector('.bar-label').textContent=tempLabel;
                bars[j].style.backgroundColor = '#3498db';
                bars[j-gap].style.backgroundColor = '#3498db';
                j-=gap;
            }
        }
        gap=Math.floor(gap/3);
    }
    bars.forEach((bar,index) => {
        setTimeout(() => {
            bar.style.backgroundColor='#2ecc71';
        }, index*(100/delayFactor));
    });
}
document.getElementById('shell').addEventListener('click', shellSort);
