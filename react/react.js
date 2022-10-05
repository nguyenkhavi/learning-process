//TODO: Testing at: https://codesandbox.io/s/react-hooks-usestate-forked-kdwx5l?file=/src/index.js

const createReact = function () {
  let hooks = [];
  let firstRendering = true;
  let currentComponent = {};
  let index = 0;
  let callbacks = []
  let cleanups = []
  let root

  function runEffects(){
    callbacks.map(({idx, cb}) => {
      cleanups[idx]?.()
      const cleanup = cb()
      cleanups[idx] = cleanup
    })
    callbacks = []
  }


  function render(Component, rootEle) {
    console.log({hooks})
    if(firstRendering){
      root = rootEle
    }
    currentComponent = Component;
    const instance = Component();
    runEffects()
    firstRendering = false;
    index = 0
    
    // setInterval(()=>{
    //   root.innerText = `Increment: ${instance.state.count}`
    //   root.onclick = instance.props.onclick
    // },60/1000)

    

    
    root.innerText = `Increment: ${instance.state.count}`
    root.onclick = instance.props.onclick
    
  }

  function useState(initialState) {
    const currentIndex = index
    index = index + 1
    if (firstRendering) {
      hooks[currentIndex] = initialState;
    }
    const setState = (newState) => {
      if (typeof newState === "function") {
        hooks[currentIndex] = newState(hooks[currentIndex]);
      } else {
        hooks[currentIndex] = newState;
      }
      render(currentComponent);
    };
    return [hooks[currentIndex], setState];
  }

  function useEffect(callback=()=>{return()=>{}}, deps=[]){
    const currentIndex = index
    if(firstRendering){
      callbacks.push({
        idx: currentIndex,
        cb: callback
      })
      hooks[currentIndex] = [...deps]
    }else{
      const oldDeps = hooks[currentIndex]
      const hasChanged = deps.reduce((acc, current, curIdx)=> current !== oldDeps[curIdx] || acc, false)
      hooks[currentIndex] = deps
      if(hasChanged){
        callbacks.push({
          idx: currentIndex,
          cb: callback
        })
      }
    }
    index = index + 1
  }


  return { render, useState, useEffect};
};
const React = createReact();






function Component() {
  const [count, setCount] = React.useState(0);
  const [word, setWord] = React.useState("");

  React.useEffect(() => {
    console.log("count changed", count);
    return () => {
      console.log("clean up", count)
    }
  }, [count]);
  const handleTextChange = (text) => {
    setWord(text)
    console.log({word})
  }

  const handleCountChange = () => {
    // setCount(count => count + 1)
    // setCount(count => count + 1)
    setCount(count => count + 1)
  }
  console.log({ count });


  return {
    type: 'h1',
    props: {
      children: 'Increment',
      onclick: handleCountChange
    },
    state:{
      count
    }

  } 
}

const root = document.getElementById("root")
React.render(Component, root);



