import React, { useState, useEffect }  from 'react'
import styled from 'styled-components'
import { AnimatedBox } from 'components/Box'


export const Nav = styled.nav`
    width: auto;
    right: 0;
    text-align: center;
    display: flex;
    padding: 1rem;
    gap: 1rem;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
    align-items: center;
    box-sizing: border-box;
    position: fixed;
    z-index: 2;
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

const ButtonWrapper = styled.button`
    all: unset;
    cursor: pointer;
`
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
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onscroll = () => {
                setInProp(window.pageYOffset === 0);
            }        
            return () => (window.onscroll = null);
        }
    }, []);
    return (
        <Nav>
            {newNavLinks}
            <ButtonWrapper onClick={ toggleLinks }>
                <AnimatedBox clickable><AnimatedMenuIcon rotate={rotate}/></AnimatedBox>
            </ButtonWrapper>
        </Nav>
    );
}

export default Nav