export function Scroll (props) {
    const {handleScroll = Function.prototype} = props;
    return  <i className="medium material-icons scroll" onClick={() => handleScroll()}>keyboard_arrow_up</i>
} 