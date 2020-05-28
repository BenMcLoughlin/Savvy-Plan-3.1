import React from 'react'
import styled from "styled-components"
import logo from "logo.svg"

export default function Header() {
    return (
        <Wrapper>
                <Logo>
                    <img src={logo} height="100%" width="100%" alt="logo"/>
                </Logo>
                <Text>
                  Account
                </Text>
        </Wrapper>
    )
}

//---------------------------STYLES-------------------------------------------//

const Wrapper = styled.div`
        height: 6.5rem;
        width: 100%; 
        background: white;
        box-shadow: 0 1px 2px rgba(0,0,0.01,.08);
        position: relative;
`
const Logo = styled.div`
        height: 7.5rem;
        position: absolute;
`
const Text = styled.div`
        height: 6.5rem;
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        position: absolute;
        right: 2rem;
`