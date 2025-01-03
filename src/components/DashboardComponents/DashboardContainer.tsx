"use client";

import { ReactNode } from "react";
import { styled } from "styled-components";

interface Props {
    children: ReactNode;
}

const Frame = styled.div`
    position: absolute;
    top: 101px;
    left: 250px;
    width: 1190px;
    height: 1083px;
    background: rgb(245, 247, 250);

    @media (max-width: 376px) {
        left: 0;
        width: 100%;
        height: 100vh;
        top: 140px;
    }
`;

const DashboardContainer: React.FC<Props> = ({ children }) => {
    return (
        <Frame>
            {children}
        </Frame>
    );
};

export default DashboardContainer;