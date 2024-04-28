
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    background-color: #EAF6FF;
`;

const Title = styled.h1`
    all: unset;
    color: #3F334D; 
    font-size: 26px;
    font-weight: bold;
    margin-left: 50px;
`;

const LinksContainer = styled.div`
    margin-left: auto;
    padding-right: 50px;
    display: grid;
    grid-auto-flow: column;
    column-gap: 30px;

    a {
        text-decoration: none;
    }

    .active {
        user-select: none;
        cursor: default;
    }
`;

function Navbar () {
    const location = useLocation();

    const pages = {
        "Home": "/",
        "About Us": "/aboutus",
        "Donations": "/donations",
        "Notifications": "/notifications",
        "Dashboard": "/dashboard",
    }

        return(
                <NavWrapper> 
                    <Title>Azil za životinje</Title>
    
                    <LinksContainer>
                    {Object.entries(pages).map(([label, path]) => (
                        <Link to={path} key={path} className={path === location.pathname ? "active" : ""}>
                            {label}
                        </Link>
                    ))}
                    </LinksContainer>
                </NavWrapper>
        )
    }
    
    export default Navbar;