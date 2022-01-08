import React, { useState, cloneElement }  from 'react'
import styled from 'styled-components'
import { CSSTransition } from "react-transition-group";
import AnimatedBoxContainer from 'components/Box'


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

function MenuIcon(props) {
    const { rotate = 0 } = props;
    
    const style = {
        transform: `rotate(${rotate}deg)`,
        transition: 'transform 0.5s'
    }
    return <div style={ style }><MenuBar/><MenuBar style={{margin: '5px 0 5px 0'}}/><MenuBar/></div>
}

export const AnimatedMenuIcon = styled(MenuIcon)`
    transition: transform 1s;
`

export function AnimatedNav(props) {
    const [inProp, setInProp] = useState(true);
    const rotate = inProp ? -90 : 0;
    const newNavLinks = React.Children.map(props.children, link => {
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
                <AnimatedBoxContainer><AnimatedMenuIcon rotate={rotate}/></AnimatedBoxContainer>
            </button>
        </Nav>
    );
}

export default Nav