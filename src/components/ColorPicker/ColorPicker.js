import styles from './ColorPicker.module.css'

const ColorPicker = (props) => (
  <div className={styles.ColorPicker} >
    {props.colors.map((color, idx) =>
      <button
        className={styles.button}
        style={{
          backgroundColor: idx === props.selColorIdx ? 'white' : color,
          borderColor: color
        }}
        key={color}
        onClick={ ()=> props.setColorIdx(idx)}
      />
    )}
  </div>
);

export default ColorPicker;
//lots going on here
// so the div with the classname of the object of styles.Colorpicker is being grabbed (css module file)
// then the outside the div, props.colors is being used, then making map of color and of showing the array of idx
// idx is first mapped over in gameboard, and keeps track of the index of guesses
// inside of button, className, then style is being used by setting background color to the props of selColorIdx (from gameboard) is now beng set equal to idx
// and if not button is selected, have the inside of the circle white, otherwise, use the color variable which has been defined via props.colors map
// 
// and bordercolor is set to equal the same color as background color
// the key is needed for color array




//        onClick={() => alert('clickled')}
// if onClick is onClick{alert('clickled)} it will not work because, even though
// this is a function already, but right now it is a function invocation as a value to the onClick prop
// so the result of clicking makes it become the value, but we don't want to be invoked immediately, we want
// it to wait to be clicked and it is missing the callback function. 
// to do it so that it doesn't need a callback function/ arrow function is to define a function for
//handling clicks with the alert inside of it so, something similar to
// "function handleClick() {alert('clickled')}"" and then in the onClick prop pass the handleClick function name,
// so it is a reference to a function, rather than an invocation
// in native javascript the code would be
// " button.addEventListener('click', handleClick)
// function handleClick() { alert('click')} "
// basically what onClick{alert('click')} is
// "button.addEventListener('click', alert('click'))" and this does not work; there is nothing
// defining it, there is no function
//when we want a function to run as whatever result of an event taking place we 
// need to pass an argument to that the function. if we need an argument to that functoin
// we need an anonymous callback first because if removal of the arrow function
//occurs, then we'll have to reference the function because javascript will run it automatically
// because it is being invoked. just one of the rules of javascript
//...
//        }}
//key={color}
//onClick={(event) => {alert('clickled');
//console.log(event);
//}}



// style={{backgroundColor: props.color}
