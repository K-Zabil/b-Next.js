"use client";

import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = styled.nav`
  position: absolute;
  width: 250px;
  height: 100vh;
  right: 1190px;
  left: 0;
  top: 0;
  bottom: -9px;

  @media (max-width: 376px) {
    display: none;
  }
`;

const Borderline = styled.div`
  position: absolute;
  width: 1px;
  height: 100vh;
  right: 0;
  top: 0;
  background: rgb(230, 239, 245);
`;

const NavItemContainer = styled.div`
  position: absolute;
  width: 211px;
  height: 554px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  margin-top: 114px;
  margin-right: 114px;
`;

const NavItem = styled.div`
  position: relative;
  width: 195px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 0;
  margin-right: 22px;
`;

const ActiveIndicator = styled.div<StyledLinkProps>`
  position: absolute;
  height: 100%;
  width: 6px;
  background: rgb(45, 96, 255);
  left: 0;
  border-radius: 0px 10px 10px 0px;
  display: ${({ $isActive }) => ($isActive ? "block" : "none")};
`;

const ImageContainer = styled.img`
  position: relative;
  width: 25px;
  height: 25px;
  margin-left: 44px;
`;

interface StyledLinkProps {
  $isActive: boolean;
}

const StyledLink = styled(Link) <StyledLinkProps>`
  color: ${({ $isActive }) => ($isActive ? "rgb(45, 96, 255)" : "rgb(177, 177, 177)")};
  text-decoration: none;
  margin-left: 26px;
  border-radius: 8px;
  width: 115px;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0%;
  text-align: left;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`;


const SidebarComponent = () => {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Sidebar>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl font-semibold text-gray-500 animate-pulse">
            Loading ...
          </p>
        </div>
      </Sidebar>
    );
  }




  const getIconPath = (href: string, isActive: boolean) => {
    const iconName = href.split('/')[2];
    return `/icons/${isActive ? 'active' : 'nonActive'}/${iconName}.png`;
  };

  return (
    <Sidebar>
      <Borderline />
      <NavItemContainer>

        {
          [
            { href: "/dashboard/overview", label: "Dashboard" },
            { href: "/dashboard/cards", label: "Credit Cards" },
            { href: "/dashboard/services", label: "Services" },
            { href: "/dashboard/loans", label: "Loans" },
          ].map(({ href, label }) => {
            const isActive = pathname === href;
            const iconPath = getIconPath(href, isActive);

            return (
              <NavItem key={href}>
                <ActiveIndicator $isActive={isActive} />
                {iconPath && <ImageContainer src={iconPath} alt={label} />}
                <StyledLink href={href} $isActive={isActive}>
                  {label}
                </StyledLink>
              </NavItem>
            );
          })
        }

      </NavItemContainer>
    </Sidebar>
  );
};

export default SidebarComponent;