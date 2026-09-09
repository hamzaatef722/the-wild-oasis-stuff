import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: ${(props) => (props.$collapsed ? "4rem" : "9.6rem")};
  width: auto;
  transition: height 0.25s ease;
`;

function Logo({ collapsed = false }) {
  return (
    <StyledLogo>
      <Img src="logo-dark.png" alt="Logo" $collapsed={collapsed} />
    </StyledLogo>
  );
}

export default Logo;
