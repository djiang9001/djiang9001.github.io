import React, { useState, cloneElement }  from 'react'
import styled from 'styled-components'
import { CSSTransition } from "react-transition-group";

export const Nav = styled.nav`
    width: 100%;
    text-align: center;
    display: flex;
    padding: 1rem;
    gap: 1rem;
    justify-content: flex-end;
    box-sizing: border-box;
`

const MenuBar = styled.div`
    width: 19px;
    height: 3px;
    background-color: white;
`

function MenuIcon() {
    const [rotate, setRotate] = useState(-90);
    
    function rotateIcon() {
        setRotate((rotate - 90) % 180);
    }
    const style = {
        transform: `rotate(${rotate}deg)`,
        transition: 'transform 0.5s'
    }
    return <div onClick={ rotateIcon } style={ style }><MenuBar/><MenuBar style={{margin: '5px 0 5px 0'}}/><MenuBar/></div>
}

export const AnimatedMenuIcon = styled(MenuIcon)`
    transition: transform 1s;
`

export function AnimatedNav(props) {
    const [inProp, setInProp] = useState(true);
    var navLinks = React.Children.toArray(props.children).slice(0,-1);
    var navToggle = React.Children.toArray(props.children).at(-1);
    const newNavLinks = React.Children.map(navLinks, link => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(link)) {
          return React.cloneElement(link, { inProp: inProp });
        }
        return link;
      });
    function toggleLinks() {
        setInProp(!inProp);
    }
    return (
        <Nav>
            {newNavLinks}
            <button style={{ all: 'unset', cursor: 'pointer' }} onClick={ toggleLinks }>
                {navToggle}
            </button>
        </Nav>
    );
}

export default Nav